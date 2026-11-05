export async function runQaForecastRoute(entry, deps, options = {}) {
    const limit = options.stepTimeoutMs ?? 60000;
    const poll = options.pollMs ?? 80;
    const say = (step, detail) => deps.report({ phase: 'running', step, detail });
    const fail = (step, detail) => {
        const status = { phase: 'failed', step, detail };
        deps.report(status);
        return status;
    };
    const until = async (read, ms) => {
        const started = deps.now();
        for (;;) {
            const found = read();
            if (found)
                return found;
            if (deps.now() - started > ms)
                return null;
            await deps.sleep(poll);
        }
    };
    say('app', 'waiting for the app to finish starting');
    if (!await until(() => deps.appReady(), limit))
        return fail('app', 'the app did not finish starting (no profile loader or menu opener after the wait)');
    if (!entry.preset)
        return fail('preset', 'this build carries no QA profile presets to load');
    say('preset', entry.profileFellBack
        ? `profile "${entry.requestedProfile}" is not in this build's list; loading the list's last profile instead`
        : 'loading the QA profile');
    deps.applyPreset(entry);
    say('menu', 'waiting for the Forecast card on the main menu');
    const card = await until(() => deps.forecastCard(), limit);
    if (!card)
        return fail('menu', 'the Forecast card never became pressable after the profile loaded');
    card.click();
    say('forecast', 'waiting for the Forecast screen');
    if (!await until(() => deps.levelControl('month') ?? deps.levelControl('day'), limit))
        return fail('forecast', 'the Forecast screen never showed its level controls');
    if (entry.language && deps.locale() !== entry.language) {
        say('language', `switching to ${entry.language}`);
        deps.setLocale(entry.language);
        if (!await until(() => deps.locale() === entry.language, limit))
            return fail('language', `the app would not switch to ${entry.language}`);
    }
    say('level', `pressing the ${entry.level} control`);
    const reached = await until(() => {
        if (deps.activeLevel() === entry.level)
            return true;
        deps.levelControl(entry.level)?.click();
        return false;
    }, limit);
    if (!reached)
        return fail('level', `the Forecast stayed on the ${deps.activeLevel() ?? 'unknown'} level; the ${entry.level} control did not take effect`);
    /* The graph block exists in English only (the legacy Slovak Forecast draws its own trend): in English the Forecast wears the theme colours at every level and Month and Year draw the graph. */
    const graph = deps.locale() === 'en';
    if (graph) {
        say('graph', 'waiting for the theme styling');
        if (!await until(() => deps.reviewOn(), limit))
            return fail('graph', 'the Forecast is on the requested level but the theme styling is not on it (is the Forecast in English?)');
    }
    if (graph && entry.level !== 'day') {
        say('graph', 'waiting for the graph block');
        if (!await until(() => deps.graphKind() === entry.level, limit)) {
            return fail('graph', `the Forecast is on ${entry.level} but the graph block did not render`);
        }
    }
    const done = { phase: 'ready', step: 'done', detail: `${entry.level}${graph ? (entry.level !== 'day' ? ' with the graph' : ' with the theme styling') : ''}` };
    deps.report(done);
    return done;
}
