import { activeLocale, FALLBACK_LOCALE } from './locale.js';
import { resolveReaderGrammar } from './readerGrammar.js';
/**
 * THE UI DICTIONARY.
 *
 * Chrome only: headings, labels, buttons, disclosure titles. The authored
 * reading prose is NOT here - it lives in the knowledge layer and is translated
 * through a separate overlay, because it is a body of writing rather than a set
 * of labels and the two have completely different editing lifecycles.
 *
 * English is exhaustive and typed as such; Slovak is a Partial. That is what
 * makes the fallback provable rather than hopeful: a key that exists at all
 * exists in English, so `t()` can never fail to return real text.
 *
 * ON THE SLOVAK
 * Section headings are translated as a reader would expect to meet them, not
 * literally. "At a glance" is "V skratke", not a word-by-word rendering. Where a
 * term is canonical in its own tradition it is left canonical - Day Master,
 * BaZi, Human Design, gate and channel numbers - because translating a
 * technical name is how a reading stops being checkable against any other
 * source.
 */
const EN = {
    /* ------------------------------------------------------ reading sections */
    'section.at-a-glance': 'At a glance',
    'section.portrait': 'Your portrait',
    'section.themes': 'Major themes',
    'section.inner-world': 'Inner world',
    'section.relationships': 'Relationships',
    'section.work': 'Work and direction',
    'section.strengths': 'Strengths',
    'section.shadow': 'Shadow and challenges',
    'section.growth': 'Growth',
    'section.system-specific': 'In this system',
    'section.current-chapter': 'Where you are now',
    'section.numbers': 'Your numbers in full',
    'section.chart-structure': 'How the chart is put together',
    'section.key-aspects': 'The aspects that shape the chart',
    'section.placements': 'Every placement',
    /* The astrology narrative layer (pillar-reading/astrology-narrative): the
       chart told once, as one argument, then the evidence for it. */
    'section.astro-pattern': 'Your chart’s main pattern',
    'section.astro-drive': 'What drives you and what settles you',
    'section.astro-meet': 'What shows first',
    'section.astro-mind': 'How you think and act',
    'section.astro-relate': 'How you relate',
    'section.astro-pull': 'Where the chart pulls two ways',
    'section.astro-helps': 'What it costs, and what helps',
    'section.astro-evidence': 'Why this appears',
    'section.astro-time': 'Your birth time',
    'section.chinese-zodiac': 'Your Chinese zodiac sign',
    'section.four-pillars': 'Your Four Pillars',
    'section.day-master': 'Your Day Master',
    'section.five-elements': 'Your Five Elements',
    'section.seasonal-strength': 'Season and support',
    'section.hidden-stems': 'Hidden stems',
    'section.ten-gods': 'The Ten Gods',
    'section.luck-pillars': 'Luck Pillars',
    'section.tcm': 'Symbolic TCM correspondence',
    /* The BaZi narrative layer: six steps of one Ziping argument, then its evidence. */
    'section.bazi-nature': 'Your nature and its season',
    'section.bazi-energy': 'Where your energy goes',
    'section.bazi-tension': 'Where the pull runs both ways',
    'section.bazi-steadies': 'What steadies you',
    'section.bazi-costs': 'What it costs you',
    'section.bazi-practice': 'What to practise',
    'section.bazi-evidence': 'Why this appears',
    /* The numerology narrative (pillar-reading/numerology-narrative), then Go deeper. */
    'section.numerology-direction': 'Your direction',
    'section.numerology-drive': 'What drives you',
    'section.numerology-presence': 'How you meet the world',
    'section.numerology-pull': 'Where your numbers pull apart',
    'section.numerology-cost': 'What the pattern costs',
    'section.numerology-growth': 'What grows stronger with time',
    'section.numerology-chapter': 'The chapter you are in',
    'section.numerology-evidence': 'Why this appears',
    'section.numerology-positions': 'Your numbers, one by one',
    'section.numerology-chapters': 'Your four life chapters',
    'section.numerology-cycles': 'Your current cycles',
    /*
     * The Human Design narrative layer: the system describes a mechanism, so the
     * headings follow the mechanism rather than the life areas the other pillars
     * share. Human Design has no opinion about a job; it has one about how a
     * decision gets made, which is why "Work" is not a heading here.
     */
    'section.hd-operates': 'What this design runs on',
    'section.hd-decides': 'How a decision gets made',
    'section.hd-with-others': 'How you meet other people',
    'section.hd-consistent': 'What stays the same',
    'section.hd-context': 'Where the room changes the reading',
    'section.hd-tension': 'Where the design pulls both ways',
    'section.hd-costs': 'What the pattern costs',
    'section.hd-practice': 'What helps',
    'section.hd-evidence': 'Why this appears',
    'section.hd-withheld': 'Why this is not shown',
    'section.hd-envelope': 'What the day of birth settles',
    /* Go deeper: the authored detail behind each mechanic the reading has already
       explained in ordinary words. */
    'section.hd-type-detail': 'Your Type in full',
    'section.hd-authority-detail': 'Your Authority in full',
    'section.hd-profile-detail': 'Your Profile in full',
    'section.hd-definition-detail': 'Your Definition in full',
    'section.hd-cross': 'Your Incarnation Cross',
    'section.deciding': 'How you actually decide',
    'section.defined-centres': 'Your defined centres',
    'section.open-centres': 'Your open centres',
    'section.channels': 'Your channels',
    'section.gates': 'Your gates',
    'section.variables': 'Advanced: your Variables',
    /* ---------------------------------------------------- synthesis sections */
    /* ------------------------------------------------ the forecast reading */
    /*
     * NO PROPHECY, ANYWHERE IN THIS BLOCK.
     *
     * Every frame is pressure, lean, emphasis, timing or friction. Nothing says an
     * event will happen, because nothing in the model computes an event - it
     * computes which way a period leans and how that meets a chart. A sentence
     * here that could be read as "this will occur" is a bug, not a style choice.
     */
    /* -------------------------------------------------- what was NOT read -- */
    /*
     * Two different absences, and the difference is the point. A system that could
     * not calculate is one thing; a fact that exists and is deliberately not being
     * claimed is another, and a reader who notices their ten-year cycle missing is
     * owed the second reason rather than left to assume the first.
     */
    'forecast.technical.notRead': 'Not read for this period',
    'forecast.system.numerology': 'Numerology',
    'forecast.system.astrology': 'Western astrology',
    'forecast.system.bazi': 'BaZi',
    'forecast.gap.luckPillar': 'Ten-year luck pillar (Da Yun)',
    'forecast.gap.humanDesign': 'Human Design transits',
    'forecast.gap.luckPillar.vessel-undefined': 'Which way the ten-year cycle runs depends on the body, and you chose to leave that '
        + 'undefined. The traditional rule takes only male or female and no school extends it, so '
        + 'rather than pick one and present the result as yours, this reading leaves the cycle out.',
    'forecast.gap.luckPillar.vessel-missing': 'The body selected at intake did not reach this reading, and the direction of the ten-year '
        + 'cycle cannot be worked out without it.',
    'forecast.gap.luckPillar.polarity-missing': 'The natal year pillar could not be calculated, and the direction of the ten-year cycle is '
        + 'read from its polarity.',
    'forecast.gap.humanDesign.no-transit-doctrine': 'Human Design is left out here for the reason given above, rather than improvised.',
    /* ------------------------------------------ the dimensions, short form --
     *
     * The twenty-four dimensions as short phrases. The Forecast no longer prints
     * them - it says what each influence brings instead (temporalSemantics,
     * fc.lean, fc.pull) - but the Portrait's synthesis reading names its poles
     * with these, so they stay exactly as they are.
     */
    'forecast.short.introspective': 'working inward',
    'forecast.short.outwardly-engaged': 'being out in things',
    'forecast.short.analytical': 'reasoning it through',
    'forecast.short.intuitive': 'trusting the read',
    'forecast.short.independent': 'deciding alone',
    'forecast.short.collaborative': 'deciding with others',
    'forecast.short.structured': 'a settled order',
    'forecast.short.adaptable': 'changing shape',
    'forecast.short.cautious': 'selective movement',
    'forecast.short.risk-oriented': 'committing early',
    'forecast.short.emotionally-expressive': 'saying it as you feel it',
    'forecast.short.emotionally-contained': 'holding it until it has a shape',
    'forecast.short.private': 'your own counsel',
    'forecast.short.social': 'being among people',
    'forecast.short.stability-seeking': 'holding what works',
    'forecast.short.novelty-seeking': 'going after the new',
    'forecast.short.assertive': 'pushing your own line',
    'forecast.short.receptive': 'letting things come',
    'forecast.short.practical': 'hands-on work',
    'forecast.short.conceptual': 'thinking it through first',
    'forecast.short.creative': 'making something new',
    'forecast.short.persistent': 'staying with it',
    'forecast.short.emotionally-sensitive': 'reading the room',
    'forecast.short.communicative': 'putting it into words',
    'synthesis.orientation': 'How this reading was built',
    /* Headings a reader can act on, not a table of contents for the model.
       `Where they pull apart` described the systems; the reader is the one
       being pulled. */
    'synthesis.caveats': 'Before you read this',
    'synthesis.portrait': 'What matters most to you',
    /* The section is the operating half of the portrait now - the drives have
       their own - so the heading says what is in it rather than how it was
       arrived at. How it was arrived at is the support table's job. */
    'synthesis.convergence': 'How you tend to work, and what it costs',
    'synthesis.drives': 'What else matters to you',
    'synthesis.support-table': 'Every theme, ranked',
    'synthesis.tensions': 'Where you pull in two directions',
    'synthesis.takeaways': 'In short',
    'synthesis.practical': 'In everyday life',
    'synthesis.single-system': 'Carried by one system only',
    'synthesis.domains': 'What it touches',
    'synthesis.limits': 'What this cannot tell you',
    /* ------------------------------------------ the synthesis screen chrome */
    'synthesis.kicker': 'The four systems read together',
    'synthesis.title': 'Cross-Pillar Synthesis',
    'synthesis.cardEyebrow': 'Finally',
    'synthesis.notCalculated': 'Not calculated for this profile',
    'synthesis.benchmarkNote': 'This profile is a benchmark demonstration. It reproduces a documented '
        + 'synthesis rather than calculating one, so there is no computed cross-pillar '
        + 'reading behind it, and composing one here would show you something that did '
        + 'not come from the engines.',
    'synthesis.pillarsStillComplete': 'The four pillar readings are calculated and complete. Open any of them from '
        + 'the previous screen.',
    'synthesis.tech.summary': 'Technical details',
    'synthesis.tech.summarySub': 'Coverage, weighting method and the full evidence chain.',
    'synthesis.tech.coverage': 'Coverage',
    'synthesis.tech.method': 'Method and provenance',
    'synthesis.tech.evidenceChain': 'Evidence chain ({count})',
    'synthesis.tech.evidenceChainNote': 'Every piece of evidence behind every theme shown above, with the weight it '
        + 'actually counted for and whether it was discounted for depending on another '
        + 'item in the same group.',
    'synthesis.tech.systemsIncluded': 'Systems included',
    'synthesis.tech.systemsMissing': 'Systems missing',
    'synthesis.tech.none': 'None',
    /* The evidence chain's own two words. They were literals in the screen. */
    'synthesis.tech.weight': 'weight',
    'synthesis.tech.discounted': 'discounted as corroborating evidence',
    'synthesis.tech.evidenceWeighed': 'Evidence items weighed',
    'synthesis.tech.suppressed': 'Suppressed',
    'synthesis.tech.suppressedNote': 'Excluded entirely because the data they needed was unavailable.',
    'synthesis.tech.timeSensitive': 'Time-sensitive',
    'synthesis.tech.timeSensitiveNote': 'Weighted down: they rest on a birth time that is an estimate, or on a BaZi chart read without its Hour Pillar.',
    'synthesis.tech.birthTime': 'Birth time',
    'synthesis.tech.birthTimeEstimated': 'Not given (the whole birth date was read)',
    'synthesis.tech.birthTimeSupplied': 'Supplied',
    'synthesis.tech.birthTimeApproximate': 'Approximate (your estimate)',
    'synthesis.tech.themesReported': 'Themes reported',
    'synthesis.tech.themesBelow': 'Themes below threshold',
    'synthesis.tech.themesBelowNote': 'Detected and not shown: {themes}.',
    'synthesis.tech.axesContested': 'Axes contested',
    'synthesis.tech.model': 'Synthesis model',
    'synthesis.tech.pipeline': 'Pipeline',
    'synthesis.tech.pipelineNote': 'Engine output to normalised evidence, weighted, discounted for dependence, '
        + 'clustered into themes, checked for tension, filed into domains.',
    'synthesis.tech.determinism': 'Determinism',
    'synthesis.tech.determinismNote': 'No clock, no network, no randomness. The same four engine outputs produce '
        + 'the same synthesis every time.',
    /* ------------------------------------------------------------- chrome */
    'ui.back': 'Back',
    'ui.close': 'Close',
    'astro.hero.ascendant': 'Ascendant',
    'astro.hero.needsTime': 'needs a birth time',
    /* Three labelled depths, the same on every surface. The reading, then why the
       system says it, then what it was calculated from. A reader should never
       have to work out which of six disclosure patterns they are looking at. */
    /* ------------------------------------------------------ profile shell -- */
    /*
     * The profile layer, which is NOT a seventh reading.
     *
     * Facts a person uses to recognise their own account - a name, a photo, the
     * birth data they entered, and the handful of identifiers every system
     * assigns them. No interpretation lives here; the six readings are where a
     * conclusion belongs, and a profile screen that starts explaining is a
     * seventh pillar wearing a settings icon.
     */
    'profile.open': 'Profile and settings',
    'profile.title': 'Profile',
    'profile.close': 'Close',
    'profile.photo': 'Profile photo',
    'profile.changePhoto': 'Change photo',
    'profile.removePhoto': 'Remove photo',
    'profile.photoFailed': 'That image could not be read. Try another one.',
    'profile.photoTooBig': 'That image is too large to keep on this device.',
    'profile.editBirth': 'Edit birth details',
    'profile.settings': 'Settings',
    'profile.field.birthDate': 'Birth date',
    'profile.field.birthTime': 'Birth time',
    'profile.field.birthTimeUnknown': 'Not known',
    'profile.field.birthPlace': 'Birth place',
    'profile.field.western': 'Western zodiac',
    'profile.field.chinese': 'Chinese zodiac',
    'profile.field.lifePath': 'Life Path',
    'profile.field.dayMaster': 'Day Master',
    'profile.field.humanDesign': 'Human Design',
    /* Dev only, and only ever rendered behind the existing flag. Labelled so that
       nobody mistakes it for a reader-facing part of the profile. */
    'profile.devSection': 'QA · development only',
    /* The crop editor. The hint names both gestures, because a slider alone
       suggests the image cannot be moved and a photograph usually needs to be. */
    'profile.editor.title': 'Position your photo',
    'profile.editor.hint': 'Drag to move. Pinch or use the slider to zoom.',
    'profile.editor.zoom': 'Zoom',
    'profile.editor.reset': 'Reset',
    'profile.editor.cancel': 'Cancel',
    'profile.editor.save': 'Save photo',
    'ui.deepDive': 'Go deeper',
    'ui.deepDive.sub': 'The full detail behind the reading, system by system.',
    'synthesis.deepDive.sub': 'The agreements and tensions the model ranked below the ones above.',
    /* Which calculation produced the reading, named rather than pathed. */
    'synthesis.tech.reference': 'Cross-pillar synthesis, calculated locally',
    'ui.technical': 'Technical details',
    'ui.technical.sub': 'Raw values, calculation method, methodology and limitations.',
    'ui.technical.allValues': 'All calculated values',
    'ui.technical.method': 'Method and provenance',
    'ui.technical.limitations': 'Limitations',
    'ui.infoAria': 'What is',
    'ui.selfMap': 'Your self-map',
    /*
     * THE PROFILE DESTINATION STRIP.
     *
     * Short on purpose. These are not the pillar titles - `pillar.*.title` says
     * "Western Astrology" and "BaZi / TCM", which are correct on a screen's own
     * heading and too long for a capsule six of which share one row. A tab is a
     * signpost; the screen it opens says the full name.
     *
     * PORTRAIT, not "Cross-pillar synthesis". `cross-pillar` is what the code
     * calls it and describes the method rather than the thing, and the reading
     * itself already says "The combined portrait" in both languages. The tab
     * takes the word the product had already chosen.
     */
    'nav.aria': 'Your reading',
    'nav.portrait': 'Portrait',
    'nav.western-astrology': 'Astrology',
    'nav.numerology': 'Numerology',
    'nav.bazi-tcm': 'BaZi',
    'nav.human-design': 'Human Design',
    'nav.forecast': 'Forecast',
    'nav.tarot': 'Tarot',
    /* The main menu: the four systems in one capsule, their synthesis joined to them, and three more destinations. */
    'nav.menu': 'Menu',
    'menu.aria': 'Main menu',
    'menu.brand': 'Know Thyself',
    'menu.byline': 'No Die Self',
    'menu.tagline': 'Your map. Deeper you.',
    'menu.pillars.aria': 'The four systems and their synthesis',
    'menu.more.aria': 'More ways in',
    'menu.pillar.western-astrology': 'Astrology Pillar',
    'menu.pillar.numerology': 'Numerology Pillar',
    'menu.pillar.human-design': 'Human Design Pillar',
    'menu.pillar.bazi-tcm': 'BaZi Pillar',
    'menu.connections': 'Connections',
    /* Connections: the chrome of its screens. The reading itself is authored content (app/connections/reading/content), not here. */
    'cx.title': 'Connections',
    'cx.observed.communication-struggles': 'We struggle to communicate',
    'cx.observed.frequent-conflict': 'We argue often',
    'cx.observed.conflict-goes-unrepaired': 'Arguments stay unresolved',
    'cx.observed.pace-differences': 'We move at different paces',
    'cx.observed.different-working-styles': 'Our working styles differ',
    'cx.observed.unclear-roles': 'Our roles are unclear',
    'cx.observed.decision-stalemates': 'Decisions get stuck',
    'cx.observed.feeling-unseen': 'One of us feels unseen',
    'cx.observed.need-more-closeness': 'We want more closeness',
    'cx.observed.need-more-space': 'Someone needs more space',
    'cx.observed.strong-reactions-to-change': 'Strong reactions to change',
    'cx.observed.resists-rules': 'Resistance to rules',
    'cx.observed.withdraws-when-upset': 'Pulls away when upset',
    'cx.observed.sibling-friction': 'Brothers and sisters clash',
    'cx.observed.unfair-comparison': 'Comparing the children feels unfair',
    'cx.observed.parents-disagree-on-approach': 'The adults approach it differently',
    'cx.observed.wants-to-collaborate': 'We want to work together',
    'cx.observed.old-roles-persist': 'Old family roles persist',
    'cx.observed.recurring-argument': 'The same argument keeps returning',
    'cx.subtitle': 'How two ways of being meet, so a relationship can be understood rather than judged.',
    'cx.domains.aria': 'Kinds of relationship',
    'cx.domain.romantic': 'Romantic',
    'cx.domain.romantic.line': 'Partnership and closeness',
    'cx.domain.family': 'Family',
    'cx.domain.family.line': 'Siblings, parents, grandparents, relatives',
    'cx.domain.work': 'Work',
    'cx.domain.work.line': 'Colleagues, partners, mentors',
    'cx.domain.parenting': 'Parenting',
    'cx.domain.parenting.line': 'Understanding a child at their age',
    'cx.resume': 'Continue where you left off',
    'cx.people.title': 'Kept on this device',
    'cx.people.session': 'For this visit',
    'cx.remove': 'Remove',
    'cx.remove.aria': 'Remove {name} from Connections',
    'cx.privacy': 'Birth details you enter stay on this device, and are forgotten when this tab closes unless you choose to keep them.',
    'cx.forget': 'Forget everything Connections holds',
    'cx.forget.done': 'Forgotten.',
    'cx.step.relationship': 'The relationship',
    'cx.step.who': 'Who',
    'cx.step.notice': 'What you notice',
    'cx.step.optional': 'optional',
    'cx.notice.hint': 'Pick up to four. It is your own view of the relationship, and it only changes what the reading speaks to first.',
    'cx.kind.partners': 'Partners',
    'cx.kind.siblings': 'Siblings',
    'cx.kind.adult-parent-adult-child': 'Parent and adult child',
    'cx.kind.grandparent-grandchild': 'Grandparent and grandchild',
    'cx.kind.extended-family': 'Other relatives',
    'cx.kind.coworkers': 'Colleagues',
    'cx.kind.business-partners': 'Business partners',
    'cx.kind.founders': 'Co-founders',
    'cx.kind.manager-collaborator': 'Manager and collaborator',
    'cx.kind.mentor-mentee': 'Mentor and mentee',
    'cx.kind.project-partners': 'Project partners',
    'cx.kind.parent-child': 'I am the parent',
    'cx.kind.caregiver-child': 'I am another caregiver',
    'cx.kind.co-parents': 'Co-parents',
    'cx.kind.siblings-in-household': 'Siblings at home',
    'cx.you': 'You',
    'cx.you.as': 'You: {name}',
    'cx.role.question': 'You are the',
    'cx.role.parent': 'Parent',
    'cx.role.adult-child': 'Adult child',
    'cx.role.grandparent': 'Grandparent',
    'cx.role.grandchild': 'Grandchild',
    'cx.role.manager': 'Manager',
    'cx.role.collaborator': 'Collaborator',
    'cx.role.mentor': 'Mentor',
    'cx.role.mentee': 'Mentee',
    'cx.other': 'The other person',
    'cx.adults': 'Adults',
    'cx.children': 'Children',
    'cx.add.person': 'Add someone',
    'cx.add.adult': 'Add another adult',
    'cx.add.child': 'Add a child',
    'cx.add.choose': 'Or choose someone already added',
    'cx.run': 'Read this relationship',
    'cx.need.other': 'Add the other person to continue.',
    'cx.need.child': 'Add a child to continue.',
    'cx.need.kind': 'Choose the relationship to continue.',
    'cx.reading': 'Reading…',
    'cx.error.person': 'This person could not be read from the details given. Please check them.',
    'cx.error.generic': 'Something went wrong while reading this relationship. Nothing was saved.',
    'cx.error.child-adult': 'This person is eighteen or older. For an adult relationship, choose Family.',
    'cx.age.months': '{n} months',
    'cx.age.months.one': '{n} month',
    'cx.age.months.few': '{n} months',
    'cx.age.years': '{n} years',
    'cx.age.years.one': '{n} year',
    'cx.age.years.few': '{n} years',
    'cx.result.change': 'Change',
    'cx.result.between': '{a} and {b}',
    'cx.result.noticed': 'You noticed',
    'cx.section.explore': 'Explore',
    'cx.section.explore.hint': 'Choose a dimension to see where each stands.',
    'cx.section.reading': 'The reading',
    'cx.section.evidence': 'How this was read',
    'cx.dimension.more': 'What each brings',
    'cx.dimension.scale': 'Where each stands on this',
    'cx.dimension.unplaced': 'Not placed',
    'cx.evidence.note': 'Research supports the practical guidance. It does not validate astrology, numerology, Human Design or BaZi as measurements of people.',
    'cx.evidence.research': 'Research behind the guidance',
    'cx.evidence.traditions': 'What the traditions contribute',
    'cx.evidence.dimensions': 'Dimension by dimension',
    'cx.evidence.pillars': 'Traditions: {list}',
    'cx.evidence.facts': 'Calculated facts',
    'cx.evidence.quality.high': 'Strong evidence',
    'cx.evidence.quality.moderate': 'Moderate evidence',
    'cx.evidence.quality.limited': 'Limited evidence',
    'cx.evidence.corroboration.firm': 'The sky-based and the calendar-based traditions point the same way.',
    'cx.evidence.corroboration.supported': 'More than one tradition from the same family points this way.',
    'cx.evidence.corroboration.single': 'One tradition only. Hold it lightly.',
    'cx.evidence.unreadable': 'Not read: too little evidence, or it depends on a birth time that is not known.',
    'cx.pillar.astrology': 'Western Astrology',
    'cx.pillar.numerology': 'Numerology',
    'cx.pillar.human-design': 'Human Design',
    'cx.pillar.bazi': 'BaZi',
    'cx.practice.sources': 'Research',
    'cx.household.title': 'The household',
    'cx.household.pairs': 'Choose a pair',
    'cx.child.title': '{name}',
    'cx.child.portrait': 'What the profile points to',
    'cx.child.fullGuide': 'The full guide for {name} is on the household page.',
    'cx.child.age': 'Age: {age}',
    'cx.guide.title': 'At this age',
    'cx.guide.notyet': 'Not yet to expect',
    'cx.guide.know': 'What is typical',
    'cx.guide.try': 'What to try',
    'cx.guide.fit': 'For this child',
    'cx.guide.priority': 'From what you noticed',
    'cx.sheet.person': 'Add someone',
    'cx.sheet.adult': 'Add another adult',
    'cx.sheet.child': 'Add a child',
    'cx.sheet.add': 'Add',
    'cx.sheet.cancel': 'Cancel',
    'cx.field.label': 'What should we call them?',
    'cx.field.label.hint': 'A first name or a nickname. This is all that is ever shown.',
    'cx.field.birthName': 'Birth first name(s)',
    'cx.field.birthSurname': 'Birth surname',
    'cx.field.names.hint': 'Numerology reads the name given at birth. It stays on this device and is not shown.',
    'cx.field.date': 'Date of birth',
    'cx.field.time': 'Time of birth',
    'cx.time.exact': 'Exact',
    'cx.time.approximate': 'Roughly',
    'cx.time.unknown': 'Not known',
    'cx.time.hint': 'Without an exact time, details that depend on it are left out or held lightly.',
    'cx.field.place': 'Place of birth',
    'cx.place.search': 'Search for a town or city',
    'cx.place.none': 'No match. Try another spelling.',
    'cx.place.error': 'Place search is unavailable right now. Try again.',
    'cx.place.resolving': 'Checking the time zone…',
    'cx.place.unresolved': 'The time zone for this place could not be found. Choose another place nearby.',
    'cx.place.chosen': '{place} · {zone}',
    'cx.keep': 'Keep on this device',
    'cx.keep.hint': 'Otherwise this person is forgotten when the tab closes.',
    'cx.err.label': 'Add a name to show.',
    'cx.err.names': 'Both birth names are needed.',
    'cx.err.date': 'Enter a valid date of birth.',
    'cx.err.future': 'The date of birth is in the future.',
    'cx.err.time': 'Enter the time, or choose Not known.',
    'cx.err.place': 'Choose the place of birth from the list.',
    'cx.err.adult': 'This person is eighteen or older. Choose Family for an adult relationship.',
    'cx.err.minor': 'This person is under eighteen. Intimate and work readings are for adults.',
    /* The menu card's own name. The screen it opens keeps its full title (`synthesis.title`). */
    'menu.synthesis': 'Synthesis',
    /* The short names that stand under the four pillar cards on the menu (the full names above stay the controls' accessible names). */
    'menu.pillarShort.western-astrology': 'Astro',
    'menu.pillarShort.numerology': 'Numero',
    'menu.pillarShort.human-design': 'HD',
    'menu.pillarShort.bazi-tcm': 'BaZi',
    'menu.soon': 'Coming soon',
    'ui.reviewDetails': 'Review details',
    'ui.forecast': 'Numerology forecast',
    'ui.nav.previous': 'Previous',
    'ui.nav.next': 'Next',
    'ui.nav.aria': 'Move between readings',
    /* ------------------------------------------------------------- options */
    /* The theme group's own heading. It read 'Options · Theme' while this sheet
       WAS the options panel; it now sits under Settings, which says the first
       half already. */
    'options.theme': 'Theme',
    'options.language': 'Language',
    'options.haptics': 'Vibration',
    'options.haptics.on': 'On',
    'options.haptics.off': 'Off',
    'options.colors': 'Colors',
    'options.colors.interface': 'Interface color',
    'options.colors.earth': 'Earth glow',
    'options.colors.intensity': 'Light intensity',
    'options.colors.intensityNeedsColor': 'Choose a color to adjust its light.',
    'options.colors.glass': 'Panel opacity',
    'options.colors.glassClear': 'Clear',
    'options.colors.glassSolid': 'Solid',
    'options.colors.glassDefault': 'Default 15 %',
    'options.colors.transparent': 'Transparent',
    'options.colors.default': 'Default',
    'options.colors.family.purple': 'Purple',
    'options.colors.family.gold': 'Gold',
    'options.colors.family.magenta': 'Magenta',
    'options.colors.family.cyclamen': 'Cyclamen',
    'options.colors.family.turquoise': 'Turquoise',
    'options.colors.family.indigo': 'Indigo',
    'options.colors.family.rose': 'Rose',
    'options.resetTheme': 'Reset to default',
    'options.close': 'Close options',
    /*
     * ACCENT THEME NAMES.
     *
     * Ordinary colour words, so they translate. They are not brand names - there
     * is no "KNOW THYSELF Emerald" - and leaving them in English put five English
     * words in the middle of an otherwise Slovak panel.
     *
     * "Default" is the exception in meaning rather than in language: it is a MODE
     * that follows the chosen Vessel, not a colour, so the Slovak is "Podľa
     * schránky" (by vessel) rather than a literal "Predvolená".
     */
    'options.theme.default': 'Default',
    'options.theme.neutral': 'Neutral',
    'options.theme.blue': 'Blue',
    'options.theme.rose': 'Rose',
    'options.theme.gold': 'Gold',
    'options.theme.emerald': 'Emerald',
    'options.theme.silver': 'Silver',
    /* -------------------------------------------------- numerology forecast */
    /* Not „Numerology forecast" any more: the reading above the cycles is built
       from numerology, BaZi timing and transits together, and a kicker naming one
       of the three would be telling the reader something untrue about what they
       are looking at. */
    'fc.kicker': 'What is active now',
    'fc.title': 'Energy forecast',
    'fc.today': 'Today',
    'fc.chooseDate': 'Choose a date',
    'fc.prevDay': 'Previous day',
    'fc.nextDay': 'Next day',
    /* ------------------------------------------------- the day rail and the climate */
    /*
     * TWO TIMESCALES, NAMED SO THE READER CAN TELL THEM APART.
     *
     * The rail is the day and the climate is everything slower than a day. These
     * strings exist because the screen used to print both at one weight, and a
     * reader had no way of knowing which sentences would still be true next month.
     */
    'fc.rail.label': 'Days of the month',
    'fc.rail.years': 'Years',
    'fc.yearAria': '{year}, Personal Year {value}',
    'fc.monthAria': '{month}, Personal Month {value}',
    'fc.rail.months': 'Months',
    'fc.climate.title': 'Background climate',
    'fc.climate.personalYear': 'Personal Year {number} — {keyword}',
    'fc.climate.personalMonth': 'Personal Month {number} — {keyword}',
    'fc.relevantMonths': 'Months that stand out in this year’s numbers',
    /*
     * The label on the demoted per-number dictionary. It has to say two things at
     * once: what is inside, and that it is not about the reader - because for the
     * whole life of this screen it looked exactly as personal as the reading above
     * it, and it never was.
     */
    'fc.cycleReference': 'What the number {number} generally means',
    'fc.cycleReferenceNote': 'The traditional meaning of this number, the same for everyone who has it. It is general '
        + 'and not drawn from your own chart.',
    'fc.facet.resonance': 'Against your Life Path',
    /* The day card's three cycles, and the name of a repeated number. A label
       exists only for a repetition: three different numbers need no badge. */
    'fc.cycles.line': 'Year {year} · Month {month} · Day {day}',
    'fc.relation.triple': 'Triple resonance',
    'fc.relation.year-month': 'Year–month resonance',
    'fc.relation.month-day': 'Month–day resonance',
    'fc.relation.year-day': 'Year–day echo',
    'fc.noMarkers': 'No month this year carries a marker.',
    'fc.calendarKey': 'Small number on each day is its Personal Day.',
    'fc.dayAria': '{day}, Personal Day {value}',
    'fc.lunarKicker': 'Traditional / lunar guidance',
    'fc.lunarHead': '{phase} · {percent}% lit · {trend}',
    'fc.lunarNote': 'Moon phase computed with astronomy-engine at 12:00 UTC for this date.',
    'fc.majorPhase': '{phase} · exactly at {time}',
    'fc.majorPhaseNote': 'The exact moment is the same everywhere on Earth; the time shown is for the time zone of this device.',
    'fc.moonAria': 'The Moon on this date: {phase}, {percent}% lit',
    'fc.moonCredit': 'Moon map: NASA SVS / LRO',
    'fc.nearlyFull': 'Nearly full',
    'fc.moonExplore': 'Explore Lunar Forecast',
    'fc.moonOpenAria': 'Explore Lunar Forecast. The Moon on this date: {phase}, {percent}% lit',
    'fc.lunarDetailTitle': 'Lunar Forecast',
    'fc.lunarBack': 'Back to the Forecast',
    'fc.lunarDetailDate': 'The Moon for {date}',
    'fc.nearlyNew': 'Nearly new',
    'fc.source': 'Source: {source}',
    'fc.method': 'How this is calculated',
    'fc.domains.title': 'Day profile',
    'fc.domains.note': 'Each area shows how this day compares with a typical day.',
    'fc.domains.noteToday': 'Each area shows how today compares with a typical day.',
    'fc.domains.aria': '{domain}: {state}, {level} of 5',
    'fc.domain.atmosphere': 'Atmosphere',
    'fc.domain.communication': 'Communication',
    'fc.domain.relationships': 'Relationships',
    'fc.domain.private-life': 'Private life',
    'fc.domain.work': 'Work',
    'fc.domainLevel.1': 'Quiet',
    'fc.domainLevel.2': 'Light',
    'fc.domainLevel.3': 'Usual',
    'fc.domainLevel.4': 'Lively',
    'fc.domainLevel.5': 'Strong',
    'fc.level.aria': 'Forecast scale',
    'fc.level.year': 'Year',
    'fc.level.month': 'Month',
    'fc.level.day': 'Day',
    'fc.period.yearProfile': 'Year profile',
    'fc.period.yearProfileNote': 'Each area shows how this year compares with a typical day.',
    'fc.period.monthProfile': 'Month profile',
    'fc.period.monthProfileNote': 'Each area shows how this month compares with a typical day.',
    'fc.trend.areas': 'Areas',
    'fc.trend.showArea': 'Show {area}',
    'fc.trend.prevArea': 'Previous area',
    'fc.trend.nextArea': 'Next area',
    'fc.trend.openMonth': 'Open {point}',
    'fc.trend.openDay': 'Open {point}',
    'fc.trend.valueText': '{point}: {state}',
    'fc.trend.yearAria': '{area} through {period}, month by month',
    'fc.trend.monthAria': '{area} through {period}, day by day',
    'fc.trend.hintYear': 'Tap the graph to pick a month. Swipe sideways for another area.',
    'fc.trend.hintMonth': 'Tap the graph to pick a day. Swipe sideways for another area.',
    /* ------------------------------------------- the forecast, in plain words --
     *
     * The Year, the Month and the Day's background, written by forecastNarrative.
     * One vocabulary for all three levels. No dimension label, band name or model
     * term appears in these: they say what a period is about and what to do with
     * it, and the evidence goes behind "How this was calculated".
     *
     * NO PROPHECY, as everywhere in the forecast: pressure, emphasis, tendency,
     * never an event.
     */
    'fc.timescale.background': 'Long-term background',
    'fc.timescale.year': 'This year',
    'fc.timescale.transits': 'Current longer transits',
    'fc.timescale.month': 'This month',
    'fc.timescale.day': 'This day',
    'fc.timescale.today': 'Today',
    'fc.name.annual': 'BaZi year pillar {pillar}',
    'fc.name.luck': 'BaZi luck pillar {pillar}',
    'fc.name.transit': '{body} {aspect} {natal}',
    'fc.name.sun': 'Sun in {sign}',
    'fc.aspect.conjunction': 'conjunct',
    'fc.aspect.sextile': 'sextile',
    'fc.aspect.square': 'square',
    'fc.aspect.trine': 'trine',
    'fc.aspect.opposition': 'opposite',
    'fc.natal.sun': 'natal Sun',
    'fc.natal.moon': 'natal Moon',
    'fc.natal.mercury': 'natal Mercury',
    'fc.natal.venus': 'natal Venus',
    'fc.natal.mars': 'natal Mars',
    'fc.when.allYear': 'all year',
    'fc.when.allMonth': 'all month',
    'fc.when.ongoingMonth': 'ongoing through this month',
    'fc.when.from': 'from {date}',
    'fc.when.until': 'until {date}',
    'fc.when.days': 'on {days} days',
    'fc.x.and': 'and',
    'fc.x.mainClimate': 'Main climate',
    'fc.x.supports': 'What supports it',
    'fc.x.pulls': 'Where it pulls two ways',
    'fc.x.todo': 'What to do with it',
    'fc.x.bridgeLabel': 'In the bigger picture',
    'fc.x.more': 'More about this period',
    'fc.x.strongest': 'Strongest influences',
    'fc.x.mainTension': 'Main tension',
    'fc.x.todoYear': 'What to do this year',
    'fc.x.todoMonth': 'What to do this month',
    'fc.x.sameAs': 'Same theme as {name}, on a shorter scale.',
    'fc.x.nothing': 'No single theme stands out; the influences below are fairly evenly balanced.',
    'fc.x.estimatedTime': 'No birth time was given, so the transit details are approximate.',
    'fc.x.leadYear': '{year} is mainly about {lean}.',
    'fc.x.leadYearShared': '{year} is mainly about {lean}, and more than one influence points that way.',
    'fc.x.yearPartialOne': 'The BaZi year turns in early February, so January still belongs to the previous BaZi year.',
    'fc.x.yearPartialMany': 'The BaZi year turns in early February, so January still belongs to the previous BaZi year.',
    'fc.x.leadPeriod': 'Taken as a whole, the longer stretch is mainly about {lean}.',
    'fc.x.leadPeriodShared': 'Taken as a whole, the longer stretch is mainly about {lean}, and several influences point that way.',
    'fc.x.month.with': '{month} goes with the main direction of the year: among its influences, the strongest theme is {lean}.',
    'fc.x.month.against': '{month} works as a counterweight to the year: among its influences, the strongest theme is {lean}.',
    'fc.x.month.own': '{month} adds a note of its own to the year: among its influences, the strongest theme is {lean}.',
    'fc.x.pullYear': 'At the same time, part of the year pulls you {pull}.',
    'fc.x.pullMonth': 'At the same time, part of the month pulls you {pull}.',
    'fc.x.pullPeriod': 'At the same time, some influences pull you {pull}.',
    'fc.x.pullNatal': 'Part of it also runs against your own chart, which pulls you {pull}.',
    'fc.x.tension': 'One part of {period} pulls you {pullA} ({namesA}); another pulls you {pullB} ({namesB}). '
        + '{balance}',
    'fc.x.tensionNatal': '{period} pulls you {pullA} ({namesA}), while your own chart pulls you {pullH} ({natal}). '
        + '{habit} {balance}',
    'fc.x.periodOf.year': 'this year',
    'fc.x.periodOf.month': 'this month',
    'fc.x.periodOf.period': 'this period',
    'fc.x.periodThis.year': 'This year',
    'fc.x.periodThis.month': 'This month',
    'fc.x.periodThis.period': 'This period',
    'fc.x.dayToday': 'Today',
    'fc.x.dayThis': 'This day',
    'fc.x.nowToday': 'today',
    'fc.x.nowThis': 'on this day',
    'fc.x.bridge.with': '{day} runs with the longer stretch around it rather than against it: {act} {now}, and it '
        + 'tends to move the main theme of that stretch forward – {lean}.',
    'fc.x.bridge.against': '{day} is likely to be {tone} than the longer stretch around it. Use that contrast rather '
        + 'than fighting it: {act} {now}, then return to the main theme of that stretch – {lean}.',
    'fc.x.bridge.own': '{day} adds its own note to the longer stretch around it: {act} {now}, while the main '
        + 'theme of that stretch – {lean} – is likely to stay in the background.',
    'fc.x.methodYear': 'Year profile: every day of {year}, each read the way the Day view reads it; each point on '
        + 'the graph is that month on its own. The summary and the influences use everything active '
        + 'during the year, each weighted by how many of its days it covers, not one sample date.',
    'fc.x.methodMonth': 'Month profile and graph: every day of the month, each read the way the Day view reads it. '
        + 'The profile is the average of the graph. The summary and the influences use everything '
        + 'active during the month, each weighted by how many of its days it covers.',
    'fc.x.methodDay': 'Everything in force on this date, grouped by how long it lasts. Longer influences weigh more '
        + 'than short ones, so a single day can colour the period but never lead it.',
    'fc.x.activeDays': 'active on {days} of {total} days',
    'fc.lean.introspective': 'reflection and inner work',
    'fc.lean.outwardly-engaged': 'outward activity and getting involved',
    'fc.lean.analytical': 'careful analysis',
    'fc.lean.intuitive': 'trusting your instincts',
    'fc.lean.independent': 'acting on your own terms',
    'fc.lean.collaborative': 'working with other people',
    'fc.lean.structured': 'structure and routine',
    'fc.lean.adaptable': 'flexibility and adjusting as you go',
    'fc.lean.cautious': 'caution and careful choices',
    'fc.lean.risk-oriented': 'taking chances',
    'fc.lean.emotionally-expressive': 'showing what you feel',
    'fc.lean.emotionally-contained': 'keeping your feelings steady',
    'fc.lean.private': 'privacy and time to yourself',
    'fc.lean.social': 'company and time with people',
    'fc.lean.stability-seeking': 'stability and keeping what works',
    'fc.lean.novelty-seeking': 'new beginnings and change',
    'fc.lean.assertive': 'taking the initiative',
    'fc.lean.receptive': 'patience and letting things develop',
    'fc.lean.practical': 'practical, hands-on work',
    'fc.lean.conceptual': 'ideas and planning',
    'fc.lean.creative': 'creating something new',
    'fc.lean.persistent': 'persistence and seeing things through',
    'fc.lean.emotionally-sensitive': 'sensitivity to people and atmosphere',
    'fc.lean.communicative': 'talking, writing and explaining',
    'fc.pull.introspective': 'inward, toward reflection and recharging',
    'fc.pull.outwardly-engaged': 'outward, toward action and involvement',
    'fc.pull.analytical': 'toward careful analysis',
    'fc.pull.intuitive': 'toward trusting your instincts',
    'fc.pull.independent': 'toward going your own way',
    'fc.pull.collaborative': 'toward working with others',
    'fc.pull.structured': 'toward structure and routine',
    'fc.pull.adaptable': 'toward flexibility',
    'fc.pull.cautious': 'toward caution',
    'fc.pull.risk-oriented': 'toward taking chances',
    'fc.pull.emotionally-expressive': 'toward showing your feelings',
    'fc.pull.emotionally-contained': 'toward keeping your feelings in check',
    'fc.pull.private': 'toward privacy',
    'fc.pull.social': 'toward company',
    'fc.pull.stability-seeking': 'toward stability',
    'fc.pull.novelty-seeking': 'toward change and new things',
    'fc.pull.assertive': 'toward action and initiative',
    'fc.pull.receptive': 'toward patience and support from others',
    'fc.pull.practical': 'toward practical matters',
    'fc.pull.conceptual': 'toward ideas and planning',
    'fc.pull.creative': 'toward creating',
    'fc.pull.persistent': 'toward persistence',
    'fc.pull.emotionally-sensitive': 'toward sensitivity',
    'fc.pull.communicative': 'toward talking things through',
    'fc.balance.inner-focus': 'Balance outward action with time for reflection.',
    'fc.balance.reasoning': 'Check your instincts against the facts before you commit.',
    'fc.balance.autonomy': 'Decide what is yours to decide alone, and what needs other people.',
    'fc.balance.structure': 'Keep a plan, but leave room to change it.',
    'fc.balance.risk': 'Take chances where the downside is small, and be careful where it is not.',
    'fc.balance.emotional-expression': 'Say what matters, but choose the moment.',
    'fc.balance.visibility': 'Balance time with others and time alone.',
    'fc.balance.change': 'Change what needs changing, and keep what already works.',
    'fc.balance.initiative': 'Make the next move where the decision is yours; where timing depends on another person, leave room for their response.',
    'fc.balance.abstraction': 'Think it through, then put it into practice.',
    'fc.guideYear.introspective': 'Make regular time this year to step back and think before the big decisions.',
    'fc.guideYear.outwardly-engaged': 'Lean toward outside involvement this year (projects, people and places), taken on one at a time, with the terms read before you commit.',
    'fc.guideYear.analytical': 'Base the important choices of this year on facts you have checked.',
    'fc.guideYear.intuitive': 'Give your first instincts more weight this year, then check them against the facts.',
    'fc.guideYear.independent': 'Decide what you want to build on your own terms this year, and do not wait for permission.',
    'fc.guideYear.collaborative': 'Build this year around the right people, and agree on roles early.',
    'fc.guideYear.structured': 'Set up the routines this year that will still carry you next year.',
    'fc.guideYear.adaptable': 'Keep your plans for this year flexible, and review them every few months.',
    'fc.guideYear.cautious': 'Take on fewer commitments this year, and check the downside before each one.',
    'fc.guideYear.risk-oriented': 'Take one well-chosen risk this year rather than waiting for certainty.',
    'fc.guideYear.emotionally-expressive': 'Say what you feel sooner this year instead of letting it build up.',
    'fc.guideYear.emotionally-contained': 'Give strong feelings some time this year before you act on them.',
    'fc.guideYear.private': 'Protect time for yourself this year, and share plans only when they are ready.',
    'fc.guideYear.social': 'Time spent on your contacts may count for more this year, because new people can matter more than usual.',
    'fc.guideYear.stability-seeking': 'Strengthen what already works this year before you add anything new.',
    'fc.guideYear.novelty-seeking': 'Choose the one new direction that matters most this year and commit to it early.',
    'fc.guideYear.assertive': 'Take the lead this year on what matters most to you, and make the key decisions yourself.',
    'fc.guideYear.receptive': 'Let the opportunities of this year come to you, and respond to them well instead of forcing.',
    'fc.guideYear.practical': 'Turn the plans of this year into concrete, measurable results.',
    'fc.guideYear.conceptual': 'Spend time this year on the big picture: plans, ideas and direction.',
    'fc.guideYear.creative': 'Make room this year for a project in which you create something of your own.',
    'fc.guideYear.persistent': 'Pick the few things worth finishing this year and see them through.',
    'fc.guideYear.emotionally-sensitive': 'Pay attention this year to how the people around you are doing, and adjust.',
    'fc.guideYear.communicative': 'Put your ideas into words this year: write, present and explain them.',
    'fc.guideMonth.introspective': 'Keep the calendar lighter this month and leave room to think.',
    'fc.guideMonth.outwardly-engaged': 'Get out and take part this month rather than watching from the side.',
    'fc.guideMonth.analytical': 'Before you commit to anything this month, check the numbers and details twice.',
    'fc.guideMonth.intuitive': 'Notice your first reactions this month, because they are often ahead of your reasoning.',
    'fc.guideMonth.independent': 'Make one decision this month without waiting for everyone to agree.',
    'fc.guideMonth.collaborative': 'Bring the key people in early this month and agree who does what.',
    'fc.guideMonth.structured': 'Put one routine or system in place this month and stick to it.',
    'fc.guideMonth.adaptable': 'Leave some slack in this month’s plans, so there is room to adjust them.',
    'fc.guideMonth.cautious': 'Hold back on big commitments this month until you have checked the risks.',
    'fc.guideMonth.risk-oriented': 'If an opportunity appears this month, test it with a small first step.',
    'fc.guideMonth.emotionally-expressive': 'Have the honest conversation this month rather than postponing it again.',
    'fc.guideMonth.emotionally-contained': 'Sleep on emotional decisions this month before you act on them.',
    'fc.guideMonth.private': 'Keep some of your plans to yourself this month until they are ready.',
    'fc.guideMonth.social': 'Say yes to meetings and invitations this month.',
    'fc.guideMonth.stability-seeking': 'Consolidate this month: finish, fix and secure before you expand.',
    'fc.guideMonth.novelty-seeking': 'Take the first concrete step on something new this month instead of planning further.',
    'fc.guideMonth.novelty-seeking-partnership': 'This month also highlights working with others. If you try something new, start small and discuss the step with the people involved.',
    'fc.guideMonth.assertive': 'Take the initiative this month: make the call instead of waiting to be asked.',
    'fc.guideMonth.receptive': 'Where the timing is not yours to set, wait for the right opening this month and act on it when it comes.',
    'fc.guideMonth.practical': 'Pick one practical task this month and finish it completely.',
    'fc.guideMonth.conceptual': 'Write the plan down this month before you start the work.',
    'fc.guideMonth.creative': 'Give one creative idea real working time this month.',
    'fc.guideMonth.persistent': 'Stay with one unfinished task this month until it is done.',
    'fc.guideMonth.emotionally-sensitive': 'Check in with the people close to you this month.',
    'fc.guideMonth.communicative': 'Have the important conversations this month rather than assuming.',
    'fc.dayTone.1': 'more decisive and self-directed',
    'fc.dayTone.2': 'slower and more cooperative',
    'fc.dayTone.3': 'more talkative and sociable',
    'fc.dayTone.4': 'steadier and more methodical',
    'fc.dayTone.5': 'more restless and changeable',
    'fc.dayTone.6': 'more focused on duties and the people close to you',
    'fc.dayTone.7': 'quieter and more reflective',
    'fc.dayTone.8': 'more demanding and results-driven',
    'fc.dayTone.9': 'more about finishing',
    'fc.dayAct.1': 'decide and start',
    'fc.dayAct.2': 'coordinate and listen',
    'fc.dayAct.3': 'talk things through',
    'fc.dayAct.4': 'work steadily and in order',
    'fc.dayAct.5': 'leave room for changes',
    'fc.dayAct.6': 'take care of your commitments',
    'fc.dayAct.7': 'think and review',
    'fc.dayAct.8': 'make one result concrete',
    'fc.dayAct.9': 'finish and clear',
    'fc.methodBody': 'Personal Year = birth month + birth day + calendar year, reduced. Personal Month '
        + '= Personal Year + month, reduced. Personal Day = Personal Month + day, reduced. '
        + 'The working for each is shown above its section. The Personal Year runs from 1 '
        + 'January to 31 December, the calendar year, not from your birthday. The BaZi annual '
        + 'pillar turns at Li Chun instead, in the first days of February, so for the first '
        + 'weeks of January the previous BaZi year still applies.',
    'fc.needBirthDate': 'The forecast needs a resolved birth date. Add one in Review details and it will calculate.',
    /* The forecast's own headings and captions, which the screen used to print
       as English literals. English values are exactly those literals, so the
       English screen is unchanged; the Slovak ones are the reader's. */
    'fc.badge.year': 'Personal Year {year}',
    'fc.badge.month': 'Personal Month · {month} {year}',
    'fc.badge.day': 'Personal Day · {label}',
    'fc.facet.year.opportunities': 'Opportunities',
    'fc.facet.year.cautions': 'Cautions',
    'fc.facet.year.work': 'Work and career',
    'fc.facet.year.money': 'Money',
    'fc.facet.year.relationships': 'Relationships',
    'fc.facet.year.family': 'Family and home',
    'fc.facet.year.development': 'Personal development',
    'fc.facet.year.goodToStart': 'Good to start',
    'fc.facet.year.betterToFinish': 'Better to finish',
    'fc.facet.year.doNotForce': 'Do not force',
    'fc.facet.month.tone': 'Emotional and practical tone',
    'fc.facet.month.focus': 'Where to focus',
    'fc.facet.month.work': 'Work and career',
    'fc.facet.month.money': 'Money',
    'fc.facet.month.relationships': 'Relationships',
    'fc.facet.month.family': 'Family',
    'fc.facet.month.creativity': 'Creativity',
    'fc.facet.month.rest': 'Rest and recovery',
    'fc.facet.month.decisions': 'Decisions',
    'fc.facet.month.social': 'Social activity',
    'fc.facet.month.favorable': 'Favourable actions',
    'fc.facet.month.caution': 'Caution areas',
    'fc.trace.birthMonth': 'Birth month',
    'fc.trace.birthDay': 'Birth day',
    'fc.trace.calendarYear': 'Calendar year',
    'fc.trace.personalYear': 'Personal Year',
    'fc.trace.calendarMonth': 'Calendar month',
    'fc.trace.personalMonth': 'Personal Month',
    'fc.trace.dayOfMonth': 'Day of month',
    'fc.facet.favorable': 'Favourable actions',
    'fc.facet.cautions': 'Cautions',
    'fc.facet.work': 'Work',
    'fc.facet.communication': 'Communication',
    'fc.facet.relationships': 'Relationships',
    'fc.facet.planning': 'Planning',
    'fc.facet.rest': 'Rest',
    'fc.facet.practical': 'Practical tasks',
    'fc.facet.pace': 'Pace and intensity',
    /* The one line shown over the opening warp, as the descent begins. */
    'onb.intro.incarnation': 'Your soul is entering matter',
    /*
     * THE SIGN, AS THE CARD SAYS IT.
     *
     * Presentation only. The engine's value is untouched - it still reads "Virgo"
     * everywhere it is calculated, traced or checked - and this is consulted just
     * once, where the hub card prints the Sun's identity line.
     *
     * It has to be the WHOLE phrase rather than the sign name alone, because
     * Slovak declines the sign into the locative AND alternates the preposition:
     * "v Panne" but "vo Váhach", "vo Vodnárovi". A shared "v" in the label would
     * be wrong twice out of twelve, so the preposition travels with the sign.
     *
     * English returns the bare name, so the card reads exactly as it did.
     */
    'zodiac.in.aries': 'Aries',
    'zodiac.in.taurus': 'Taurus',
    'zodiac.in.gemini': 'Gemini',
    'zodiac.in.cancer': 'Cancer',
    'zodiac.in.leo': 'Leo',
    'zodiac.in.virgo': 'Virgo',
    'zodiac.in.libra': 'Libra',
    'zodiac.in.scorpio': 'Scorpio',
    'zodiac.in.sagittarius': 'Sagittarius',
    'zodiac.in.capricorn': 'Capricorn',
    'zodiac.in.aquarius': 'Aquarius',
    'zodiac.in.pisces': 'Pisces',
    /* ---------------------------------------------------- pillar hub cards */
    /*
     * The hub card shows four things per pillar and they all came from model.ts as
     * English literals: the eyebrow, the title, the first key output's label and
     * the status line. Localising them at the card rather than in model.ts keeps
     * the engine layer free of presentation - the model still describes what it
     * computed, and the card decides how to say it.
     *
     * "Human Design" and "BaZi" stay as they are: they are the proper names of the
     * systems, and a reading stops being checkable against any other source the
     * moment its system name is translated. TCM becomes TCM's Slovak initialism
     * because that one IS commonly written out in Slovak.
     */
    'pillar.numerology.title': 'Numerology',
    'pillar.numerology.eyebrow': 'Deterministic name and date structure',
    'pillar.numerology.output': 'Life path',
    'pillar.western-astrology.title': 'Western Astrology',
    'pillar.western-astrology.eyebrow': 'Calculated from resolved birth moment',
    'pillar.western-astrology.output': 'Sun',
    'pillar.bazi-tcm.title': 'BaZi / TCM',
    'pillar.bazi-tcm.eyebrow': 'Calculated Four Pillars and Five Element structure',
    'pillar.bazi-tcm.output': 'Year pillar',
    'pillar.human-design.title': 'Human Design',
    'pillar.human-design.eyebrow': 'Calculated gate, channel, and center mechanics',
    'pillar.human-design.output': 'Type',
    'pillar.status.calculatedLocally': 'Calculated locally',
    'pillar.status.unavailable': 'Unavailable',
    'synthesis.card.convergence': 'Strongest convergence',
    'synthesis.card.agreement': '{count} of four systems agree',
    'synthesis.card.noConvergence': 'Limited: no convergence across the systems',
    /* ---------------------------------------------- chart and diagram chrome */
    'chart.unavailableUntilMoment': 'This diagram is unavailable until the birth moment can be normalized.',
    'chart.astro.aria': 'Western Astrology natal chart wheel',
    /* No birth time is not an estimated one: the wheel leaves the hour's parts
       out because there is no time, and an estimate would bring them back. */
    'chart.astro.ariaSuppressed': 'Western Astrology natal chart wheel, without houses or angles because no birth time was given',
    'chart.astro.unavailableAria': 'Western Astrology chart wheel, unavailable',
    'chart.astro.suppressedLabel': 'No birth time was given, so the houses, the angles and the chart ruler are left out.',
    'chart.astro.suppressedCta': 'Add a birth time, even an estimate, to calculate the Ascendant, Midheaven, houses and chart ruler.',
    /* ONE sentence about the fallback, used everywhere the fallback actually
       changes what is shown. It names the substitute AND says results may be
       wrong because of it - the whole point is that a reader can tell the
       difference between a time they gave and a time we chose. */
    'time.unknownFallbackNotice': 'Your exact birth time is unknown. The calculations use 12:00 local time on your birth date only as a reference: what depends on the hour is left out or shown for the whole day, never read from that reference.',
    'chart.astro.footer': 'Whole Sign Houses · Ascendant {ascendant} · {count} major aspect(s)',
    /* An estimated birth time: the rising sign and houses on the wheel rest on it. */
    'chart.astro.footerEstimated': 'Whole Sign Houses · Ascendant {ascendant}, from your estimated time · {count} major aspect(s)',
    /* THE ADVANCED CHART: an optional panel under the natal wheel. The standard wheel is the default and stays exactly as it was; these are the controls for what a
       reader can add to it. Every label is for a control the chart genuinely supports. */
    'chart.astro.adv.title': 'Advanced chart',
    'chart.astro.adv.aria': 'Advanced chart controls',
    'chart.astro.adv.groupObjects': 'Objects',
    'chart.astro.adv.groupAspects': 'Aspects',
    'chart.astro.adv.groupHouses': 'Houses',
    'chart.astro.adv.groupDisplay': 'Display',
    'chart.astro.adv.lunarNodes': 'Lunar nodes',
    'chart.astro.adv.majorAspects': 'Major aspects',
    'chart.astro.adv.minorAspects': 'Minor aspects',
    'chart.astro.adv.minorHint': 'Thin dashed: 30°, 45°, 135°, 150°',
    'chart.astro.adv.houseNumbers': 'House numbers',
    'chart.astro.adv.degreeLabels': 'Degree labels',
    'chart.astro.adv.retrogradeMarkers': 'Retrograde markers',
    'chart.astro.adv.houseSystem': 'House system',
    'chart.astro.adv.system.whole-sign': 'Whole Sign',
    'chart.astro.adv.system.equal': 'Equal House',
    'chart.astro.adv.system.porphyry': 'Porphyry',
    'chart.astro.adv.system.placidus': 'Placidus',
    'chart.astro.adv.houseNote': 'This wheel now shows {system} houses. Your reading and the main Technical details still use Whole Sign houses; the other systems are listed in Technical details.',
    'chart.astro.adv.needTime': 'Minor aspects and the other house systems need a birth time.',
    'chart.astro.adv.reset': 'Back to the standard chart',
    'chart.astro.footerExplore': '{system} houses, for exploration · Ascendant {ascendant} · {count} major aspect(s)',
    'chart.astro.footerMinor': '{count} minor aspect(s) shown',
    'chart.bazi.wheelAria': 'Five Phase cycle wheel',
    'chart.bazi.wheelUnavailableAria': 'Five Phase cycle wheel, unavailable',
    'chart.bazi.wheelFullAria': 'Five Phase generating and controlling cycle wheel with Day Master {element} highlighted',
    'chart.bazi.wheelNote': 'Node size = raw visible count. Day Master phase ({element}) is highlighted gold. '
        + 'Solid gold = generating cycle; dashed red = controlling cycle.',
    'chart.bazi.nodeTitle': '{phase}: {count} counted position(s)',
    'chart.bazi.nodeTitleDayMaster': '{phase}: {count} counted position(s) (Day Master phase)',
    'chart.bazi.arcAria': 'Seasonal governance ring',
    'chart.bazi.arcUnavailableAria': 'Seasonal arc, unavailable',
    'chart.bazi.arcFullAria': 'Seasonal governance ring for Day Master {element}, birth month {branch} highlighted',
    'chart.bazi.arcNote': "Each month's tint shows how seasonally supported the Day Master ({element}) would be "
        + 'if that month governed the chart. Gold outline = actual birth month ({branch}).',
    'chart.bazi.sectorTitle': '{branch} ({animal}) month: Day Master {element} would be seasonally {state}',
    'chart.bazi.sectorTitleActive': '{branch} ({animal}) month: Day Master {element} would be seasonally {state} '
        + '— this is the actual birth month',
    'chart.bazi.dayMaster': 'Day Master',
    'bazi.sheet.back': 'Back to {title}',
    'bazi.sheet.previousTopic': 'the previous topic',
    'bazi.sheet.englishOnly': 'These explanations are written in English only.',
    'bazi.sheet.personal': 'In your chart',
    'bazi.sheet.explore': 'Explore more',
    'bazi.sheet.yourMonth': 'Your birth month',
    'bazi.sheet.yourAnimal': 'Your Year Animal',
    'bazi.sheet.yourDayMaster': 'Your Day Master',
    'bazi.legend.cyclesAria': 'Explore the cycles and the numbers',
    'bazi.legend.generating': 'Generating cycle',
    'bazi.legend.controlling': 'Controlling cycle',
    'bazi.legend.numbers': 'What the numbers count',
    'bazi.legend.wheelAria': 'Explore the seasonal wheel',
    'bazi.legend.goldenPetal': 'The golden petal',
    'bazi.legend.seasonal': 'Seasonal support',
    'bazi.legend.months': 'All twelve months',
    'bazi.aria.open': '{subject}. Open the explanation.',
    'numerology.orbit.open': '{subject} {value}: open its meaning',
    'numerology.sheet.strengths': 'Strengths',
    'numerology.sheet.tensions': 'Tensions',
    'numerology.sheet.shows': 'How it can show up',
    'numerology.sheet.question': 'A question to carry',
    'numerology.sheet.footer': 'A symbolic reading to reflect on, not a measurement or a prediction.',
    'numerology.sheet.pos.life-path': 'Life Path',
    'numerology.sheet.pos.expression': 'Expression',
    'numerology.sheet.pos.soul-urge': 'Soul Urge',
    'numerology.sheet.pos.personality': 'Personality',
    'numerology.sheet.ask.life-path': 'The long shape of a life',
    'numerology.sheet.ask.expression': 'What you were equipped with',
    'numerology.sheet.ask.soul-urge': 'What feels worth doing, privately',
    'numerology.sheet.ask.personality': 'What people meet first',
    'bazi.aria.feeds': '{from} feeds {to}. Open the explanation.',
    'bazi.aria.regulates': '{from} regulates {to}. Open the explanation.',
    'bazi.aria.orb': '{element}, count {count}. Open the explanation.',
    'bazi.aria.orbDayMaster': '{element}, count {count}, your Day Master element. Open the explanation.',
    'bazi.aria.petal': '{branch} month, the {animal}. Open the explanation.',
    'bazi.aria.petalBirth': '{branch} month, the {animal}, your month of birth. Open the explanation.',
    'bazi.aria.disc': 'Day Master {polarity} {element}. Open the explanation.',
    'chart.hd.aria': 'Human Design BodyGraph',
    'chart.hd.ariaSuppressed': 'Human Design BodyGraph, mechanics withheld because no birth time was given',
    'chart.hd.suppressedLabel': 'Human Design mechanics are withheld because no birth time was given.',
    'chart.hd.ariaEnvelope': 'Human Design BodyGraph for the whole birth date: only what holds at every hour of it is drawn',
    'chart.hd.envelopeLabel': 'No birth time was given, so this BodyGraph shows only what holds at every hour of the birth date.',
    'chart.hd.envelopeNote': 'Grey centres depend on the hour of birth. Channels and gates are lit only where they hold all day.',
    'chart.hd.envelopeCta': 'A recorded birth time would complete the chart.',
    'chart.hd.suppressedCta': 'Provide exact birth time to calculate Type, Authority, Profile, Centers, Channels, and Gates.',
    'chart.hd.footer': '{type} · Profile {profile} · {count} center(s) defined',
    'chart.hd.design': 'Design',
    'chart.hd.designSub': 'Unconscious · ~88° before birth',
    'chart.hd.personality': 'Personality',
    'chart.hd.personalitySub': 'Conscious · the birth moment',
    'chart.hd.activationsAria': 'Planetary activations',
    'chart.hd.showActivations': 'Show the planetary activations',
    'chart.hd.showBodygraph': 'Show the BodyGraph',
    'chart.hd.deckHint': 'Tap to switch cards',
    'chart.hd.centerAria': '{center} centre, {state}. Opens an explanation.',
    'chart.hd.centerState.defined': 'defined',
    'chart.hd.centerState.open': 'open',
    'chart.hd.centerState.uncertain': 'uncertain without a birth time',
    'chart.hd.scrollCue': 'Scroll down to the reading',
    'chart.unavailableValue': 'Unavailable',
    /* -------------------------------------------------------------- the map */
    'map.previewEyebrow': 'MAP PREVIEW',
    'map.previewTitle': 'Loading the hybrid map.',
    'map.previewNote': 'No location is selected until an existing coordinate is provided or the map is clicked.',
    'map.unavailableEyebrow': 'MAP UNAVAILABLE',
    'map.unavailableTitle': 'The hybrid map could not be loaded.',
    'map.unavailableNote': 'Check the browser key restrictions and network access. No coordinates were changed.',
    /* -------------------------------------------------------- encyclopedia */
    'concept.aria': 'what this means in',
    'concept.fallbackNote': 'This explanation is not yet translated, so it is shown in English.',
    /* --------------------------------------------------------- onboarding --
       The Premium Earth flow. These were literals in the markup and in a dozen
       onboarding modules, which is why the app could run in Slovak with an
       English onboarding: the localization pass reached the READING surface and
       never reached this one. */
    'onb.search.question': 'Where will your story begin?',
    'onb.search.placeholder': 'Enter your birthplace',
    'onb.search.aria': 'Search for your birthplace',
    'onb.search.submit': 'Search',
    'onb.suggestions.aria': 'Birthplace suggestions',
    'onb.earth.aria': 'The Earth, slowly turning behind the page. Search for your birthplace below.',
    'onb.birthplace.label': 'Birthplace',
    'onb.birthplace.confirm': 'Confirm',
    'onb.birthplace.change': 'Change',
    'onb.birthplace.chooseAnother': 'Choose another',
    'onb.birthplace.aria': 'Choose and confirm your birthplace',
    'onb.birthplace.confirmed': 'Birthplace confirmed',
    'onb.birthplace.restored': 'Birthplace restored. You can edit it or confirm it again.',
    'onb.vessel.title': 'Choose your body',
    'onb.vessel.question': 'What body are you entering?',
    'onb.vessel.aria': 'Choose your birth vessel',
    'onb.vessel.male': 'Male',
    'onb.vessel.female': 'Female',
    'onb.vessel.undefined': 'Do not define',
    'onb.vessel.confirm': 'Accept Body',
    'onb.vessel.confirmed': 'Vessel confirmed',
    'onb.vessel.hint': 'Choose the body you are entering.',
    'onb.vessel.backAria': 'Back to vessel',
    'onb.identity.kicker': '03 \u00b7 Identity',
    'onb.identity.title': 'Who will you be?',
    'onb.identity.birthName': 'Birth name',
    'onb.identity.birthSurname': 'Birth surname',
    /* The placeholder IS the label here: the visible field is unlabelled and
       the <span> above it is screen-reader only, so an instruction like "Enter
       your birth name" was the only thing on screen and read as filler. */
    'onb.identity.namePlaceholder': 'Birth name',
    'onb.identity.surnamePlaceholder': 'Birth surname',
    'onb.identity.needName': 'Enter your birth name and birth surname.',
    'onb.arrival.kicker': '04 \u00b7 Arrival',
    'onb.arrival.title': 'At what moment are you arriving on Earth?',
    'onb.arrival.date': 'Date of arrival',
    'onb.arrival.time': 'Time of arrival',
    'onb.arrival.chooseDate': 'Choose date',
    'onb.arrival.chooseTime': 'Choose time',
    'onb.arrival.backAria': 'Back to arrival',
    'onb.arrival.editHint': 'Edit the date or time of your arrival on Earth.',
    'onb.flow.aria': 'Identity and arrival',
    'onb.picker.year': 'Year',
    'onb.picker.month': 'Month',
    'onb.picker.hour': 'Hour',
    'onb.picker.minute': 'Minute',
    'onb.picker.changeYear': 'Change year',
    'onb.picker.prevYear': 'Previous year',
    'onb.picker.nextYear': 'Next year',
    'onb.picker.prevMonth': 'Previous month',
    'onb.picker.nextMonth': 'Next month',
    'onb.picker.chooseMonth': 'Choose month',
    'onb.picker.chooseDay': 'Choose a day',
    'onb.picker.selectedDate': 'Selected date',
    'onb.picker.timeCaption': '24 hour time \u00b7 type directly',
    'onb.picker.hourAria': 'Hour from 00 to 23',
    'onb.picker.minuteAria': 'Minute from 00 to 59',
    'onb.picker.quickMinutes': 'Quick minute choices',
    'onb.picker.selectedTime': 'Selected time',
    'onb.picker.confirmTime': 'Confirm time',
    'onb.picker.unknownTime': "I don't know my birth time",
    'onb.review.title': 'Review your details',
    'onb.review.aria': 'Review profile details',
    'onb.review.name': 'Name',
    'onb.review.dateOfBirth': 'Date of birth',
    'onb.review.timeOfBirth': 'Time of birth',
    'onb.review.placeOfBirth': 'Place of birth',
    'onb.review.vessel': 'Vessel',
    'onb.review.flowAria': 'Identity, arrival and final overview',
    'onb.action.back': 'Back',
    'onb.action.next': 'Next',
    'onb.action.cancel': 'Cancel',
    'onb.action.ok': 'OK',
    'onb.action.confirm': 'Confirm',
    'onb.action.confirmAria': 'Confirm profile',
    'onb.action.createProfile': 'Create profile',
    'onb.complete.kicker': 'Profile ready',
    'onb.complete.title': 'Your first map is ready.',
    'onb.complete.copy': 'Your identity, vessel and moment of arrival are connected.',
    'onb.status.earthReady': 'Interactive Earth ready. Search or explore the globe.',
    'onb.status.searching': 'Searching places.',
    'onb.status.lookingUp': 'Looking up the selected map point.',
    'onb.vessel.kicker': '02 · Vessel',
    'onb.vessel.nonbinary': 'Nonbinary',
    'onb.vessel.ratherNotDefine': 'I’d rather not define it',
    'onb.vessel.orbitInstructions': 'Drag around the orbit to rotate the vessel choices. Tap a vessel to select it.',
    'onb.status.earthUnavailable': 'The Earth view is unavailable. Birthplace search remains available.',
    'onb.status.earthRestored': 'Earth view restored. Search to choose a birthplace.',
    'onb.status.timezoneUnresolved': 'The place is selected, but its timezone could not be resolved.',
    'onb.status.placeConfirmed': '{place} confirmed as your birthplace.',
    'onb.status.placeReady': '{place} is ready to confirm.',
    'onb.status.noResults': 'No matching places found for {query}.',
    'onb.status.resultsFound': '{count} places found.',
    'onb.status.searchUnavailable': 'Place search is temporarily unavailable. Try again.',
    'onb.map.unavailable': 'The map cannot be shown right now.',
    'onb.status.mapUnavailable': 'The map and place search are unavailable right now. Try again in a moment.',
    'onb.status.vesselSelected': '{vessel} selected.',
    'onb.status.vesselConfirmed': '{vessel} confirmed as your vessel.',
    'onb.place.mapPoint': 'Selected map point',
    'onb.place.locating': 'Locating\u2026',
    'onb.place.timezoneUnavailable': 'Timezone unavailable',
    'onb.place.kind.city': 'City',
    'onb.place.kind.town': 'Town',
    'onb.place.kind.village': 'Village',
    'onb.place.kind.facility': 'Maternity facility',
    'onb.place.facility.current': 'current OpenStreetMap record',
    'onb.place.kind.hospital': 'Hospital',
    'onb.place.hospital.unconfirmed': 'maternity ward not confirmed',
    'onb.place.timezoneLookupFailed': 'The timezone lookup failed for this place.',
    'onb.vessel.undefinedLabel': 'Undefined',
    'onb.overview.kicker': '05 · Overview',
    'onb.overview.copy': 'Make sure everything is correct before creating your profile.',
    'onb.overview.listAria': 'Profile details',
    'onb.overview.notSet': 'Not set',
    /* The row value for a time the reader said they do not know - the same two
       words the profile uses, so the answer reads the same everywhere. */
    'onb.time.unknown': 'Not known',
    /* Names 12:00 as what it is since the birth-time window: a reference the
       engines calculate at, never the reader's time and never what is read. */
    'onb.time.unknownEstimate': 'The whole birth date is read; 12:00 is only a reference',
    /* HOW CERTAIN THE TIME IS: one compact choice in the time picker. */
    'onb.time.precisionAria': 'Birth time certainty',
    'onb.time.precision.exact': 'Exact',
    'onb.time.precision.approximate': 'Approximate',
    'onb.time.precision.unknown': 'Unknown',
    'onb.time.approximateNote': 'Choose the closest time you know. Anything that could change within two hours of it is shown as provisional.',
    'onb.time.unknownNote': 'Without a birth time, each system reads only what your birth date settles. 12:00 is used as a reference, never as your time.',
    /* An approximate time never looks like an exact one: it always carries this. */
    'onb.time.approximateValue': 'Approx. {time}',
    'onb.time.approximateMeta': 'Your best estimate',
    'onb.overview.coordsTimezone': 'Coordinates · Timezone',
    'onb.overview.finalAction': 'Materialize Body',
    'onb.action.saveChange': 'Save change',
    'onb.action.reviewDetails': 'Review details',
    'onb.status.reviewBeforeCreate': 'Review your details before creating the profile.',
    'onb.status.needArrival': 'Enter the date and time of your arrival on Earth.',
    'onb.status.editIdentity': 'Edit your birth name and birth surname.',
    'onb.complete.reviewedCopy': 'Profile ready. Your reviewed details are connected.',
    'onb.complete.connected': 'Profile ready. Identity, vessel and arrival are connected.',
    'onb.vessel.chooseAria': 'Choose the {vessel} body',
    'onb.vessel.selectionAria': 'Body selection',
    'onb.vessel.changeSelectionAria': 'Change body selection',
    'onb.vessel.previousAria': 'Previous body',
    'onb.vessel.nextAria': 'Next body',
    'onb.place.markerTitle': 'Selected birthplace',
    'options.qaProfiles': 'QA profiles',
    'options.qaProfilesNote': 'Testing shortcuts. Loads a full profile and opens the self-map; edit it afterwards under Review details.',
    'options.qaOwnerRemove': 'Remove owner profiles from this device',
    'options.qaOwnerFromBuild': 'Owner profiles: sanitized public fallback. A public preview holds made-up people, never the real records.',
    'options.qaOwnerFromReview': 'Owner profiles: API (delivered privately for owner review).',
    'options.qaOwnerFromOwnerBuild': 'Owner QA profiles: from this build (the owner\'s development preview). The same on every device.',
    'options.qaOwnerReviewLoading': 'Owner profiles: loading...',
    'options.qaOwnerReviewFailed': 'Owner profiles: not delivered. This device is paired, but the private service did not answer and there is no earlier delivery.',
    'options.qaOwnerFromCache': 'Owner profiles: cached API (the private service did not answer; the last verified delivery is shown).',
    'options.qaOwnerReviewRefused': 'Owner review token refused (401): this device is no longer paired. Open a fresh pairing link. Showing the public fallback.',
    'options.qaOwnerHostMismatch': 'OWNER REVIEW HOST MISMATCH - the owner profiles work only on',
    'options.accentTheme': 'Accent theme',
    /* ------------------------------------------------------ the name layer -- */
    'section.your-name': 'Your name',
    'section.name-culture': 'Your name across cultures',
    'section.name-day': 'Name day',
    'name.meaningLine': '{name} descends from a word meaning {meaning}.',
    'name.meaningTraditionalLine': 'It has traditionally been read as meaning {meaning}.',
    'name.disputedIntro': 'More than one origin has been proposed for this name, and scholarship has not settled the question. Both readings are given below.',
    'name.notAboutYou': 'This describes where the word comes from. A name’s origin is a fact about language and history, not a statement about anyone who carries it.',
    'name.claimLine': '{claim} · {confidence}',
    'name.matchedVia': '{form} is recorded as {kind} of {name}, and the entry below is for that name.',
    'name.unknown': 'We do not yet have a sufficiently reliable etymological entry for {name}. Rather than guess, this section stays empty — the rest of your profile is unaffected.',
    'name.ambiguous': '{name} matches more than one entry in our records, and we will not guess which was meant. Nothing is shown rather than risk showing you another name’s history.',
    'name.variantsLine': 'Forms in other languages: {list}.',
    'name.diminutivesLine': 'Short and affectionate forms: {list}.',
    'name.relatedLine': 'Related names: {list}.',
    'name.confidence.well-attested': 'well attested',
    'name.confidence.probable': 'probable',
    'name.confidence.disputed': 'disputed',
    'name.confidence.uncertain': 'uncertain',
    'name.class.etymological-fact': 'Documented derivation',
    'name.class.traditional-interpretation': 'Traditional reading',
    'name.class.disputed-origin': 'Proposed origin',
    'name.class.folk-etymology': 'Popular story, not supported',
    'name.kind.spelling': 'a spelling variant',
    'name.kind.language-form': 'the form used in another language',
    'name.kind.transliteration': 'a transliteration',
    'name.kind.diminutive': 'a short form',
    'name.relation.shares-root': 'shares a root',
    'name.relation.feminine-form': 'feminine form',
    'name.relation.masculine-form': 'masculine form',
    'name.relation.derived-from': 'derived from',
    'name.relation.cognate': 'cognate',
    'name.day.primary': 'In {region}, the name day for {name} falls on {date}.',
    'name.day.secondary': 'A further date recognised in {region}: {date}.',
    'name.day.elsewhere': 'Elsewhere the date differs — {list}. A name day belongs to a country’s calendar, not to the name itself.',
    'name.day.noneInRegion': 'This name does not appear in the {region} name-day calendar.',
    /* The label over the card at the top of the reading. `Strongest convergence`
       framed the first thing on the screen as a score, which is the reading of
       itself the humanising pass took out of everything below it. */
    'synthesis.strongestConvergence': 'What runs through all of it',
    'synthesis.noConvergence': 'No combined reading for this profile',
    'synthesis.synthesisedFrom': 'Read from {count} of the four traditions',
    'synthesis.synthesisedAll': 'Read from all four traditions',
    'synthesis.statusEstimated': ' - no birth time',
    'synthesis.statusApproximate': ' - birth time approximate',
    'synthesis.limitedNoConvergence': 'Limited: too few traditions could be read',
    'synthesis.count.0': 'no',
    'synthesis.count.1': 'one',
    'synthesis.count.2': 'two',
    'synthesis.count.3': 'three',
    'synthesis.count.4': 'four',
    /* ------------------------------------------------- the reading composers --
       The authored English that lives in the COMPOSERS rather than in the
       knowledge layer: standfirsts, framing sentences, entry titles and the
       structural paragraphs a composer writes about the chart itself. The
       knowledge layer has its own translation overlay and never reaches here, so
       without these keys a Slovak reading arrived with English section openers
       sitting over Slovak prose.
  
       Canonical names are NOT translated - Life Path, Pinnacle, Challenge, Day
       Master, Human Design, the pinyin stems and branches, gate and channel
       numbers, sign and element names as the engines print them - because a
       translated technical name stops the reading being checkable against the
       values printed beside it. Only the sentence around them is Slovak. */
    /** "a, b and c" - the conjunction, so a list is not frozen into English. */
    'reading.list.and': ' and ',
    /* Between two long clauses that may carry their own `and`. */
    'reading.list.andClause': ', and ',
    /* ------------------------------------------------------------ numerology */
    'reading.numerology.intro.1': 'Numerology reduces two things - your birth date and your full birth name - '
        + 'through a fixed arithmetic, and reads the results as a set of positions. '
        + 'Each position asks a different question, which is why the same number '
        + 'appearing twice does not mean the same thing twice.',
    'reading.numerology.intro.2': 'The reading below starts with the numbers that describe you and do not change, '
        + 'reads them against each other, and ends with the chapter of life you are in now. '
        + 'Each number on its own, and how it was reached, is under Go deeper; the '
        + 'day-to-day cycles belong to the Forecast.',
    'reading.numerology.atAGlance.standfirst': 'The four numbers your chart is built from, and the chapter you are in now.',
    'reading.numerology.title.bornOn': 'Born on the {day}',
    'reading.numerology.title.noKarmicLessons': 'No Karmic Lessons',
    'reading.numerology.title.noKarmicDebt': 'No karmic debt identified',
    'reading.numerology.title.chapterPairing': 'How to read a chapter',
    'reading.numerology.title.threeClocks': 'Three clocks at once',
    'reading.numerology.title.readingThree': 'Reading the three together',
    'reading.numerology.title.yearCaveat': 'One caveat about the year',
    'reading.numerology.chapter.first': 'first chapter',
    'reading.numerology.chapter.second': 'second chapter',
    'reading.numerology.chapter.third': 'third chapter',
    'reading.numerology.chapter.fourth': 'fourth chapter',
    'reading.numerology.chapterTitle.withChallenge': '{span} — Pinnacle {pinnacle} and Challenge {challenge}',
    'reading.numerology.chapterTitle.current': '{title} (current)',
    'reading.numerology.pinnacleRepeats': 'Pinnacle {pinnacle} carries into the {chapter} as well, after the {earlier}. The '
        + 'theme is the same and the stretch of life it lands in is not, so what follows is '
        + 'what changes; the fuller description of the number itself is given above.',
    'reading.numerology.challengeRepeats': 'Challenge {challenge} runs through the {chapter} as well, the same pressure '
        + 'already described at the {earlier}. A challenge repeating across chapters is '
        + 'less a coincidence of arithmetic than a theme a whole life keeps returning '
        + 'to, and the reading of it is given at the first occurrence.',
    'reading.numerology.scale.year': 'a {value} year',
    'reading.numerology.scale.month': 'a {value} month',
    'reading.numerology.scale.day': 'a {value} day',
    'reading.numerology.scale.dayNamed': '{value} day',
    'reading.numerology.cycle.allAgree': 'All three scales resolve to the same number: {named}. That is the least '
        + 'common arrangement and the easiest to act on, because there is no question '
        + 'about priority - the climate of the year, the emphasis of the month and the '
        + 'pace of the day are all asking for the same thing, and this is a stretch '
        + 'where effort pointed in that direction meets no internal resistance at all.',
    'reading.numerology.cycle.twoAgree': 'Two of the three scales agree here: {named}. Where the year and a shorter '
        + 'scale carry the same number, the shorter one is not adding new information '
        + 'so much as concentrating what the year was already asking for. Treat that '
        + 'as the part of the calendar where the year\'s theme is most available, and '
        + 'schedule accordingly.',
    'reading.numerology.cycle.shortAgree': 'The month and the day agree here, and the year does not: {named}. The two '
        + 'short scales are concentrating one emphasis for a few days inside a year that '
        + 'is asking for something else, so read it as a short stretch, not a change of '
        + 'climate.',
    'reading.numerology.cycle.differ': 'The three scales point in different directions: {named}. That is the ordinary '
        + 'case rather than a contradiction, and it is more useful than agreement would '
        + 'be, because it tells you what to put where. The year sets what the whole '
        + 'stretch is developing toward; the month says which part of that is available '
        + 'now; the day is about pace and nothing larger.',
    'reading.numerology.cycle.priority': 'Where they conflict, the larger scale takes precedence, always. A year is a '
        + 'developmental climate and a day is a Tuesday, and a decision made because of '
        + 'the day\'s number is a decision made on the lightest information in the whole '
        + 'system. The practical reading is: the {year} year decides what this period is '
        + 'for, the {month} month decides what to work on inside it, and the {day} '
        + 'decides only what to do first this morning.',
    /* ---------------------------------------------------- western astrology */
    /* ONE framing line. The reading is symbolic and says so once, here, rather
       than hedging every paragraph below. */
    'reading.astrology.intro': 'This reading begins with the main pattern of your chart, then explores how '
        + 'its parts support one another and where they pull in different directions.',
    'reading.astrology.atAGlance.standfirst': 'The chart’s key facts. What they mean is below.',
    'reading.astrology.placements.standfirst': 'Each planet in its sign and house, with the aspects that shape it.',
    'reading.astrology.placements.standfirstNoHouses': 'Each planet in its sign, with the aspects that shape it. The houses need a birth time.',
    /* The deep layer of the Astrology reading: how the distribution is made up,
       which is a later question than what the chart is. */
    'reading.astrology.chartStructure.standfirst': 'How the distribution is made up, underneath the summary above.',
    /* Said once, as a list. The four other dignities change how their planet is
       read and stay beside it; peregrine is the default condition, so repeating
       its definition under every planet that has it told the reader the same
       thing five times. */
    'reading.astrology.dignity.peregrineSummary': 'A peregrine planet sits in a sign where it has none of the four conditions this reading '
        + 'weighs: domicile, exaltation, detriment or fall. It is neither at home nor in exile. '
        + 'The tradition reads it as taking its character from whatever else in the chart is '
        + 'strongest, so the same placement can look different in different parts of a life. '
        + 'In this chart that applies to {planets}.',
    'reading.astrology.ascendantLine': 'Your Ascendant is in {sign}, which sets the tone in which the rest of your chart first comes across.',
    'reading.astrology.ascendantTitle': 'Ascendant in {sign}',
    'reading.astrology.placementTitle': '{body} in {sign}',
    'reading.astrology.placementTitleHouse': '{body} in {sign}, house {house}',
    'reading.astrology.keyAspects.standfirst': 'The angles between your planets, strongest first. These describe functions '
        + 'that have to operate through each other rather than separately.',
    /* ------------------------------------ at a glance: the chart ruler's note */
    /* The main reading's own words live in its voice (astrology-narrative/); these
       are the few fixed phrases At a glance still composes. */
    'reading.astrology.angleOn.ascendant': 'on the Ascendant',
    'reading.astrology.angleOn.midheaven': 'on the Midheaven',
    'reading.astrology.angleOn.descendant': 'on the Descendant',
    'reading.astrology.angleOn.imum-coeli': 'on the IC',
    'reading.astrology.houseIn.1': 'in the 1st house',
    'reading.astrology.houseIn.2': 'in the 2nd house',
    'reading.astrology.houseIn.3': 'in the 3rd house',
    'reading.astrology.houseIn.4': 'in the 4th house',
    'reading.astrology.houseIn.5': 'in the 5th house',
    'reading.astrology.houseIn.6': 'in the 6th house',
    'reading.astrology.houseIn.7': 'in the 7th house',
    'reading.astrology.houseIn.8': 'in the 8th house',
    'reading.astrology.houseIn.9': 'in the 9th house',
    'reading.astrology.houseIn.10': 'in the 10th house',
    'reading.astrology.houseIn.11': 'in the 11th house',
    'reading.astrology.houseIn.12': 'in the 12th house',
    /* ---------------------------------------------------------------- BaZi */
    'reading.bazi.intro.1': 'BaZi reads the moment you were born as eight Chinese characters in four pairs - '
        + 'for the year, the month, the day and the hour. One of them stands for you, and '
        + 'the rest are read by what they do to it.',
    'reading.bazi.intro.2': 'The season you were born into weighs more than any single character, which is why '
        + 'the reading starts there. The names, counts and relations behind each part are '
        + 'under Go deeper.',
    'reading.bazi.state.prosperous': 'in the season of its own phase, which is maximum support',
    'reading.bazi.state.aided': 'in a season that generates its phase, so it is being fed from outside',
    'reading.bazi.state.resting': 'in a season its own phase generates, so it is being continuously drawn on',
    'reading.bazi.state.trapped': 'in a season its own phase controls, which is effortful and productive',
    'reading.bazi.state.dead': 'in a season that controls its phase, which is the constrained position',
    'reading.bazi.dayMaster.bornNote': 'Born {state}',
    'reading.bazi.zodiac.standfirst': 'Your year animal and the element it carries, read as one thing: {title}.',
    'reading.bazi.zodiac.markNote': '{polarity} {element} stem over {branchArticle} {branchElement} branch',
    /* The dominant phase, in full, under the balance it explains. */
    'reading.bazi.phaseDepthTitle': '{phase} in depth',
    'reading.bazi.balanceMethodTitle': 'How the balance is counted',
    'reading.bazi.strengthMethodTitle': 'How strength is judged',
    'reading.bazi.atAGlance.standfirst': 'The chart in one place. Each term has an explanation behind its info button.',
    /* Under the counts, when they are not counts of all eight characters. */
    'reading.bazi.glance.knownNote': 'from the six known characters',
    'reading.bazi.glance.estimatedNote': 'includes the hour you estimated',
    /* Under the animal on the BaZi hero when the birth moment does not decide the year (the day the year turns, birth time not known). */
    'bazi.hero.estimate': 'Estimate',
    'reading.bazi.dayMaster.standfirst': 'The stem of your day pillar. Every other character in the chart is read by what '
        + 'it does to this one.',
    'reading.bazi.dayMaster.body': 'This chart\'s Day Master is {dayMaster}. It is not a trait or a ranking but the '
        + 'reference point. When the Ten Gods below call a stem supporting, draining, '
        + 'controlling or competing, they mean in relation to this one.',
    'reading.bazi.dayMaster.portraitFollows': 'What it means for you is the reading above, which starts from it.',
    'reading.bazi.position.year': 'Year',
    'reading.bazi.position.month': 'Month',
    'reading.bazi.position.day': 'Day',
    'reading.bazi.position.hour': 'Hour',
    /* The same four positions in the NOMINATIVE. `reading.bazi.position.*` above
       is shaped for `Pilier roka` and is a genitive in Slovak, which renders
       `roka: Yi` in the hidden-stem list. English is the same word either way;
       Slovak is not, so the list gets its own key rather than a wrong case. */
    'reading.bazi.positionName.year': 'Year',
    'reading.bazi.positionName.month': 'Month',
    'reading.bazi.positionName.day': 'Day',
    'reading.bazi.positionName.hour': 'Hour',
    'reading.bazi.positionName.hourEstimated': 'Hour (estimated)',
    'reading.bazi.pillarTitle': '{position} pillar — {value}',
    'reading.bazi.pillarTitleUnavailable': '{position} pillar — not calculated',
    'reading.bazi.pillarTitleEstimated': '{position} pillar — {value} (from your estimated time)',
    'reading.bazi.pillarEstimatedNote': 'This pillar comes from the birth time you estimated, so read everything in this '
        + 'entry more loosely than the other three pillars.',
    'reading.bazi.pillarRepeatsPair': 'The {position} pillar repeats a stem-and-branch pair from earlier in the chart, '
        + 'so the reading of the pair itself is given there. A repeated pillar is a feature '
        + 'rather than an accident of the calendar: the same configuration appearing twice '
        + 'in an eight-character chart concentrates it, and whatever that pair contributes '
        + 'is doing so in two parts of the life at once.',
    'reading.bazi.branchRepeats': '{branch} occupies the {position} pillar as well as an earlier one, and its '
        + 'full reading is given at the first of them. A repeated branch is not a duplicate '
        + 'entry. The tradition reads it as that quality concentrated, and in a few specific '
        + 'cases as a self-punishment, which is noted separately if it applies here.',
    'reading.bazi.fourPillars.standfirst': 'Four pillars, each a stem standing on a branch. What the branch does to the '
        + 'stem above it matters as much as either one on its own.',
    /* Which hidden stems also stand on the surface is said from the chart itself:
       the old single sentence said none did, which was false for most charts. */
    'reading.bazi.hiddenStems.bodyNone': 'In this chart the branches carry {described}. None of them also stands on the '
        + 'surface of the chart, so they add to the reading only from underneath; the '
        + 'conventional weights the engine used are set out in full in the technical '
        + 'section below.',
    'reading.bazi.hiddenStems.bodyOne': 'In this chart the branches carry {described}. {visible} also stands on the '
        + 'surface of the chart; the rest are present only underneath. The conventional '
        + 'weights the engine used are set out in full in the technical section below.',
    'reading.bazi.hiddenStems.bodyMany': 'In this chart the branches carry {described}. {visible} also stand on the '
        + 'surface of the chart; the rest are present only underneath. The conventional '
        + 'weights the engine used are set out in full in the technical section below.',
    'reading.bazi.hiddenStems.standfirst': 'What the branches are actually made of. Much of a BaZi chart is here rather '
        + 'than on its surface.',
    'reading.bazi.fiveElements.standfirst': 'The five phases, counted four different ways - and the four counts do not agree.',
    'reading.bazi.tenGodTitle': '{god} — {positions} stem',
    'reading.bazi.tenGodTitleEstimated': '{god} — {positions} stem (from your estimated hour)',
    'reading.bazi.tenGodEstimatedNote': 'This entry rests on the hour you estimated: read it more loosely than the entries '
        + 'for the other pillars.',
    'reading.bazi.tenGodPartlyEstimatedNote': 'Its place in the Hour pillar rests on the hour you estimated; its other place does not.',
    'reading.bazi.tenGods.standfirst': 'The Ten Gods describe every other stem by what it does to your Day Master - '
        + 'supports it, drains it, controls it, or competes with it. None of the ten is '
        + 'good or bad on its own.',
    /* The doctrine and a pointer. This chart's season and the model's verdict are
       said in the reading and in "Why this appears"; they are not said again here. */
    'reading.bazi.seasonalStrength.pointer': 'The season is the layer that overrules the tally. In the Ziping tradition the '
        + 'commanding month carries more weight than any count of characters, which is why '
        + 'the reading opens on it. This chart\'s month, the state it puts the Day Master in '
        + 'and the model\'s tendency are set out under Why this appears. How that tendency '
        + 'is reached is explained below.',
    'reading.bazi.seasonalStrength.standfirst': 'Whether the chart as a whole is holding the Day Master up or drawing it down, '
        + 'and what the season it was born into does to that.',
    'reading.bazi.luckPillars.standfirst': 'Luck Pillars describe the conditions a chart passes through in ten-year '
        + 'periods. They say what a period favours, not what will happen in it.',
    'reading.bazi.tcmTitle': 'Traditional Chinese medical correspondence — {value}',
    'reading.bazi.tcmBody': 'The correspondence this chart carries is {value}. That is a symbolic mapping '
        + 'between a phase and a pair of organ systems in traditional theory, and it is '
        + 'included because it is part of how this system has been read for centuries. '
        + 'It says nothing about your body, it is not a diagnosis, and it should not '
        + 'influence any decision you would otherwise take with a clinician.',
    'reading.bazi.tcm.standfirst': 'A symbolic mapping the tradition carries between the five phases and the body. '
        + 'Cultural material, not medical information.',
    /* ------------------------------------------------------- Chinese zodiac */
    'reading.zodiac.element.wood': 'Wood is the growing phase - reaching outward, planning, wanting room. It '
        + 'gives whatever it touches a forward lean and a certain refusal to stay '
        + 'small.',
    'reading.zodiac.element.fire': 'Fire is the visible phase - warmth, expression, being seen. It brings heat '
        + 'and speed, and it needs fuel; it does not sustain itself quietly the way '
        + 'the earthier phases do.',
    'reading.zodiac.element.earth': 'Earth is the settling phase - holding, tending, making things reliable. It '
        + 'slows what it touches down and gives it weight, for better and for worse.',
    'reading.zodiac.element.metal': 'Metal is the refining phase - cutting away, defining edges, insisting on '
        + 'standards. It sharpens whatever it touches and narrows it.',
    'reading.zodiac.element.water': 'Water is the deep phase - flowing, listening, going around rather than '
        + 'through. It softens outlines and moves attention inward.',
    'reading.zodiac.combination.same': '{element} on the {animal} is a doubling rather than a mixture. The {animal} is '
        + 'already {branchElement} by nature, so carrying {element} concentrates what the '
        + 'animal already was instead of adding a second note. The tradition reads this as '
        + 'the sign undiluted, with nothing in the pairing pulling the other way.',
    'reading.zodiac.combination.fed': '{element} on the {animal} is well supplied. The {animal} is {branchElement} by '
        + 'nature, and {branchElement} generates {element}, so the animal\'s own '
        + 'temperament feeds the element it carries. The tradition counts this as an easy '
        + 'pairing. With fuel underneath it, the {element} tends to express steadily rather '
        + 'than flare and go out.',
    'reading.zodiac.combination.spent': '{element} on the {animal} spends itself on the animal. {element} generates '
        + '{branchElement}, and the {animal} is {branchElement}, so the element pours '
        + 'into the sign rather than sitting on top of it. The animal is strengthened and '
        + 'the element is quieter than it would be elsewhere. You meet the {animal} first '
        + 'and the {element} second, as something felt rather than displayed.',
    'reading.zodiac.combination.disciplined': '{element} on the {animal} is a disciplining pairing. {element} controls '
        + '{branchElement}, and the {animal} is {branchElement}, so the element restrains '
        + 'the animal\'s natural motion rather than encouraging it. At its best, that gives '
        + 'a {animal} structure it would not otherwise impose on itself. At its worst, the '
        + 'sign holds itself in check more than it needs to.',
    'reading.zodiac.combination.pressured': '{element} on the {animal} sits under pressure. The {animal} is {branchElement}, '
        + 'and {branchElement} controls {element}, so the animal\'s own nature works '
        + 'against the element it carries. The two halves of this sign pull against each '
        + 'other. The tradition does not read that as a flaw: a sign divided like this '
        + 'knows both sides of the argument.',
    'reading.zodiac.combination.other': '{element} and the {animal} carry different phases, and the pairing is read '
        + 'from how those two phases meet.',
    'reading.zodiac.polarity.yang': 'the outward, initiating face of {element}',
    'reading.zodiac.polarity.yin': 'the inward, receptive face of {element}',
    'reading.zodiac.polarityLine': '{polarity} is the polarity of the year stem: {face}. It shades the element '
        + 'rather than adding a separate trait.',
    'reading.zodiac.oneOfFour': 'This is the year pillar, one of the four. It describes the outer layer of the '
        + 'chart, what shows before anything else does, and it is the part of BaZi the wider '
        + 'culture kept. It is not the centre of the chart. That is the Day Master, where '
        + 'the reading below starts, and the other three pillars qualify everything said here.',
    /* -------------------------------------------------------- Human Design */
    'reading.hd.intro.1': 'Human Design reads two moments: your birth, and a point about eighty-eight '
        + 'degrees of solar arc before it, roughly three months earlier. It maps both onto '
        + 'nine areas, called centres. What comes out is less a portrait of your personality '
        + 'than a picture of how you work: where your energy is consistent, where it is '
        + 'borrowed from whoever is nearby, and how you best make decisions.',
    'reading.hd.intro.2': 'It is a symbolic tradition, not a measured one. It is most useful read as a set '
        + 'of questions about how you actually operate; nothing below is a verdict.',
    'reading.hd.atAGlance.standfirst': 'Your chart\'s key terms in one place. Each has an explanation behind its '
        + 'info button; what they mean for you is in the reading below.',
    'reading.hd.portrait.standfirst': 'Type, Authority, Profile and Definition read as one thing: what kind of energy '
        + 'you run on, how the decision actually gets made inside it, what other people '
        + 'meet, and how the whole graph is wired.',
    'reading.hd.innerWorld.standfirst': 'Your authority is the mechanism that tells you yes or no. It is not the mind, '
        + 'and learning to hear it over the mind is most of the work this system asks for.',
    'reading.hd.relationships.standfirst': 'Your profile is two lines - the one you experience and the one that operates '
        + 'whether or not you notice. It describes how you are met.',
    'reading.hd.work.standfirst': 'Definition describes how your defined centres connect, and where the gaps are '
        + 'that other people happen to close.',
    'reading.hd.centreTitle.defined': '{centre} — defined',
    'reading.hd.centreTitle.open': '{centre} — open',
    'reading.hd.definedCentres.standfirst': 'A defined centre is consistent and yours. These are the parts of you that do '
        + 'not change with the room, and the parts other people come to rely on.',
    'reading.hd.openCentres.standfirst': 'An open centre takes in what is around it and amplifies it. That is where outside '
        + 'influence is strongest, and, over a long time, where the most is learned. Open '
        + 'is not the same as lacking.',
    'reading.hd.channels.standfirst': 'Your channels are the fixed links in your chart: capacities that are reliably yours '
        + 'rather than borrowed from whoever is nearby. Each one joins two centres and '
        + 'is what makes them defined.',
    'reading.hd.gates.standfirst': 'The gates that carry the most structural weight in your chart: the four that '
        + 'form your Incarnation Cross, and the ones that complete a defined channel. '
        + 'Every activated gate is listed in full further down.',
    'reading.hd.growth.standfirst': 'The widest frame the chart draws, and the parts of the system that are least '
        + 'about day-to-day operation.',
    /*
     * GO DEEPER, under the narrative layer.
     *
     * Each of these introduces the authored detail behind a mechanic the main
     * reading has already explained in ordinary words - so they may use the
     * system's own vocabulary, which the main reading may not.
     */
    'reading.hd.typeDetail.standfirst': 'The full entry for this Type and its Strategy, in Human Design\'s own terms.',
    'reading.hd.authorityDetail.standfirst': 'The full entry for this Authority - how the tradition describes the mechanism, and how it is commonly mis-run.',
    'reading.hd.profileDetail.standfirst': 'Both lines of the profile in full, and what the tradition says about the pair.',
    'reading.hd.definitionDetail.standfirst': 'What this Definition means for how the parts of the graph connect.',
    'reading.hd.cross.standfirst': 'The widest frame the chart draws, and the part of the system least about day-to-day operation.',
    'reading.hd.variables.standfirst': 'A late, specialised layer of Human Design, offered in its own framing rather than as a claim about how the mind works.',
    /* ------------------------------------ Human Design: strategy and authority */
    'reading.hdPractice.standfirst': 'What your type and authority actually ask you to do when a decision '
        + 'is in front of you.',
    'reading.hdPractice.authorityTitle': 'Deciding with {authority} authority',
    'reading.hdPractice.opening': 'Your authority puts the deciding signal in {signal}. In practice it runs '
        + 'in a fixed order, and the order matters:',
    'reading.hdPractice.strategyTitle': 'Your strategy: {strategy}',
    'reading.hdPractice.strategyTitlePlain': 'Your strategy',
    'reading.hdPractice.strategyBody': 'Strategy is not a second decision. It follows from your type, and it '
        + 'describes how you engage before a decision is yours to make. '
        + 'Yours is: {strategy}.',
    'reading.hdPractice.boundaryTitle': 'What this is and is not',
    'reading.hdPractice.boundary.1': 'Several of these steps describe ordinary, observable things. People register a '
        + 'physical reaction before they can explain it, and the explanation often arrives '
        + 'afterwards and feels like the cause. Those are real, and the info buttons here '
        + 'link to plain descriptions of them.',
    'reading.hdPractice.boundary.2': 'That does not make Human Design true. The practice above is a symbolic tradition’s '
        + 'instruction. Following it means paying attention to something real, but that is '
        + 'not evidence for the tradition that recommends it. Both can be the case at once, '
        + 'and this reading keeps them apart on purpose.',
    'reading.hdPractice.sacral.signal': 'an immediate gut response, available the moment the thing is put to you',
    'reading.hdPractice.sacral.step1': 'A real option appears: an invitation, a request, a piece of work. It has to be '
        + 'real and in front of you; the Sacral does not answer hypotheticals you invent '
        + 'yourself.',
    'reading.hdPractice.sacral.step2': 'Notice what happens in the body in the first moment, before you have said '
        + 'anything. The tradition describes a lift toward the thing or a flatness away '
        + 'from it, lower in the torso than a thought and faster than one.',
    'reading.hdPractice.sacral.step3': 'Separate that from the explanation that arrives a second later. The explanation '
        + 'is not the response but commentary on it, and it will argue for whichever answer '
        + 'is more convenient. If you cannot yet tell which came first, that is the skill '
        + 'to build, and it can be built.',
    'reading.hdPractice.sacral.step4': 'Then use reasoning for logistics and consequences: what it would cost, who it '
        + 'affects, when it could happen. In Human Design, reasoning does the arranging, '
        + 'not the deciding.',
    'reading.hdPractice.emotional.signal': 'clarity that arrives over time, never in the moment',
    'reading.hdPractice.emotional.step1': 'A real option appears. Whatever you feel about it right now is one point in a '
        + 'moving feeling, not a verdict. Human Design is explicit that the first reading '
        + 'is the least reliable one.',
    'reading.hdPractice.emotional.step2': 'Notice the state without acting on it. Enthusiasm and reluctance both pass; what '
        + 'you are waiting for is the same option feeling roughly the same across '
        + 'different moods.',
    'reading.hdPractice.emotional.step3': 'Let time pass: hours for a small thing, longer for a large one. This is the '
        + 'whole practice, and it is the part that is genuinely inconvenient.',
    'reading.hdPractice.emotional.step4': 'Separate the settled reading from the story you have been telling yourself while '
        + 'waiting. Then use reasoning for logistics and consequences, once the direction '
        + 'has stopped moving.',
    'reading.hdPractice.splenic.signal': 'a single quiet signal in the moment, which does not repeat',
    'reading.hdPractice.splenic.step1': 'A real situation appears. The splenic signal is described as arriving once, '
        + 'quietly, and not making its case twice.',
    'reading.hdPractice.splenic.step2': 'Notice the first impression. It is often a bodily unease or ease rather than a '
        + 'thought, and easy to talk over because it is so quiet.',
    'reading.hdPractice.splenic.step3': 'Separate it from the reasoning that follows. The risk is not that reasoning '
        + 'overrides a loud signal, but that it fills the silence after a soft one.',
    'reading.hdPractice.splenic.step4': 'Then use reasoning for logistics and consequences. If the signal has passed and '
        + 'you are still arguing with yourself, Human Design says you are past the decision '
        + 'and into justification.',
    'reading.hdPractice.egoManifested.signal': 'whether you actually have the will for it',
    'reading.hdPractice.egoManifested.step1': 'A real option appears. The question is not whether it is a good idea but whether '
        + 'you genuinely want it enough to carry it.',
    'reading.hdPractice.egoManifested.step2': 'Notice what you find when you ask that plainly. Human Design treats an honest "no, '
        + 'I do not have the appetite for this" as the answer, not as a failing.',
    'reading.hdPractice.egoManifested.step3': 'Separate that from what you think you should want. This authority is described as '
        + 'the one most often talked out of itself by obligation.',
    'reading.hdPractice.egoManifested.step4': 'Then use reasoning for logistics and consequences.',
    'reading.hdPractice.egoProjected.signal': 'what you hear yourself say about your own willingness',
    'reading.hdPractice.egoProjected.step1': 'A real option appears, and you talk about it out loud with someone you trust.',
    'reading.hdPractice.egoProjected.step2': 'Listen to your own answer rather than planning it. The signal is in what comes '
        + 'out, not in what you had intended to say.',
    'reading.hdPractice.egoProjected.step3': 'Separate that from the case you build afterwards for whichever answer is tidier.',
    'reading.hdPractice.egoProjected.step4': 'Then use reasoning for logistics and consequences.',
    'reading.hdPractice.selfProjected.signal': 'what you hear in your own voice when you speak it',
    'reading.hdPractice.selfProjected.step1': 'A real option appears. This authority is described as needing to be spoken, not '
        + 'thought through silently.',
    'reading.hdPractice.selfProjected.step2': 'Talk it out with someone who will not steer you. You are listening for the sound '
        + 'of your own direction, not for their opinion.',
    'reading.hdPractice.selfProjected.step3': 'Separate what your voice did from what your argument said. They often '
        + 'disagree, and Human Design treats the voice as the signal.',
    'reading.hdPractice.selfProjected.step4': 'Then use reasoning for logistics and consequences.',
    'reading.hdPractice.mental.signal': 'how the environment feels while you think it through',
    'reading.hdPractice.mental.step1': 'A real option appears. This authority has no bodily verdict to consult, and '
        + 'Human Design says so plainly rather than apologetically.',
    'reading.hdPractice.mental.step2': 'Talk it through with several sounding boards, noticing where you are when you do. '
        + 'The room and the company are treated as carrying more of the signal than the '
        + 'argument does.',
    'reading.hdPractice.mental.step3': 'Separate the clarity that came from being in the right place from the cleverness '
        + 'of any particular reasoning.',
    'reading.hdPractice.mental.step4': 'Then use reasoning for logistics and consequences.',
    'reading.hdPractice.lunar.signal': 'a pattern that only shows itself across about a month',
    'reading.hdPractice.lunar.step1': 'A real option appears. Nothing about it is decided today.',
    'reading.hdPractice.lunar.step2': 'Notice how it reads in different environments and different company over roughly '
        + 'a lunar cycle. Reflectors are described as sampling their surroundings, so the '
        + 'same option genuinely reads differently depending on where you are standing.',
    'reading.hdPractice.lunar.step3': 'Separate the pattern across the month from any single strong day inside it.',
    'reading.hdPractice.lunar.step4': 'Then use reasoning for logistics and consequences.',
    'reading.hdPractice.inform.manifestingGenerator': 'One extra step for a Manifesting Generator: INFORM the people your decision '
        + 'affects, before you act rather than after. Manifesting Generators move quickly '
        + 'and often skip a step that was obvious to them and invisible to everyone else, '
        + 'and the system treats most of the resistance they meet as the predictable result '
        + 'of that rather than as a verdict on the decision. Informing is not permission-'
        + 'seeking; it is telling people what is about to happen.',
    'reading.hdPractice.inform.manifestor': 'One extra step for a Manifestor: INFORM the people your decision affects, before '
        + 'you act. In this system informing is what turns resistance into cooperation - '
        + 'not because it asks for approval, but because it removes the surprise.',
    /* ------------------------------------------- the cross-pillar composers --
       The structural sentences the synthesis composers write about the chart
       itself. Every one is a WHOLE sentence with named parameters, never a
       fragment to be glued onto a value: Slovak puts the noun after a numeral
       into a different case for one, for two-to-four and for five-and-up, and
       orders the clause differently again, so a concatenated sentence can only
       ever be right in English.
  
       Where a count decides the wording, the key carries the band in its name -
       `.one`, `.few`, `.many` - and English simply repeats itself across the
       bands it does not distinguish. Where the count is small and bounded, the
       number is baked into the key instead, which reads better in both.
  
       The hedges are the point of this layer and are carried across in full:
       "systems agree", "not a measurement", "contested", "symbolic", "only one
       system says this". None of them may become a plain assertion in Slovak. */
    /* Count words. Two genders, because Slovak says "dva systémy" and "dve témy"
       for the same English "two"; the caller knows which noun follows. */
    'synthesis.compose.count.m.0': 'no',
    'synthesis.compose.count.m.1': 'one',
    'synthesis.compose.count.m.2': 'two',
    'synthesis.compose.count.m.3': 'three',
    'synthesis.compose.count.m.4': 'four',
    'synthesis.compose.count.m.5': 'five',
    'synthesis.compose.count.m.6': 'six',
    'synthesis.compose.count.m.7': 'seven',
    'synthesis.compose.count.m.8': 'eight',
    'synthesis.compose.count.f.0': 'no',
    'synthesis.compose.count.f.1': 'one',
    'synthesis.compose.count.f.2': 'two',
    'synthesis.compose.count.f.3': 'three',
    'synthesis.compose.count.f.4': 'four',
    'synthesis.compose.count.f.5': 'five',
    'synthesis.compose.count.f.6': 'six',
    'synthesis.compose.count.f.7': 'seven',
    'synthesis.compose.count.f.8': 'eight',
    /* The four systems, as they are named inside a sentence. */
    'synthesis.compose.pillar.numerology': 'Numerology',
    'synthesis.compose.pillar.astrology': 'Western Astrology',
    'synthesis.compose.pillar.bazi': 'BaZi',
    'synthesis.compose.pillar.human-design': 'Human Design',
    /* Support, as a badge (noun included) and as a bare adjective. */
    'synthesis.compose.support.strong': 'strong support',
    'synthesis.compose.support.moderate': 'moderate support',
    'synthesis.compose.support.weak': 'weak support',
    'synthesis.compose.support.single-system': 'one system only',
    'synthesis.compose.support.insufficient': 'below the reporting threshold',
    'synthesis.compose.level.strong': 'strong',
    'synthesis.compose.level.moderate': 'moderate',
    'synthesis.compose.level.weak': 'weak',
    'synthesis.compose.level.single-system': 'from one system only',
    'synthesis.compose.level.insufficient': 'insufficient',
    /* The poles of an axis, as nouns. Chosen in Slovak so the accusative and the
       nominative are the same word, which lets one entry serve both "points
       toward X" and "X against Y". */
    'synthesis.compose.pole.introspective': 'introspective',
    'synthesis.compose.pole.outwardly-engaged': 'outwardly engaged',
    'synthesis.compose.pole.analytical': 'analytical',
    'synthesis.compose.pole.intuitive': 'intuitive',
    'synthesis.compose.pole.independent': 'independent',
    'synthesis.compose.pole.collaborative': 'collaborative',
    'synthesis.compose.pole.structured': 'structured',
    'synthesis.compose.pole.adaptable': 'adaptable',
    'synthesis.compose.pole.cautious': 'cautious',
    'synthesis.compose.pole.risk-oriented': 'risk-oriented',
    'synthesis.compose.pole.emotionally-expressive': 'emotionally expressive',
    'synthesis.compose.pole.emotionally-contained': 'emotionally contained',
    'synthesis.compose.pole.private': 'private',
    'synthesis.compose.pole.social': 'social',
    'synthesis.compose.pole.stability-seeking': 'stability-seeking',
    'synthesis.compose.pole.novelty-seeking': 'novelty-seeking',
    'synthesis.compose.pole.assertive': 'assertive',
    'synthesis.compose.pole.receptive': 'receptive',
    'synthesis.compose.pole.practical': 'practical',
    'synthesis.compose.pole.conceptual': 'conceptual',
    /* The drives. Unipolar, so these are names rather than poles - but the
       evidence chain labels every row by its dimension and a row with no label
       resolves to undefined. */
    'synthesis.compose.pole.mastery': 'mastery',
    'synthesis.compose.pole.achievement': 'achievement',
    'synthesis.compose.pole.recognition': 'recognition',
    'synthesis.compose.pole.meaning': 'meaning',
    'synthesis.compose.pole.belonging': 'belonging',
    'synthesis.compose.pole.freedom': 'freedom',
    'synthesis.compose.pole.care': 'care',
    'synthesis.compose.pole.understanding': 'understanding',
    'synthesis.compose.pole.self-expression': 'self-expression',
    'synthesis.compose.pole.beauty': 'form',
    'synthesis.compose.pole.creative': 'creative',
    'synthesis.compose.pole.persistent': 'persistent',
    'synthesis.compose.pole.emotionally-sensitive': 'emotionally sensitive',
    'synthesis.compose.pole.communicative': 'communicative',
    'synthesis.compose.poleSide': 'the {pole} side',
    /* The areas of life the themes are filed into. */
    'synthesis.compose.domain.core-identity': 'Core identity',
    'synthesis.compose.domain.inner-world': 'Inner world',
    'synthesis.compose.domain.decision-making': 'Decision-making',
    'synthesis.compose.domain.relationships': 'Relationships',
    'synthesis.compose.domain.communication': 'Communication',
    'synthesis.compose.domain.work-career': 'Work and career',
    'synthesis.compose.domain.money-material': 'Money and material approach',
    'synthesis.compose.domain.creativity': 'Creativity',
    'synthesis.compose.domain.stress-shadow': 'Stress and shadow patterns',
    'synthesis.compose.domain.growth': 'Growth',
    'synthesis.compose.domain.energy-pace': 'Energy and pace',
    'synthesis.compose.domain.social-style': 'Social style',
    /* ------------------------------------------------------------ orientation */
    'synthesis.compose.orientation.draws.1': 'This reading draws on one of the four systems - {pillars} - and weighs {evidence} '
        + 'drawn from them.',
    'synthesis.compose.orientation.draws.2': 'This reading draws on two of the four systems - {pillars} - and weighs {evidence} '
        + 'drawn from them.',
    'synthesis.compose.orientation.draws.3': 'This reading draws on three of the four systems - {pillars} - and weighs {evidence} '
        + 'drawn from them.',
    'synthesis.compose.orientation.draws.4': 'This reading draws on four of the four systems - {pillars} - and weighs {evidence} '
        + 'drawn from them.',
    'synthesis.compose.orientation.draws.n': 'This reading draws on {count} of the four systems - {pillars} - and weighs {evidence} '
        + 'drawn from them.',
    'synthesis.compose.evidencePieces.zero': '{count} separate pieces of evidence',
    'synthesis.compose.evidencePieces.one': '{count} separate pieces of evidence',
    'synthesis.compose.evidencePieces.few': '{count} separate pieces of evidence',
    'synthesis.compose.evidencePieces.many': '{count} separate pieces of evidence',
    'synthesis.compose.orientation.themesReach.zero': '{count} themes reach the reporting threshold',
    'synthesis.compose.orientation.themesReach.one': '{count} theme reaches the reporting threshold',
    'synthesis.compose.orientation.themesReach.few': '{count} themes reach the reporting threshold',
    'synthesis.compose.orientation.themesReach.many': '{count} themes reach the reporting threshold',
    'synthesis.compose.orientation.axesContested.zero': '{count} axes are contested between them at a level worth reporting',
    'synthesis.compose.orientation.axesContested.one': '{count} axis is contested between them at a level worth reporting',
    'synthesis.compose.orientation.axesContested.few': '{count} axes are contested between them at a level worth reporting',
    'synthesis.compose.orientation.axesContested.many': '{count} axes are contested between them at a level worth reporting',
    'synthesis.compose.orientation.threshold': '{themes}, and {axes}.',
    /* Printed in the portrait, not here: it is a fact about THIS profile's
       inputs, and the reader has to meet it before the sections it explains. */
    'synthesis.compose.orientation.onlyOne': 'With one tradition calculated there is nothing to read it against, so no combined '
        + 'themes are reported below. The {pillars} reading itself is complete and '
        + 'unaffected, and it is where the material for this profile is.',
    'synthesis.compose.orientation.missing.1': '{pillars} could not be calculated for this profile, so every count below is out of '
        + 'one rather than out of four.',
    'synthesis.compose.orientation.missing.2': '{pillars} could not be calculated for this profile, so every count below is out of '
        + 'two rather than out of four.',
    'synthesis.compose.orientation.missing.3': '{pillars} could not be calculated for this profile, so every count below is out of '
        + 'three rather than out of four.',
    'synthesis.compose.orientation.missing.4': '{pillars} could not be calculated for this profile, so every count below is out of '
        + 'four rather than out of four.',
    'synthesis.compose.orientation.missing.n': '{pillars} could not be calculated for this profile, so every count below is out of '
        + '{count} rather than out of four.',
    'synthesis.compose.orientation.timeSensitive.zero': '{count} of the {total} pieces of evidence below came through a system that needed '
        + 'the birth time, and each of those was weighted down before it counted toward '
        + 'anything.',
    'synthesis.compose.orientation.timeSensitive.one': '{count} of the {total} pieces of evidence below came through a system that needed '
        + 'the birth time, and each of those was weighted down before it counted toward '
        + 'anything.',
    'synthesis.compose.orientation.timeSensitive.few': '{count} of the {total} pieces of evidence below came through a system that needed '
        + 'the birth time, and each of those was weighted down before it counted toward '
        + 'anything.',
    'synthesis.compose.orientation.timeSensitive.many': '{count} of the {total} pieces of evidence below came through a system that needed '
        + 'the birth time, and each of those was weighted down before it counted toward '
        + 'anything.',
    /* A sub-line for the disclosure this section now renders inside: its title
       alone does not say what opening it would get the reader. */
    'synthesis.compose.orientation.standfirst': 'The four traditions, how the evidence is weighed and discounted, and how a '
        + 'disagreement is classified.',
    /* ------------------------------------------------------------ convergence */
    /* The section is the operating half of the reading now, and it never earned
       the word `independently` - see the note in crossPillarCommentary. */
    'synthesis.compose.convergence.standfirst': 'How the traditions describe your way of working, most prominent first.',
    'synthesis.compose.convergence.standfirstWeak': 'Nothing reached strong or moderate support. What follows is weaker and is labelled '
        + 'as such.',
    'synthesis.compose.convergence.pointAll.2': 'All two available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.pointAll.3': 'All three available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.pointAll.4': 'All four available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.pointAll.n': 'All {count} available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.pointSome.2of3': 'Two of the three available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.pointSome.2of4': 'Two of the four available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.pointSome.3of4': 'Three of the four available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.pointSome.n': '{count} of the {total} available systems point to {theme} - {pillars}.',
    'synthesis.compose.convergence.supportCountered': 'Support is {support}, and part of the chart argues the other way.',
    'synthesis.compose.convergence.supportClean': 'Support is {support}, with nothing in the chart arguing the other way.',
    'synthesis.compose.convergence.caution': '{theme} is worth holding more loosely than the rest: either the chart argues '
        + 'against it nearly as much as for it, or part of it rests on readings its own '
        + 'tradition disputes. The figures are in Technical details.',
    'synthesis.compose.convergence.entryStandfirst': '{count} systems · {support}',
    /* Appended to the badge above where part of the chart argues the other way.
       It replaces the full sentence that used to say so underneath it. */
    'synthesis.compose.convergence.badgeCountered': ' · contested',
    /* The flag on every theme that carries it. The reason is spelled out in full
       on the first one, and repeating fifty-five identical words after that was
       boilerplate rather than a second warning. */
    'synthesis.compose.convergence.badgeCaution': ' · hold lightly',
    /* --------------------------------------------------------------- tensions */
    'synthesis.compose.tensions.standfirst': 'Axes where the systems describe opposite things from the same birth data.',
    'synthesis.compose.tensions.line.11': 'One system points toward {heavierSide}, while one points toward {lighterSide}. {note}',
    'synthesis.compose.tensions.line.n1': '{heavier} systems point toward {heavierSide}, while one points toward {lighterSide}. '
        + '{note}',
    'synthesis.compose.tensions.line.1n': 'One system points toward {heavierSide}, while {lighter} point toward {lighterSide}. '
        + '{note}',
    'synthesis.compose.tensions.line.nn': '{heavier} systems point toward {heavierSide}, while {lighter} point toward '
        + '{lighterSide}. {note}',
    'synthesis.compose.tensions.line.eq': 'The systems split evenly: {heavier} point toward {heavierSide}, while {lighter} '
        + 'point toward {lighterSide}. {note}',
    'synthesis.compose.tensions.noteTrue': 'The two sides carry comparable weight, and this is a pair where holding both at '
        + 'once is genuinely awkward - which is what makes it a real tension rather than '
        + 'ordinary complexity.',
    'synthesis.compose.tensions.noteContextual.leads': '{side} clearly leads by weight, so it reads as something that varies with the '
        + 'situation rather than as a contradiction.',
    'synthesis.compose.tensions.noteContextual.single': 'The two sides are close in weight, but the lighter one rests on a single system - '
        + 'one tradition disagreeing with the rest - so it reads as something that varies '
        + 'with the situation rather than as a contradiction.',
    'synthesis.compose.tensions.noteContextual.ordinary': 'The two sides carry comparable weight, but this is a pair most people hold at once '
        + 'without strain - so it reads as something that varies with the situation rather '
        + 'than as a contradiction.',
    /*
     * THE BADGE CARRIES THE JUDGEMENT NOW.
     *
     * Each of these used to be the first half of a pair: a short badge, then a
     * paragraph underneath restating it at length. The paragraph is gone and its
     * distinguishing clause moved up here, so the entry states the classification
     * once, in the line built for classifications.
     */
    /* `True tension` and `contextual duality` are the model's own names for the
       shape of a split. They belong with the rest of its vocabulary, in the
       support table; what a reader needs on the entry is what the split is like
       to carry. */
    'synthesis.compose.tensions.entryTrue': 'Both sides are well supported, and awkward to hold at once',
    'synthesis.compose.tensions.entryContextual.leads': 'Both are here, and {side} usually leads, so it shifts with the situation',
    'synthesis.compose.tensions.entryContextual.single': 'Both are here, but the lighter side rests on one tradition only',
    'synthesis.compose.tensions.entryContextual.ordinary': 'Both are here, and carrying both is ordinary rather than a conflict',
    'synthesis.compose.tensions.moved.one': '{list} also reached the reporting threshold and is deliberately not listed as '
        + 'agreement above: in this chart the evidence against it outweighs the evidence for '
        + 'it. Reporting it as a convergence would say that the systems agree on both halves '
        + 'of the same axis at once, which is what a contested axis looks like from the wrong '
        + 'angle. It is accounted for here instead.',
    'synthesis.compose.tensions.moved.many': '{list} also reached the reporting threshold and are deliberately not listed as '
        + 'agreement above: in this chart the evidence against them outweighs the evidence '
        + 'for them. Reporting them as a convergence would say that the systems agree on both '
        + 'halves of the same axis at once, which is what a contested axis looks like from the '
        + 'wrong angle. They are accounted for here instead.',
    /* ---------------------------------------------------------- single system */
    'synthesis.compose.single.standfirst': 'Observations only one tradition made. Shown, and held loosely.',
    'synthesis.compose.single.entryStandfirst': '{pillars} only',
    'synthesis.compose.single.line': '{pillars} alone points to {theme}. The other systems are silent on it rather than '
        + 'disagreeing, which is a different thing and usually means they have no vocabulary '
        + 'for it. One tradition on its own is never a cross-system pattern, however firmly '
        + 'it puts the case.',
    /* ---------------------------------------------------------------- domains */
    'synthesis.compose.domains.standfirst': 'Where the themes above land. Nothing new is claimed here - this is the same '
        + 'material filed by area of life.',
    'synthesis.compose.domains.agreed.zero': '{count} themes bear on {domain}: {list}.',
    'synthesis.compose.domains.agreed.one': '{count} theme bears on {domain}: {list}.',
    'synthesis.compose.domains.agreed.few': '{count} themes bear on {domain}: {list}.',
    'synthesis.compose.domains.agreed.many': '{count} themes bear on {domain}: {list}.',
    /* Past four labels a list stops being read, so it is cut and the remainder
       counted. The sentence still opens with the true total. */
    'synthesis.compose.domains.moreThemes': '{count} others',
    'synthesis.compose.domains.moreThemes.one': '{count} other',
    'synthesis.compose.domains.noneAgreed': 'No theme bears on {domain} clearly enough to report, so what the systems have to '
        + 'say about it is contested rather than settled.',
    'synthesis.compose.domains.contested.one': '{list} also touches it, on the contested side rather than the agreed one.',
    'synthesis.compose.domains.contested.many': '{list} also touch it, on the contested side rather than the agreed one.',
    'synthesis.compose.domains.axes.one': 'The contested axis relevant here is {list}.',
    'synthesis.compose.domains.axes.many': 'The contested axes relevant here are {list}.',
    'synthesis.compose.domains.noAxes': 'No contested axis bears on {domain}, so the reading here is more consistent than '
        + 'most.',
    /* ----------------------------------------------------------------- limits */
    'synthesis.compose.limits.notMeasurement': 'Take this as a symbolic way of understanding yourself, not as a measurement of you. '
        + 'The traditions behind it all start from the same birth data and share some ideas about '
        + 'character, so where they agree it shows they see you in a similar way, not that the point '
        + 'has been tested.',
    'synthesis.compose.limits.weighed': 'The model weighed {evidence}{suppressed}{time}.',
    'synthesis.compose.piecesOfEvidence.zero': '{count} pieces of evidence',
    'synthesis.compose.piecesOfEvidence.one': '{count} pieces of evidence',
    'synthesis.compose.piecesOfEvidence.few': '{count} pieces of evidence',
    'synthesis.compose.piecesOfEvidence.many': '{count} pieces of evidence',
    'synthesis.compose.limits.suppressed.zero': ', of which {count} were suppressed entirely because the data they needed was '
        + 'unavailable',
    'synthesis.compose.limits.suppressed.one': ', of which {count} were suppressed entirely because the data they needed was '
        + 'unavailable',
    'synthesis.compose.limits.suppressed.few': ', of which {count} were suppressed entirely because the data they needed was '
        + 'unavailable',
    'synthesis.compose.limits.suppressed.many': ', of which {count} were suppressed entirely because the data they needed was '
        + 'unavailable',
    'synthesis.compose.limits.timeWeighted.zero': ', and {count} were weighted down as time-sensitive',
    'synthesis.compose.limits.timeWeighted.one': ', and {count} were weighted down as time-sensitive',
    'synthesis.compose.limits.timeWeighted.few': ', and {count} were weighted down as time-sensitive',
    'synthesis.compose.limits.timeWeighted.many': ', and {count} were weighted down as time-sensitive',
    'synthesis.compose.limits.subThreshold.zero': '{count} further themes fell below the reporting threshold and are in the ranked '
        + 'table at the end rather than in the reading above.',
    'synthesis.compose.limits.subThreshold.one': '{count} further theme fell below the reporting threshold and is in the ranked '
        + 'table at the end rather than in the reading above.',
    'synthesis.compose.limits.subThreshold.few': '{count} further themes fell below the reporting threshold and are in the ranked '
        + 'table at the end rather than in the reading above.',
    'synthesis.compose.limits.subThreshold.many': '{count} further themes fell below the reporting threshold and are in the ranked '
        + 'table at the end rather than in the reading above.',
    'synthesis.compose.limits.evidenceChain': 'Every piece of evidence behind every theme that IS shown, including which items '
        + 'were discounted for depending on each other, is available in the evidence chain '
        + 'attached to this reading.',
    /* WHAT THIS USED TO SAY, AND WHY IT IS WRONG NOW.
       `It reports only what survives being checked against three other traditions`
       described a synthesis that reported convergence and nothing else. This one
       also reports drives, two-tradition themes, and themes a single tradition
       carries heavily - so the old sentence understated the reading and
       misdescribed the model in the same breath. */
    /* NOT AN INTERSECTION, AND IT NO LONGER SAYS IT IS.
       `The part that still stood up when the four were laid over each other`
       described a reading built only from agreement. This one also carries
       drives, two-tradition themes, what one tradition says with unusual force,
       and the disagreements themselves. */
    'synthesis.compose.limits.pillarsSayMore': 'This summary keeps to what is strong, repeated or unusually telling across the readings, '
        + 'and it leaves their disagreements visible rather than smoothing them over. Each tradition '
        + 'on its own says a great deal more than fits here.',
    /* --------------------------------------------------------------- portrait */
    'synthesis.compose.portrait.standfirst': 'What the complete picture says, before any of the workings.',
    'synthesis.compose.portrait.lead1': 'The strongest thing the four readings have in common is {theme}, carried by '
        + '{pillars}.',
    'synthesis.compose.portrait.lead2': 'Running alongside that is {theme}, which {pillars} also arrive at.',
    'synthesis.compose.portrait.lead3': 'A third strand, {theme}, appears in {pillars}.',
    'synthesis.compose.portrait.central': 'Set against all of that is the one place the traditions do not line up: {axis}. '
        + '{note}',
    'synthesis.compose.portrait.centralTrue': 'Both sides are argued by more than one system and neither gives way, which is the '
        + 'closest this reading comes to naming a real internal conflict.',
    'synthesis.compose.portrait.central.leads': '{side} leads, so this is less a conflict than a thing that changes with the '
        + 'situation - but it is worth knowing which way it usually goes.',
    'synthesis.compose.portrait.central.single': 'The two sides are close, but only one system argues the lighter one, so this is '
        + 'less a conflict than one tradition dissenting - worth knowing, and worth holding '
        + 'loosely.',
    'synthesis.compose.portrait.central.ordinary': 'Both sides are argued and neither gives way, but this is a pair people commonly '
        + 'carry at once - so it is less a conflict than a thing that changes with the '
        + 'situation.',
    /* -------------------------------------------------------------- takeaways */
    'synthesis.compose.takeaways.standfirst': 'The whole reading, compressed. Nothing here is new - it is what is left when the '
        + 'rest is taken away.',
    'synthesis.compose.takeaways.entryStandfirst.zero': '{count} traditions · {support} support',
    'synthesis.compose.takeaways.entryStandfirst.one': '{count} tradition · {support} support',
    'synthesis.compose.takeaways.entryStandfirst.few': '{count} traditions · {support} support',
    'synthesis.compose.takeaways.entryStandfirst.many': '{count} traditions · {support} support',
    'synthesis.compose.takeaways.line': '{pillars} describe something close to {theme}. {note}',
    'synthesis.compose.takeaways.caution': 'Hold this one more loosely than the others.',
    /* After the first. The mark, not the sentence. */
    'synthesis.compose.takeaways.cautionMark': 'This one is worth holding loosely too.',
    'synthesis.compose.takeaways.clean': 'Nothing in the chart argues strongly the other way.',
    /* -------------------------------------------------------------- practical */
    'synthesis.compose.practical.standfirst': 'The same reading, sorted by where it actually shows up. A domain with nothing to '
        + 'say is left out rather than filled.',
    'synthesis.compose.practical.line': 'Here the reading rests on {list}. {note}',
    /* What these used to add - "so expect this area to feel less settled than the
       others" - is a prediction about how an area will FEEL, which nothing in the
       model computes. Where the split lands is what it actually has. */
    'synthesis.compose.practical.tension': 'It is also the area where {tension} shows up.',
    /* The same note, opening the entry instead of trailing a list of theme
       labels the reader has already been given twice. */
    'synthesis.compose.practical.tensionOpen': 'This is the area where {tension} shows up.',
    /* --------------------------------------------- drives and support table */
    'synthesis.compose.drives.standfirst': 'What the symbols point at wanting. Only the ones with more than a passing signal '
        + 'behind them are here.',
    'synthesis.compose.supportTable.standfirst': 'Every theme the model produced, in the order it ranked them, and where each '
        + 'tradition stood on it.',
    'synthesis.compose.supportTable.row': '{theme} — {facet}, {kind}. Salience {salience}; {support}. {stances}.',
    'synthesis.compose.facet.style': 'operating style',
    'synthesis.compose.facet.drive': 'drive',
    'synthesis.compose.themeKind.convergent': 'three or more traditions',
    'synthesis.compose.themeKind.reinforced': 'two traditions',
    'synthesis.compose.themeKind.pillar-signature': 'one tradition, carrying it heavily',
    /* The four states a tradition can be in about a theme. `silent` is the one the
       model had no way to say before, and the reason it needs one: a system with
       no symbol bearing on a theme is not a system arguing against it. */
    'synthesis.compose.stance.supports': 'supports',
    'synthesis.compose.stance.opposes': 'argues the other way',
    'synthesis.compose.stance.both': 'says both',
    'synthesis.compose.stance.silent': 'says nothing about it',
    'synthesis.compose.stance.unavailable': 'could not be read',
    /* ------------------------------------------------- the reading, spoken --
     * Frames for the only layer that addresses the reader. Every slot is filled
     * with another authored part - a need, a habit, a condition - so a filled
     * frame is still authored text and never a generated claim.
     *
     * The frame's SHAPE is chosen by the family of the first item in the list, so
     * a reading led by a freedom theme and one led by a making theme open in
     * different shapes, for a reason that is visible in what they say.
     *
     * HOW SURE IT SOUNDS IS THE EVIDENCE'S, NOT THE FAMILY'S. These frames used
     * to hedge by family: every depth-led list said `What you seem to need`,
     * however strong its evidence, and every other list said `You need`, however
     * thin. Now the plain frame is for a list led by a pattern three or more
     * traditions carry with real weight, and `.soft` is the same frame one step
     * less certain - two traditions, or evidence leaning on time-sensitive
     * results. A pattern resting on one tradition never joins a list at all; it
     * is said on its own, in `tentative`.
     */
    'synthesis.compose.human.need.freedom': 'You need {list}.',
    'synthesis.compose.human.need.depth': 'Most of all, you need {list}.',
    'synthesis.compose.human.need.making': 'You want {list}.',
    'synthesis.compose.human.need.people': 'You look for {list}.',
    'synthesis.compose.human.need.method': 'You work best with {list}.',
    'synthesis.compose.human.need.freedom.soft': 'You seem to need {list}.',
    'synthesis.compose.human.need.depth.soft': 'Most of all, you seem to need {list}.',
    'synthesis.compose.human.need.making.soft': 'You seem to want {list}.',
    'synthesis.compose.human.need.people.soft': 'You seem to look for {list}.',
    'synthesis.compose.human.need.method.soft': 'You seem to work best with {list}.',
    /* A list holding a qualified want - a fusion - is said as what the person is
       after, which is what a qualified want is. */
    'synthesis.compose.human.need.fused.freedom': 'What you need, above all, is {list}.',
    'synthesis.compose.human.need.fused.depth': 'What you need most is {list}.',
    'synthesis.compose.human.need.fused.making': 'What you are after is {list}.',
    'synthesis.compose.human.need.fused.people': 'What you look for is {list}.',
    'synthesis.compose.human.need.fused.method': 'What serves you best is {list}.',
    'synthesis.compose.human.need.fused.freedom.soft': 'What you seem to need, above all, is {list}.',
    'synthesis.compose.human.need.fused.depth.soft': 'What you seem to need is {list}.',
    'synthesis.compose.human.need.fused.making.soft': 'What you seem to be after is {list}.',
    'synthesis.compose.human.need.fused.people.soft': 'What you seem to look for is {list}.',
    'synthesis.compose.human.need.fused.method.soft': 'What seems to serve you best is {list}.',
    'synthesis.compose.human.need.one.freedom': 'More than anything, you need {list}.',
    'synthesis.compose.human.need.one.depth': 'At bottom, what you need is {list}.',
    'synthesis.compose.human.need.one.making': 'What you want, more than anything, is {list}.',
    'synthesis.compose.human.need.one.people': 'More than anything, you look for {list}.',
    'synthesis.compose.human.need.one.method': 'Above all, you work best with {list}.',
    'synthesis.compose.human.need.one.freedom.soft': 'More than anything, you seem to need {list}.',
    'synthesis.compose.human.need.one.depth.soft': 'At bottom, what you seem to need is {list}.',
    'synthesis.compose.human.need.one.making.soft': 'What you seem to want, more than anything, is {list}.',
    'synthesis.compose.human.need.one.people.soft': 'More than anything, you seem to look for {list}.',
    'synthesis.compose.human.need.one.method.soft': 'Above all, you seem to work best with {list}.',
    'synthesis.compose.human.needAlso.freedom': 'You also need {list}.',
    'synthesis.compose.human.needAlso.depth': 'It also matters that you have {list}.',
    'synthesis.compose.human.needAlso.making': 'Alongside that, you want {list}.',
    'synthesis.compose.human.needAlso.people': 'You also look for {list}.',
    'synthesis.compose.human.needAlso.method': 'It also helps to have {list}.',
    'synthesis.compose.human.needAlso.freedom.soft': 'You also seem to need {list}.',
    'synthesis.compose.human.needAlso.depth.soft': 'It also seems to matter that you have {list}.',
    'synthesis.compose.human.needAlso.making.soft': 'Alongside that, you seem to want {list}.',
    'synthesis.compose.human.needAlso.people.soft': 'You also seem to look for {list}.',
    'synthesis.compose.human.needAlso.method.soft': 'It also seems to help to have {list}.',
    /* Used instead when the opening already said the same verb: `You want ...`
       followed by `Alongside that, you want ...` is the repetition a reader hears. */
    'synthesis.compose.human.needAlso2.freedom': 'Beyond that, it helps to have {list}.',
    'synthesis.compose.human.needAlso2.depth': 'Beyond that, you look for {list}.',
    'synthesis.compose.human.needAlso2.making': 'It also matters to you to have {list}.',
    'synthesis.compose.human.needAlso2.people': 'Beyond that, you need {list}.',
    'synthesis.compose.human.needAlso2.method': 'Beyond that, you want {list}.',
    'synthesis.compose.human.needAlso2.freedom.soft': 'Beyond that, it seems to help to have {list}.',
    'synthesis.compose.human.needAlso2.depth.soft': 'Beyond that, you seem to look for {list}.',
    'synthesis.compose.human.needAlso2.making.soft': 'It also seems to matter to you to have {list}.',
    'synthesis.compose.human.needAlso2.people.soft': 'Beyond that, you seem to need {list}.',
    'synthesis.compose.human.needAlso2.method.soft': 'Beyond that, you seem to want {list}.',
    'synthesis.compose.human.act.freedom': 'You would rather {list}.',
    'synthesis.compose.human.act.depth': 'You tend to {list}.',
    'synthesis.compose.human.act.making': 'Your habit is to {list}.',
    'synthesis.compose.human.act.people': 'Your first instinct is to {list}.',
    'synthesis.compose.human.act.method': 'Your way of working is to {list}.',
    'synthesis.compose.human.act.freedom.soft': 'You often prefer to {list}.',
    'synthesis.compose.human.act.depth.soft': 'You often {list}.',
    'synthesis.compose.human.act.making.soft': 'You are often inclined to {list}.',
    'synthesis.compose.human.act.people.soft': 'Your first instinct is often to {list}.',
    'synthesis.compose.human.act.method.soft': 'Your way of working is often to {list}.',
    'synthesis.compose.human.actAlso.freedom': 'You are inclined to {list}.',
    'synthesis.compose.human.actAlso.depth': 'You tend to {list}.',
    'synthesis.compose.human.actAlso.making': 'It is like you to {list}.',
    'synthesis.compose.human.actAlso.people': 'Another instinct is to {list}.',
    'synthesis.compose.human.actAlso.method': 'Part of your approach is to {list}.',
    'synthesis.compose.human.actAlso.freedom.soft': 'You seem inclined to {list}.',
    'synthesis.compose.human.actAlso.depth.soft': 'Often, you {list}.',
    'synthesis.compose.human.actAlso.making.soft': 'It seems natural for you to {list}.',
    'synthesis.compose.human.actAlso.people.soft': 'Another instinct seems to be to {list}.',
    'synthesis.compose.human.actAlso.method.soft': 'Part of your approach seems to be to {list}.',
    /* A habit the first habit's frame does not fit - a sensitivity beside a
       method - is said in a sentence of its own rather than bent into the frame. */
    'synthesis.compose.human.actToo': 'You {list}.',
    'synthesis.compose.human.actToo.soft': 'You seem to {list}.',
    /* A pattern resting on one tradition, or on very little: said on its own and
       as what it is. `needSingle` when every such want rests on one tradition. */
    'synthesis.compose.human.tentative.need': 'There is also a weaker pull toward {list}.',
    'synthesis.compose.human.tentative.needSingle': 'One tradition on its own also points to {list}.',
    'synthesis.compose.human.tentative.act': 'In some situations, you may also {list}.',
    /* Where the patterns land, in concrete parts of a life: the conditions under
       which patterns already explained work well there, together. Each slot is
       a list of `when you can ...` conditions, never a list of handles. */
    'synthesis.compose.human.life.work-career': 'At work, you do best when you can {list}.',
    'synthesis.compose.human.life.relationships': 'In close relationships, you do best when you can {list}.',
    'synthesis.compose.human.life.decision-making': 'You decide best when you can {list}.',
    'synthesis.compose.human.life.communication': 'In conversation, you are at your best when you can {list}.',
    'synthesis.compose.human.life.money-material': 'With money and practical matters, you do best when you can {list}.',
    'synthesis.compose.human.life.work-career.soft': 'At work, you are likely to do best when you can {list}.',
    'synthesis.compose.human.life.relationships.soft': 'In close relationships, you are likely to do best when you can {list}.',
    'synthesis.compose.human.life.decision-making.soft': 'You are likely to decide best when you can {list}.',
    'synthesis.compose.human.life.communication.soft': 'In conversation, you seem to be at your best when you can {list}.',
    'synthesis.compose.human.life.money-material.soft': 'With money and practical matters, you are likely to do best when you can {list}.',
    /* The close: the reading's central want, its leading split as a need, and one
       pattern of the other kind, in words the reading has not used yet. The
       lead-in varies with the central want's family, so the close is not one
       formula printed under every reading; the softer form says `probably`
       rather than `seem to`, so a reading that opens `you seem to need` does not
       close on the same four words. */
    'synthesis.compose.human.close.freedom': 'Put simply, you need {list}.',
    'synthesis.compose.human.close.depth': 'At its simplest, you need {list}.',
    'synthesis.compose.human.close.making': 'In plain terms, you need {list}.',
    'synthesis.compose.human.close.people': 'Taken together, you need {list}.',
    'synthesis.compose.human.close.method': 'All told, you need {list}.',
    'synthesis.compose.human.close.freedom.soft': 'Put simply, you probably need {list}.',
    'synthesis.compose.human.close.depth.soft': 'At its simplest, you probably need {list}.',
    'synthesis.compose.human.close.making.soft': 'In plain terms, you probably need {list}.',
    'synthesis.compose.human.close.people.soft': 'Taken together, you probably need {list}.',
    'synthesis.compose.human.close.method.soft': 'All told, you probably need {list}.',
    'synthesis.why': 'Why this appears',
    'synthesis.whyNote': 'Drawn from {pillars}, as an interpretation of symbolic traditions and not a measurement '
        + 'of you. The results behind each part of this reading, with their '
        + 'weights, are in Technical details further down.',
    /* The birth-time notice, short enough to read before the portrait without
       turning into a preamble. The full explanation is one tap away. */
    'synthesis.notice.estimatedTime': 'Birth time unknown. Only what your birth date settles is read here; what depends '
        + 'on the hour is left out rather than guessed.',
    /* An estimate, stated in the main reading - never only behind a disclosure. */
    /* Not the Astrology tab's "Your birth time is an estimate." - one statement
       per surface, each in its own words. */
    'synthesis.notice.approximateTime': 'This reading starts from the birth time you estimated. Anything that could change '
        + 'within two hours of it counts for less here.',
    'synthesis.notice.why': 'Why this matters',
    'synthesis.compose.practical.noTension': 'The traditions do not pull against each other in this area.',
    /* --------------------------------------------------- headline and opening */
    'synthesis.compose.headline.none': 'No single pattern across the systems',
    'synthesis.compose.intro.converges.1': 'Across one distinct symbolic traditions, the reading converges most strongly on '
        + '{theme}{then}.',
    'synthesis.compose.intro.converges.2': 'Across two distinct symbolic traditions, the reading converges most strongly on '
        + '{theme}{then}.',
    'synthesis.compose.intro.converges.3': 'Across three distinct symbolic traditions, the reading converges most strongly on '
        + '{theme}{then}.',
    'synthesis.compose.intro.converges.4': 'Across four distinct symbolic traditions, the reading converges most strongly on '
        + '{theme}{then}.',
    'synthesis.compose.intro.converges.n': 'Across {count} distinct symbolic traditions, the reading converges most strongly on '
        + '{theme}{then}.',
    'synthesis.compose.intro.then': ', then on {list}',
    'synthesis.compose.intro.axes.zero': '{count} axes are genuinely contested between them, and those are usually the more '
        + 'interesting part.',
    'synthesis.compose.intro.axes.one': '{count} axis is genuinely contested between them, and those are usually the more '
        + 'interesting part.',
    'synthesis.compose.intro.axes.few': '{count} axes are genuinely contested between them, and those are usually the more '
        + 'interesting part.',
    'synthesis.compose.intro.axes.many': '{count} axes are genuinely contested between them, and those are usually the more '
        + 'interesting part.',
    'synthesis.compose.intro.none.1': 'Across one distinct symbolic traditions, no theme reached strong or moderate '
        + 'support. That is a real result rather than a missing one, and the contested axes '
        + 'below are where this particular chart has something to say.',
    'synthesis.compose.intro.none.2': 'Across two distinct symbolic traditions, no theme reached strong or moderate '
        + 'support. That is a real result rather than a missing one, and the contested axes '
        + 'below are where this particular chart has something to say.',
    'synthesis.compose.intro.none.3': 'Across three distinct symbolic traditions, no theme reached strong or moderate '
        + 'support. That is a real result rather than a missing one, and the contested axes '
        + 'below are where this particular chart has something to say.',
    'synthesis.compose.intro.none.4': 'Across four distinct symbolic traditions, no theme reached strong or moderate '
        + 'support. That is a real result rather than a missing one, and the contested axes '
        + 'below are where this particular chart has something to say.',
    'synthesis.compose.intro.none.n': 'Across {count} distinct symbolic traditions, no theme reached strong or moderate '
        + 'support. That is a real result rather than a missing one, and the contested axes '
        + 'below are where this particular chart has something to say.',
    /* ------------------------------------------------------- the interactions */
    /*
     * The sentences that name what was actually calculated.
     *
     * Every one takes a LIST OF RESULTS - `Life Path 7, Sun in Virgo and a
     * defined Sacral centre` - built by factPhrasing.ts from the evidence the
     * foundation already carries. The Slovak halves put that list in subject
     * position or after a colon, because a phrase assembled from engine output
     * cannot be declined into an arbitrary case.
     */
    'synthesis.compose.interaction.lead.tension': 'The sharpest thing in this particular combination is a split the systems do not '
        + 'resolve between them. {heavierFacts} point toward {heavierPole}. {lighterFacts} '
        + 'point toward {lighterPole}.',
    /* The results sit after a colon rather than opening a sentence: a phrase
       like `the Generator type` is correct mid-sentence and wrong capitalised,
       and the Slovak half puts them after a colon for the same reason. */
    'synthesis.compose.interaction.lead.convergence': 'The clearest thing in this combination is how much of it says one thing: '
        + '{facts} all arrive at {theme}, from {count} systems that cannot see each other.',
    'synthesis.compose.interaction.sources': 'The two sides are not even built from the same input: {heavierSources} on one '
        + 'side, {lighterSources} on the other.',
    'synthesis.compose.interaction.reinforcement': '{facts} land on the same thing: {theme}.',
    'synthesis.compose.interaction.tensionLine': '{heavierFacts} point toward {heavierPole}. {lighterFacts} point toward '
        + '{lighterPole}.',
    'synthesis.compose.interaction.restsOn': 'Here that rests on {facts}.',
    /* -------------------------------------------------------- the mechanisms */
    /*
     * The frames the composed mechanism sits in. The contribution sentences are
     * built in mechanismComposer.ts from the lexicon; these are only the joins.
     */
    'synthesis.compose.mechanism.shared': 'What they share is narrower than {theme}: {emergent}.',
    'synthesis.compose.mechanism.against': 'Against that:',
    'synthesis.compose.mechanism.inPractice': 'In practice: {emergent}.',
    'synthesis.compose.mechanism.takeaway': '{pillars} arrive at this separately: {emergent}.',
    'synthesis.compose.interaction.concretely': 'Concretely: {facts}.',
    'synthesis.compose.interaction.input.numerology': 'your name and birth date',
    'synthesis.compose.interaction.input.astrology': 'the sky at your birth moment',
    'synthesis.compose.interaction.input.bazi': 'the sexagenary calendar',
    'synthesis.compose.interaction.input.human-design': 'the two moments the design is read from',
    /* ---------------------------------------------------- the summary card -- */
    'synthesis.compose.unified.subject.relationships': 'relationships',
    'synthesis.compose.unified.subject.work-career': 'work and career',
    'synthesis.compose.unified.subject.growth': 'growth and learning',
    'synthesis.compose.unified.subject.stress-shadow': 'stress and shadow patterns',
    'synthesis.compose.unified.domain.empty': 'No theme reached the reporting threshold for {subject}. The systems are silent here '
        + 'rather than agreeing, and the individual pillar readings still cover it.',
    'synthesis.compose.unified.domain.agreed': 'Across the systems, {subject} is touched by {list}.',
    'synthesis.compose.unified.domain.noAgreed': 'No agreed theme reaches {subject}; what the systems say about it is contested '
        + 'rather than settled.',
    'synthesis.compose.unified.domain.disputed.one': ' {list} also touches it, on the contested side.',
    'synthesis.compose.unified.domain.disputed.many': ' {list} also touch it, on the contested side.',
    'synthesis.compose.unified.domain.axes.one': ' The contested axis is {list}.',
    'synthesis.compose.unified.domain.axes.many': ' The contested axes are {list}.',
    'synthesis.compose.unified.domain.noAxes': ' No contested axis bears on it.',
    'synthesis.compose.unified.map.converge': '{count} traditions converge most strongly on {theme}{behind}, and disagree '
        + 'on {axes}.',
    'synthesis.compose.unified.map.behind': ', with {list} close behind',
    'synthesis.compose.unified.map.axes.zero': '{count} axes',
    'synthesis.compose.unified.map.axes.one': '{count} axis',
    'synthesis.compose.unified.map.axes.few': '{count} axes',
    'synthesis.compose.unified.map.axes.many': '{count} axes',
    'synthesis.compose.unified.map.none.1': 'No theme reached moderate support across the one available system, which is a real '
        + 'result rather than a missing one.',
    'synthesis.compose.unified.map.none.2': 'No theme reached moderate support across the two available systems, which is a real '
        + 'result rather than a missing one.',
    'synthesis.compose.unified.map.none.3': 'No theme reached moderate support across the three available systems, which is a '
        + 'real result rather than a missing one.',
    'synthesis.compose.unified.map.none.4': 'No theme reached moderate support across the four available systems, which is a '
        + 'real result rather than a missing one.',
    'synthesis.compose.unified.map.none.n': 'No theme reached moderate support across the {count} available systems, which is a '
        + 'real result rather than a missing one.',
    'synthesis.compose.unified.strength': '{theme} ({count} of {total} systems, {support} support)',
    'synthesis.compose.unified.noStrength': 'No theme reached the reporting threshold across two or more systems.',
    'synthesis.compose.unified.tension': '{axis}: {poleA} against {poleB} ({kind})',
    'synthesis.compose.unified.kind.true': 'true tension',
    'synthesis.compose.unified.kind.contextual': 'contextual duality',
    'synthesis.compose.unified.noTension': 'No axis is contested between the systems at a level worth reporting.',
    'synthesis.compose.unified.rec.test': 'Test the strongest convergences against how you actually spent the last month, not '
        + 'against how you think of yourself. Agreement between systems tells you which '
        + 'parts of the reading to check first, not which parts are true.',
    'synthesis.compose.unified.rec.readAxes': 'Read the {axes} before the agreements. Where the systems disagree is usually where '
        + 'a reading has something specific to say, because a split describes a person doing '
        + 'two things rather than one.',
    'synthesis.compose.unified.rec.axes.zero': '{count} contested axes',
    'synthesis.compose.unified.rec.axes.one': '{count} contested axis',
    'synthesis.compose.unified.rec.axes.few': '{count} contested axes',
    'synthesis.compose.unified.rec.axes.many': '{count} contested axes',
    'synthesis.compose.unified.rec.nothingContested': 'Nothing is contested between the systems for this chart, so the individual pillar '
        + 'readings will be more informative than this summary.',
    'synthesis.compose.unified.rec.narrow': 'Each pillar reading is complete on its own terms and says a great deal that could '
        + 'not survive being checked against three other traditions. This layer is '
        + 'deliberately the narrow part.',
    'synthesis.compose.unified.q.visible': 'Where in an ordinary week would {theme} actually be visible to somebody watching?',
    'synthesis.compose.unified.q.recognised': 'Which of the four pillar readings described something you recognised, and which did '
        + 'not?',
    'synthesis.compose.unified.q.axis': 'On {axis}, which side shows up at work and which at home - or is that not how it '
        + 'splits for you?',
    'synthesis.compose.unified.q.expect': 'What would you expect four symbolic traditions to agree on about you, and did they?',
    'synthesis.compose.unified.q.evidence': 'What evidence would change your mind about the strongest theme here?',
};
/**
 * Slovak. Partial on purpose - anything absent renders the English above.
 *
 * Canonical terms are deliberately NOT translated: Day Master, BaZi, Human
 * Design, Ten Gods (as a proper name for the set), and every number.
 */
const SK = {
    'section.at-a-glance': 'V skratke',
    'section.portrait': 'Tvoj portrét',
    'section.themes': 'Hlavné témy',
    'section.inner-world': 'Vnútorný svet',
    'section.relationships': 'Vzťahy',
    'section.work': 'Práca a smerovanie',
    'section.strengths': 'Silné stránky',
    'section.shadow': 'Tieň a výzvy',
    'section.growth': 'Rast',
    'section.system-specific': 'V tomto systéme',
    'section.current-chapter': 'Kde sa práve nachádzaš',
    'section.numbers': 'Tvoje čísla v úplnosti',
    'section.chart-structure': 'Ako je mapa poskladaná',
    'section.key-aspects': 'Aspekty, ktoré formujú mapu',
    'section.placements': 'Všetky postavenia',
    'section.astro-pattern': 'Hlavný vzorec tvojej mapy',
    'section.astro-drive': 'Čo ťa poháňa a čo ťa upokojuje',
    'section.astro-meet': 'Čo sa ukáže ako prvé',
    'section.astro-mind': 'Ako rozmýšľaš a konáš',
    'section.astro-relate': 'Ako prežívaš blízkosť',
    'section.astro-pull': 'Kde mapa ťahá dvoma smermi',
    'section.astro-helps': 'Čo to stojí a čo pomáha',
    'section.astro-evidence': 'Prečo sa to tu objavuje',
    'section.astro-time': 'Tvoj čas narodenia',
    'section.chinese-zodiac': 'Tvoje čínske znamenie',
    'section.four-pillars': 'Tvoje štyri piliere',
    'section.day-master': 'Tvoj Day Master',
    'section.five-elements': 'Tvojich päť fáz',
    'section.seasonal-strength': 'Ročné obdobie a podpora',
    'section.hidden-stems': 'Skryté nebeské kmene',
    'section.ten-gods': 'Desať bohov',
    'section.luck-pillars': 'Piliere šťastia',
    'section.tcm': 'Symbolické priradenie TCM',
    'section.bazi-nature': 'Tvoja povaha a jej ročné obdobie',
    'section.bazi-energy': 'Kam ide tvoja energia',
    'section.bazi-tension': 'Kde to ťahá dvoma smermi',
    'section.bazi-steadies': 'Čo ťa drží v rovnováhe',
    'section.bazi-costs': 'Čo ťa to stojí',
    'section.bazi-practice': 'Čo si precvičovať',
    'section.bazi-evidence': 'Prečo sa to tu objavuje',
    'section.numerology-direction': 'Tvoj smer',
    'section.numerology-drive': 'Čo ťa poháňa',
    'section.numerology-presence': 'Ako vstupuješ do sveta',
    'section.numerology-pull': 'Kde sa tvoje čísla rozchádzajú',
    'section.numerology-cost': 'Čo tento vzorec stojí',
    'section.numerology-growth': 'Čo časom silnie',
    'section.numerology-chapter': 'Kapitola, v ktorej si',
    'section.numerology-evidence': 'Prečo sa to tu objavuje',
    'section.numerology-positions': 'Tvoje čísla jedno po druhom',
    'section.numerology-chapters': 'Tvoje štyri životné kapitoly',
    'section.numerology-cycles': 'Tvoje aktuálne cykly',
    /* The Human Design narrative layer. */
    'section.hd-operates': 'Na čom tento dizajn beží',
    'section.hd-decides': 'Ako vzniká rozhodnutie',
    'section.hd-with-others': 'Ako stretávaš ľudí',
    'section.hd-consistent': 'Čo zostáva rovnaké',
    'section.hd-context': 'Kde mení miestnosť výsledok',
    'section.hd-tension': 'Kde dizajn ťahá na dve strany',
    'section.hd-costs': 'Čo tento vzorec stojí',
    'section.hd-practice': 'Čo pomáha',
    'section.hd-evidence': 'Prečo sa to tu objavuje',
    'section.hd-withheld': 'Prečo sa to nezobrazuje',
    'section.hd-envelope': 'Čo určuje už samotný deň narodenia',
    'section.hd-type-detail': 'Tvoj typ v úplnosti',
    'section.hd-authority-detail': 'Tvoja autorita v úplnosti',
    'section.hd-profile-detail': 'Tvoj profil v úplnosti',
    'section.hd-definition-detail': 'Tvoja definícia v úplnosti',
    'section.hd-cross': 'Tvoj inkarnačný kríž',
    'section.deciding': 'Ako sa v skutočnosti rozhoduješ',
    'section.defined-centres': 'Tvoje definované centrá',
    'section.open-centres': 'Tvoje otvorené centrá',
    'section.channels': 'Tvoje kanály',
    'section.gates': 'Tvoje brány',
    'section.variables': 'Pokročilé: tvoje premenné',
    /* ------------------------------------------------ the forecast reading */
    'forecast.technical.notRead': 'Čo sa pre toto obdobie nečítalo',
    'forecast.system.numerology': 'Numerológia',
    'forecast.system.astrology': 'Západná astrológia',
    'forecast.system.bazi': 'BaZi',
    'forecast.gap.luckPillar': 'Desaťročný pilier šťastia (Da Yun)',
    'forecast.gap.humanDesign': 'Tranzity Human Designu',
    'forecast.gap.luckPillar.vessel-undefined': 'Smer desaťročného cyklu závisí od tela a to zostalo pri zadávaní nedefinované. Tradičné pravidlo '
        + 'pozná len mužské a ženské telo a žiadna škola ho ďalej nerozširuje. Namiesto toho, aby '
        + 'sme si jeden smer vybrali a výsledok ti podali ako tvoj, cyklus tu vynechávame.',
    'forecast.gap.luckPillar.vessel-missing': 'Voľba tela zo zadania sa k tomuto čítaniu nedostala a bez nej sa smer desaťročného cyklu '
        + 'určiť nedá.',
    'forecast.gap.luckPillar.polarity-missing': 'Ročný pilier sa nepodarilo vypočítať a smer desaťročného cyklu sa číta z jeho polarity.',
    'forecast.gap.humanDesign.no-transit-doctrine': 'Human Design vie určiť, kam dnešné planéty v tvojom dizajne dopadajú. Na to, aby sa to dalo '
        + 'čítať ako obdobie, by bolo treba pravidlo, čo znamená prechádzajúca brána oproti kanálu, '
        + 'ktorý máš už definovaný. Také pravidlo táto znalostná báza nemá, takže tento systém '
        + 'zostáva bokom.',
    /* Krátke tvary dvadsiatich štyroch dimenzií. Predpoveď ich už netlačí, ale
       syntéza portrétu nimi pomenúva póly, preto zostávajú bez zmeny. */
    'forecast.short.introspective': 'prácu dovnútra',
    'forecast.short.outwardly-engaged': 'zapájanie sa do diania',
    'forecast.short.analytical': 'premýšľanie nad vecou',
    'forecast.short.intuitive': 'dôveru vlastnému čítaniu',
    'forecast.short.independent': 'samostatné rozhodovanie',
    'forecast.short.collaborative': 'rozhodovanie s druhými',
    'forecast.short.structured': 'ustálený poriadok',
    'forecast.short.adaptable': 'prispôsobovanie tvaru',
    'forecast.short.cautious': 'vyberavý pohyb',
    'forecast.short.risk-oriented': 'zaviazanie sa skoro',
    'forecast.short.emotionally-expressive': 'vyslovenie pocitu hneď, ako ho cítiš',
    'forecast.short.emotionally-contained': 'podržanie pocitu, kým nedostane tvar',
    'forecast.short.private': 'ponechanie si vecí pre seba',
    'forecast.short.social': 'pobyt medzi ľuďmi',
    'forecast.short.stability-seeking': 'držanie sa toho, čo funguje',
    'forecast.short.novelty-seeking': 'hľadanie nového',
    'forecast.short.assertive': 'presadzovanie vlastnej línie',
    'forecast.short.receptive': 'nechávanie vecí prísť',
    'forecast.short.practical': 'prácu rukami',
    'forecast.short.conceptual': 'najprv premyslenie vecí',
    'forecast.short.creative': 'vytváranie niečoho nového',
    'forecast.short.persistent': 'zotrvanie pri veci',
    'forecast.short.emotionally-sensitive': 'čítanie atmosféry v miestnosti',
    'forecast.short.communicative': 'vyslovovanie vecí nahlas',
    'synthesis.orientation': 'Ako vznikol tento výklad',
    'synthesis.caveats': 'Skôr než to začneš čítať',
    'synthesis.portrait': 'Čo sa tým všetkým vinie',
    'synthesis.convergence': 'Ako sa to zvyčajne prejaví',
    'synthesis.drives': 'Na čom ti ešte záleží',
    'synthesis.support-table': 'Všetky témy, zoradené',
    'synthesis.tensions': 'Kde ťa to ťahá na dve strany',
    'synthesis.takeaways': 'V skratke',
    'synthesis.practical': 'V bežnom živote',
    'synthesis.single-system': 'Nesené len jedným systémom',
    'synthesis.domains': 'Čoho sa to týka',
    'synthesis.limits': 'Čo ti toto nemôže povedať',
    'synthesis.kicker': 'Štyri systémy čítané spoločne',
    /* Not „Prierezová syntéza“. That is a report title from a ministry, and
       the eyebrow above it already says the four systems are being read
       together - so the heading itself can say what the reader is looking at. */
    'synthesis.title': 'Spojený obraz',
    'synthesis.cardEyebrow': 'Na záver',
    'synthesis.notCalculated': 'Pre tento profil nebola vypočítaná',
    'synthesis.benchmarkNote': 'Tento profil je referenčná ukážka. Reprodukuje zdokumentovanú syntézu namiesto '
        + 'toho, aby ju počítal, takže za ňou nestojí vypočítané prierezové čítanie. '
        + 'Zostaviť ho tu by znamenalo ukázať ti niečo, čo nevzišlo z výpočtových jadier.',
    'synthesis.pillarsStillComplete': 'Štyri piliere sú vypočítané a úplné. Ktorýkoľvek z nich otvoríš na '
        + 'predchádzajúcej obrazovke.',
    'synthesis.tech.summary': 'Technické podrobnosti',
    'synthesis.tech.summarySub': 'Pokrytie, spôsob váženia a celá reťaz dôkazov.',
    'synthesis.tech.coverage': 'Pokrytie',
    'synthesis.tech.method': 'Metóda a pôvod',
    'synthesis.tech.evidenceChain': 'Reťaz dôkazov ({count})',
    'synthesis.tech.evidenceChainNote': 'Každý doklad za každou témou uvedenou vyššie, s váhou, ktorou skutočne '
        + 'prispel, a s údajom, či bol znížený za závislosť na inej položke v tej '
        + 'istej skupine.',
    'synthesis.tech.systemsIncluded': 'Zahrnuté systémy',
    'synthesis.tech.systemsMissing': 'Chýbajúce systémy',
    'synthesis.tech.none': 'Žiadne',
    'synthesis.tech.weight': 'váha',
    'synthesis.tech.discounted': 'znížená váha ako pri potvrdzujúcom dôkaze',
    'synthesis.tech.evidenceWeighed': 'Zvážené doklady',
    'synthesis.tech.suppressed': 'Vynechané',
    'synthesis.tech.suppressedNote': 'Vylúčené úplne, pretože údaje, ktoré potrebovali, neboli dostupné.',
    'synthesis.tech.timeSensitive': 'Citlivé na čas',
    'synthesis.tech.timeSensitiveNote': 'Znížená váha: stoja na čase narodenia, ktorý je odhadom, alebo na mape BaZi bez hodinového piliera.',
    'synthesis.tech.birthTime': 'Čas narodenia',
    'synthesis.tech.birthTimeEstimated': 'Nezadaný (čítal sa celý deň narodenia)',
    'synthesis.tech.birthTimeSupplied': 'Zadaný',
    'synthesis.tech.birthTimeApproximate': 'Približný (tvoj odhad)',
    'synthesis.tech.themesReported': 'Uvedené témy',
    'synthesis.tech.themesBelow': 'Témy pod prahom',
    'synthesis.tech.themesBelowNote': 'Zistené a nezobrazené: {themes}.',
    'synthesis.tech.axesContested': 'Sporné body',
    'synthesis.tech.model': 'Model syntézy',
    'synthesis.tech.pipeline': 'Spracovanie',
    'synthesis.tech.pipelineNote': 'Výstup jadier na normalizované doklady, váženie, zníženie za závislosť, '
        + 'zoskupenie do tém, kontrola napätí, zaradenie do oblastí.',
    'synthesis.tech.determinism': 'Determinizmus',
    'synthesis.tech.determinismNote': 'Žiadne hodiny, žiadna sieť, žiadna náhoda. Tie isté štyri výstupy jadier '
        + 'vytvoria vždy tú istú syntézu.',
    'ui.back': 'Späť',
    'ui.close': 'Zavrieť',
    'astro.hero.ascendant': 'Ascendent',
    'astro.hero.needsTime': 'potrebuje čas narodenia',
    'profile.open': 'Profil a nastavenia',
    'profile.title': 'Profil',
    'profile.close': 'Zavrieť',
    'profile.photo': 'Profilová fotka',
    'profile.changePhoto': 'Zmeniť fotku',
    'profile.removePhoto': 'Odstrániť fotku',
    'profile.photoFailed': 'Tento obrázok sa nepodarilo načítať. Skús iný.',
    'profile.photoTooBig': 'Tento obrázok je príliš veľký na to, aby sa dal uložiť v zariadení.',
    'profile.editBirth': 'Upraviť údaje o narodení',
    'profile.settings': 'Nastavenia',
    'profile.field.birthDate': 'Dátum narodenia',
    'profile.field.birthTime': 'Čas narodenia',
    'profile.field.birthTimeUnknown': 'Neznámy',
    'profile.field.birthPlace': 'Miesto narodenia',
    'profile.field.western': 'Západný zverokruh',
    'profile.field.chinese': 'Čínsky zverokruh',
    'profile.field.lifePath': 'Životná cesta',
    'profile.field.dayMaster': 'Day Master',
    'profile.field.humanDesign': 'Human Design',
    'profile.devSection': 'QA · len pre vývoj',
    'profile.editor.title': 'Umiestni svoju fotku',
    'profile.editor.hint': 'Ťahaním posúvaj. Priblíž dvoma prstami alebo posuvníkom.',
    'profile.editor.zoom': 'Priblíženie',
    'profile.editor.reset': 'Obnoviť',
    'profile.editor.cancel': 'Zrušiť',
    'profile.editor.save': 'Uložiť fotku',
    'ui.deepDive': 'Ísť do hĺbky',
    'ui.deepDive.sub': 'Celý rozbor za výkladom, systém po systéme.',
    'synthesis.deepDive.sub': 'Zhody a napätia, ktoré model zaradil nižšie než tie vyššie.',
    'synthesis.tech.reference': 'Syntéza naprieč piliermi, počítaná lokálne',
    'ui.technical': 'Technické podrobnosti',
    'ui.technical.sub': 'Surové hodnoty, spôsob výpočtu, metodika a obmedzenia.',
    'ui.technical.allValues': 'Všetky vypočítané hodnoty',
    'ui.technical.method': 'Metóda a pôvod',
    'ui.technical.limitations': 'Obmedzenia',
    'ui.infoAria': 'Čo je',
    'ui.selfMap': 'Tvoja mapa seba',
    'nav.aria': 'Tvoj výklad',
    'nav.portrait': 'Portrét',
    'nav.western-astrology': 'Astrológia',
    'nav.numerology': 'Numerológia',
    'nav.bazi-tcm': 'BaZi',
    'nav.human-design': 'Human Design',
    'nav.forecast': 'Predpoveď',
    'nav.tarot': 'Tarot',
    /* Hlavné menu: štyri systémy v jednej kapsule, ich syntéza k nim pripojená a tri ďalšie vstupy. */
    'nav.menu': 'Menu',
    'menu.aria': 'Hlavné menu',
    'menu.brand': 'Know Thyself',
    'menu.byline': 'No Die Self',
    'menu.tagline': 'Tvoja mapa. Hlbšie k tebe.',
    'menu.pillars.aria': 'Štyri systémy a ich syntéza',
    'menu.more.aria': 'Ďalšie vstupy',
    'menu.pillar.western-astrology': 'Pilier astrológie',
    'menu.pillar.numerology': 'Pilier numerológie',
    'menu.pillar.human-design': 'Pilier Human Design',
    'menu.pillar.bazi-tcm': 'Pilier BaZi',
    'menu.connections': 'Prepojenia',
    /* Connections: the chrome of its screens. The reading itself is authored content (app/connections/reading/content), not here. */
    'cx.title': 'Prepojenia',
    'cx.observed.communication-struggles': 'Máme problém dorozumieť sa',
    'cx.observed.frequent-conflict': 'Často sa hádame',
    'cx.observed.conflict-goes-unrepaired': 'Hádky zostávajú nevyriešené',
    'cx.observed.pace-differences': 'Máme odlišné tempo',
    'cx.observed.different-working-styles': 'Pracujeme odlišne',
    'cx.observed.unclear-roles': 'Naše roly nie sú jasné',
    'cx.observed.decision-stalemates': 'Rozhodnutia uviaznu',
    'cx.observed.feeling-unseen': 'V našom vzťahu chýba pocit, že nás druhá strana naozaj vidí',
    'cx.observed.need-more-closeness': 'Chceme viac blízkosti',
    'cx.observed.need-more-space': 'Niekto potrebuje viac priestoru',
    'cx.observed.strong-reactions-to-change': 'Silné reakcie na zmeny',
    'cx.observed.resists-rules': 'Odpor voči pravidlám',
    'cx.observed.withdraws-when-upset': 'Pri rozrušení sa uzatvára do seba',
    'cx.observed.sibling-friction': 'Súrodenci sa často škriepia',
    'cx.observed.unfair-comparison': 'Porovnávanie detí pôsobí nespravodlivo',
    'cx.observed.parents-disagree-on-approach': 'Dospelí k tomu pristupujú odlišne',
    'cx.observed.wants-to-collaborate': 'Chceme spolupracovať',
    'cx.observed.old-roles-persist': 'Staré rodinné roly pretrvávajú',
    'cx.observed.recurring-argument': 'Stále sa vracia tá istá hádka',
    'cx.subtitle': 'Ako sa v spoločnom živote stretávajú dva spôsoby prežívania, aby sa vzťahu dalo rozumieť, a nie ho súdiť.',
    'cx.domains.aria': 'Druhy vzťahov',
    'cx.domain.romantic': 'Partnerský',
    'cx.domain.romantic.line': 'Partnerstvo a blízkosť',
    'cx.domain.family': 'Rodina',
    'cx.domain.family.line': 'Súrodenci, rodičia, starí rodičia, príbuzní',
    'cx.domain.work': 'Práca',
    'cx.domain.work.line': 'Kolegovia, spoločníci, mentori',
    'cx.domain.parenting': 'Rodičovstvo',
    'cx.domain.parenting.line': 'Porozumieť dieťaťu v jeho veku',
    'cx.resume': 'Pokračovať v rozpracovanom čítaní',
    'cx.people.title': 'Uložené v tomto zariadení',
    'cx.people.session': 'Počas tejto návštevy',
    'cx.remove': 'Odstrániť',
    'cx.remove.aria': 'Odstrániť {name} z Prepojení',
    'cx.privacy': 'Údaje o narodení, ktoré zadáš, zostávajú v tomto zariadení a po zatvorení karty sa zabudnú, ak sa nerozhodneš ich ponechať.',
    'cx.forget': 'Zabudnúť všetko, čo si Prepojenia pamätajú',
    'cx.forget.done': 'Zabudnuté.',
    'cx.step.relationship': 'Vzťah',
    'cx.step.who': 'Kto',
    'cx.step.notice': 'Čo si všímaš',
    'cx.step.optional': 'nepovinné',
    'cx.notice.hint': 'Vyber najviac štyri. Je to tvoj vlastný pohľad na vzťah a mení len to, čomu sa čítanie venuje ako prvému.',
    'cx.kind.partners': 'Partneri',
    'cx.kind.siblings': 'Súrodenci',
    'cx.kind.adult-parent-adult-child': 'Rodič a dospelé dieťa',
    'cx.kind.grandparent-grandchild': 'Starý rodič a vnúča',
    'cx.kind.extended-family': 'Ďalší príbuzní',
    'cx.kind.coworkers': 'Kolegovia',
    'cx.kind.business-partners': 'Obchodní partneri',
    'cx.kind.founders': 'Spoluzakladatelia',
    'cx.kind.manager-collaborator': 'Manažér a spolupracovník',
    'cx.kind.mentor-mentee': 'Mentor a zverenec',
    'cx.kind.project-partners': 'Partneri v projekte',
    'cx.kind.parent-child': 'Som rodič',
    'cx.kind.caregiver-child': 'Som iná osoba, ktorá sa o dieťa stará',
    'cx.kind.co-parents': 'Spolurodičia',
    'cx.kind.siblings-in-household': 'Súrodenci doma',
    'cx.you': 'Ty',
    'cx.you.as': 'Ty: {name}',
    'cx.role.question': 'Ty si',
    'cx.role.parent': 'Rodič',
    'cx.role.adult-child': 'Dospelé dieťa',
    'cx.role.grandparent': 'Starý rodič',
    'cx.role.grandchild': 'Vnúča',
    'cx.role.manager': 'Manažér',
    'cx.role.collaborator': 'Spolupracovník',
    'cx.role.mentor': 'Mentor',
    'cx.role.mentee': 'Zverenec',
    'cx.other': 'Druhý človek',
    'cx.adults': 'Dospelí',
    'cx.children': 'Deti',
    'cx.add.person': 'Pridať človeka',
    'cx.add.adult': 'Pridať ďalšieho dospelého',
    'cx.add.child': 'Pridať dieťa',
    'cx.add.choose': 'Alebo vyber niekoho, kto už je pridaný',
    'cx.run': 'Prečítať tento vzťah',
    'cx.need.other': 'Na pokračovanie pridaj druhého človeka.',
    'cx.need.child': 'Na pokračovanie pridaj dieťa.',
    'cx.need.kind': 'Na pokračovanie vyber vzťah.',
    'cx.reading': 'Čítam…',
    'cx.error.person': 'Z uvedených údajov sa tento človek nedal prečítať. Skontroluj ich, prosím.',
    'cx.error.generic': 'Pri čítaní tohto vzťahu sa niečo pokazilo. Nič sa neuložilo.',
    'cx.error.child-adult': 'Tento človek má osemnásť rokov alebo viac. Pre vzťah dospelých vyber Rodinu.',
    'cx.age.months': '{n} mesiacov',
    'cx.age.months.one': '{n} mesiac',
    'cx.age.months.few': '{n} mesiace',
    'cx.age.years': '{n} rokov',
    'cx.age.years.one': '{n} rok',
    'cx.age.years.few': '{n} roky',
    'cx.result.change': 'Zmeniť',
    'cx.result.between': '{a} a {b}',
    'cx.result.noticed': 'Tvoje postrehy',
    'cx.section.explore': 'Preskúmať',
    'cx.section.explore.hint': 'Vyber rozmer a uvidíš, kde sa každý nachádza.',
    'cx.section.reading': 'Čítanie',
    'cx.section.evidence': 'Ako sa to čítalo',
    'cx.dimension.more': 'Čo prináša každý',
    'cx.dimension.scale': 'Kde sa každý v tomto nachádza',
    'cx.dimension.unplaced': 'Nezaradené',
    'cx.evidence.note': 'Výskum podporuje praktické odporúčania. Neoveruje astrológiu, numerológiu, Human Design ani BaZi ako meranie ľudí.',
    'cx.evidence.research': 'Výskum za odporúčaniami',
    'cx.evidence.traditions': 'Čo prinášajú tradície',
    'cx.evidence.dimensions': 'Rozmer po rozmere',
    'cx.evidence.pillars': 'Tradície: {list}',
    'cx.evidence.facts': 'Vypočítané skutočnosti',
    'cx.evidence.quality.high': 'Silné dôkazy',
    'cx.evidence.quality.moderate': 'Stredne silné dôkazy',
    'cx.evidence.quality.limited': 'Obmedzené dôkazy',
    'cx.evidence.corroboration.firm': 'Tradície založené na nebi aj na kalendári ukazujú rovnakým smerom.',
    'cx.evidence.corroboration.supported': 'Týmto smerom ukazuje viac tradícií z tej istej rodiny.',
    'cx.evidence.corroboration.single': 'Len jedna tradícia. Ber to s rezervou.',
    'cx.evidence.unreadable': 'Nečítané: príliš málo podkladov alebo závisia od času narodenia, ktorý nie je známy.',
    'cx.pillar.astrology': 'Západná astrológia',
    'cx.pillar.numerology': 'Numerológia',
    'cx.pillar.human-design': 'Human Design',
    'cx.pillar.bazi': 'BaZi',
    'cx.practice.sources': 'Výskum',
    'cx.household.title': 'Domácnosť',
    'cx.household.pairs': 'Vyber dvojicu',
    'cx.child.title': '{name}',
    'cx.child.portrait': 'Na čo ukazuje profil',
    'cx.child.fullGuide': 'Celý sprievodca pre {name} je na stránke domácnosti.',
    'cx.child.age': 'Vek: {age}',
    'cx.guide.title': 'V tomto veku',
    'cx.guide.notyet': 'Čo sa zatiaľ nedá očakávať',
    'cx.guide.know': 'Čo je typické',
    'cx.guide.try': 'Čo vyskúšať',
    'cx.guide.fit': 'Pre toto dieťa',
    'cx.guide.priority': 'Podľa toho, čo si všímaš',
    'cx.sheet.person': 'Pridať človeka',
    'cx.sheet.adult': 'Pridať ďalšieho dospelého',
    'cx.sheet.child': 'Pridať dieťa',
    'cx.sheet.add': 'Pridať',
    'cx.sheet.cancel': 'Zrušiť',
    'cx.field.label': 'Ako sa bude volať v čítaní?',
    'cx.field.label.hint': 'Krstné meno alebo prezývka. Iba to sa niekedy zobrazí.',
    'cx.field.birthName': 'Rodné krstné meno (mená)',
    'cx.field.birthSurname': 'Rodné priezvisko',
    'cx.field.names.hint': 'Numerológia číta meno dané pri narodení. Zostáva v tomto zariadení a nezobrazuje sa.',
    'cx.field.date': 'Dátum narodenia',
    'cx.field.time': 'Čas narodenia',
    'cx.time.exact': 'Presný',
    'cx.time.approximate': 'Približný',
    'cx.time.unknown': 'Neznámy',
    'cx.time.hint': 'Bez presného času sa podrobnosti, ktoré od neho závisia, vynechajú alebo berú s rezervou.',
    'cx.field.place': 'Miesto narodenia',
    'cx.place.search': 'Hľadať mesto alebo obec',
    'cx.place.none': 'Žiadna zhoda. Skús iný pravopis.',
    'cx.place.error': 'Vyhľadávanie miest teraz nie je dostupné. Skús to znova.',
    'cx.place.resolving': 'Overujem časové pásmo…',
    'cx.place.unresolved': 'Časové pásmo tohto miesta sa nepodarilo nájsť. Vyber iné miesto v okolí.',
    'cx.place.chosen': '{place} · {zone}',
    'cx.keep': 'Ponechať v tomto zariadení',
    'cx.keep.hint': 'Inak sa tento človek po zatvorení karty zabudne.',
    'cx.err.label': 'Pridaj meno, ktoré sa zobrazí.',
    'cx.err.names': 'Treba obe rodné mená.',
    'cx.err.date': 'Zadaj platný dátum narodenia.',
    'cx.err.future': 'Dátum narodenia je v budúcnosti.',
    'cx.err.time': 'Zadaj čas alebo vyber Neznámy.',
    'cx.err.place': 'Vyber miesto narodenia zo zoznamu.',
    'cx.err.adult': 'Táto osoba má osemnásť rokov alebo viac. Pre vzťah dospelých vyber Rodinu.',
    'cx.err.minor': 'Táto osoba je mladšia ako osemnásť rokov. Partnerské a pracovné čítania sú pre dospelých.',
    'menu.synthesis': 'Syntéza',
    'menu.pillarShort.western-astrology': 'Astro',
    'menu.pillarShort.numerology': 'Numero',
    'menu.pillarShort.human-design': 'HD',
    'menu.pillarShort.bazi-tcm': 'BaZi',
    'menu.soon': 'Čoskoro',
    'ui.reviewDetails': 'Skontrolovať údaje',
    'ui.forecast': 'Numerologická predpoveď',
    'ui.nav.previous': 'Predchádzajúce',
    'ui.nav.next': 'Ďalšie',
    'ui.nav.aria': 'Prechod medzi čítaniami',
    'options.theme': 'Téma',
    'options.language': 'Jazyk',
    'options.haptics': 'Vibrácie',
    'options.haptics.on': 'Zapnuté',
    'options.haptics.off': 'Vypnuté',
    'options.colors': 'Farby',
    'options.colors.interface': 'Farba rozhrania',
    'options.colors.earth': 'Žiara Zeme',
    'options.colors.intensity': 'Svietivosť',
    'options.colors.intensityNeedsColor': 'Vyber farbu a jej svietivosť sa dá nastaviť.',
    'options.colors.glass': 'Nepriehľadnosť polí',
    'options.colors.glassClear': 'Priehľadné',
    'options.colors.glassSolid': 'Plné',
    'options.colors.glassDefault': 'Predvolené 15 %',
    'options.colors.transparent': 'Priehľadná',
    'options.colors.default': 'Predvolená',
    'options.colors.family.purple': 'Fialová',
    'options.colors.family.gold': 'Zlatá',
    'options.colors.family.magenta': 'Purpurová',
    'options.colors.family.cyclamen': 'Cyklaménová',
    'options.colors.family.turquoise': 'Tyrkysová',
    'options.colors.family.indigo': 'Indigová',
    'options.colors.family.rose': 'Ružová',
    'options.resetTheme': 'Obnoviť predvolené',
    'options.close': 'Zavrieť možnosti',
    'options.theme.default': 'Podľa schránky',
    'options.theme.neutral': 'Neutrálna',
    'options.theme.blue': 'Modrá',
    'options.theme.rose': 'Ružová',
    'options.theme.gold': 'Zlatá',
    'options.theme.emerald': 'Smaragdová',
    'options.theme.silver': 'Strieborná',
    /* -------------------------------------------------- numerology forecast */
    'fc.kicker': 'Čo je práve teraz v hre',
    'fc.title': 'Výhľad',
    'fc.today': 'Dnes',
    'fc.chooseDate': 'Vyber dátum',
    'fc.prevDay': 'Predchádzajúci deň',
    'fc.nextDay': 'Nasledujúci deň',
    'fc.rail.label': 'Dni v mesiaci',
    'fc.rail.years': 'Roky',
    'fc.yearAria': '{year}, Osobný rok {value}',
    'fc.monthAria': '{month}, Osobný mesiac {value}',
    'fc.rail.months': 'Mesiace',
    'fc.climate.title': 'Pozadie obdobia',
    'fc.climate.personalYear': 'Osobný rok {number} - {keyword}',
    'fc.climate.personalMonth': 'Osobný mesiac {number} - {keyword}',
    'fc.relevantMonths': 'Najvýznamnejšie mesiace',
    'fc.cycleReference': 'Čo číslo {number} znamená vo všeobecnosti',
    'fc.cycleReferenceNote': 'Tradičný význam tohto čísla, rovnaký pre každého, kto ho práve má. Nič z toho, čo je '
        + 'nižšie, nevychádza z tvojej mapy - to, čo je vyššie, áno.',
    'fc.facet.resonance': 'Voči tvojej životnej ceste',
    'fc.cycles.line': 'Rok {year} · Mesiac {month} · Deň {day}',
    'fc.relation.triple': 'Trojitá rezonancia',
    'fc.relation.year-month': 'Rezonancia roka a mesiaca',
    'fc.relation.month-day': 'Rezonancia mesiaca a dňa',
    'fc.relation.year-day': 'Ozvena roka v dni',
    'fc.noMarkers': 'Žiadny mesiac tohto roka nenesie zvláštny znak.',
    'fc.calendarKey': 'Malé číslo pri každom dni je jeho Osobný deň.',
    'fc.dayAria': '{day}, Osobný deň {value}',
    'fc.lunarKicker': 'Tradičné / lunárne usmernenie',
    'fc.lunarHead': '{phase} · osvetlenie {percent} % · {trend}',
    'fc.lunarNote': 'Fáza Mesiaca vypočítaná knižnicou astronomy-engine o 12:00 UTC pre tento dátum.',
    'fc.majorPhase': '{phase} · presne o {time}',
    'fc.majorPhaseNote': 'Presný okamih je rovnaký na celej Zemi; zobrazený čas je v časovom pásme tohto zariadenia.',
    'fc.moonAria': 'Mesiac v tento deň: {phase}, osvetlenie {percent} %',
    'fc.moonCredit': 'Mapa Mesiaca: NASA SVS / LRO',
    'fc.nearlyFull': 'Takmer spln',
    'fc.moonExplore': 'Preskúmať lunárnu predpoveď',
    'fc.moonOpenAria': 'Preskúmať lunárnu predpoveď. Mesiac v tento deň: {phase}, osvetlenie {percent} %',
    'fc.lunarDetailTitle': 'Lunárna predpoveď',
    'fc.lunarBack': 'Späť na predpoveď',
    'fc.lunarDetailDate': 'Mesiac na {date}',
    'fc.nearlyNew': 'Takmer nov',
    'fc.source': 'Zdroj: {source}',
    'fc.method': 'Ako sa to počíta',
    'fc.domains.title': 'Profil dňa',
    'fc.domains.note': 'Každá oblasť ukazuje, ako tento deň vyzerá v porovnaní s bežným dňom.',
    'fc.domains.noteToday': 'Každá oblasť ukazuje, ako dnešok vyzerá v porovnaní s bežným dňom.',
    'fc.domains.aria': '{domain}: {state}, {level} z 5',
    'fc.domain.atmosphere': 'Atmosféra',
    'fc.domain.communication': 'Komunikácia',
    'fc.domain.relationships': 'Vzťahy',
    'fc.domain.private-life': 'Súkromie',
    'fc.domain.work': 'Práca',
    'fc.domainLevel.1': 'Ticho',
    'fc.domainLevel.2': 'Mierne',
    'fc.domainLevel.3': 'Obvykle',
    'fc.domainLevel.4': 'Živo',
    'fc.domainLevel.5': 'Výrazne',
    'fc.level.aria': 'Mierka predpovede',
    'fc.level.year': 'Rok',
    'fc.level.month': 'Mesiac',
    'fc.level.day': 'Deň',
    'fc.period.yearProfile': 'Profil roka',
    'fc.period.yearProfileNote': 'Každá oblasť ukazuje, ako tento rok vyzerá v porovnaní s bežným dňom.',
    'fc.period.monthProfile': 'Profil mesiaca',
    'fc.period.monthProfileNote': 'Každá oblasť ukazuje, ako tento mesiac vyzerá v porovnaní s bežným dňom.',
    'fc.trend.areas': 'Oblasti',
    'fc.trend.showArea': 'Zobraziť oblasť: {area}',
    'fc.trend.prevArea': 'Predchádzajúca oblasť',
    'fc.trend.nextArea': 'Nasledujúca oblasť',
    'fc.trend.openMonth': 'Otvoriť {point}',
    'fc.trend.openDay': 'Otvoriť {point}',
    'fc.trend.valueText': '{point}: {state}',
    'fc.trend.yearAria': '{area} v roku {period}, mesiac po mesiaci',
    'fc.trend.monthAria': '{area}, {period}, deň po dni',
    'fc.trend.hintYear': 'Ťukni na graf a vyber mesiac. Potiahnutím do strany zmeníš oblasť.',
    'fc.trend.hintMonth': 'Ťukni na graf a vyber deň. Potiahnutím do strany zmeníš oblasť.',
    /* ------------------------------------------- predpoveď, obyčajnými slovami -- */
    'fc.timescale.background': 'Dlhodobé pozadie',
    'fc.timescale.year': 'Tento rok',
    'fc.timescale.transits': 'Aktuálne dlhšie tranzity',
    'fc.timescale.month': 'Tento mesiac',
    'fc.timescale.day': 'Tento deň',
    'fc.timescale.today': 'Dnes',
    'fc.name.annual': 'Ročný pilier BaZi {pillar}',
    'fc.name.luck': 'Pilier šťastia BaZi {pillar}',
    'fc.name.transit': '{body} {aspect} {natal}',
    'fc.name.sun': 'Slnko: {sign}',
    'fc.aspect.conjunction': 'v konjunkcii s',
    'fc.aspect.sextile': 'v sextile s',
    'fc.aspect.square': 'v kvadratúre s',
    'fc.aspect.trine': 'v trigóne s',
    'fc.aspect.opposition': 'v opozícii s',
    'fc.natal.sun': 'rodným Slnkom',
    'fc.natal.moon': 'rodným Mesiacom',
    'fc.natal.mercury': 'rodným Merkúrom',
    'fc.natal.venus': 'rodnou Venušou',
    'fc.natal.mars': 'rodným Marsom',
    'fc.when.allYear': 'celý rok',
    'fc.when.allMonth': 'celý mesiac',
    'fc.when.ongoingMonth': 'pretrváva počas celého tohto mesiaca',
    'fc.when.from': 'od {date}',
    'fc.when.until': 'do {date}',
    'fc.when.days': 'v {days} dňoch',
    'fc.x.and': 'a',
    'fc.x.mainClimate': 'Hlavné ladenie',
    'fc.x.supports': 'Čo ho podopiera',
    'fc.x.pulls': 'Kde ťahá samo proti sebe',
    'fc.x.todo': 'Čo s tým robiť',
    'fc.x.bridgeLabel': 'V širšom obraze',
    'fc.x.more': 'Viac o tomto období',
    'fc.x.strongest': 'Najsilnejšie vplyvy',
    'fc.x.mainTension': 'Hlavné napätie',
    'fc.x.todoYear': 'Čo robiť tento rok',
    'fc.x.todoMonth': 'Čo robiť tento mesiac',
    'fc.x.sameAs': 'Rovnaká téma ako {name}, len v kratšom čase.',
    'fc.x.nothing': 'Žiadna téma výrazne nevyčnieva; vplyvy nižšie sú pomerne vyvážené.',
    'fc.x.estimatedTime': 'Čas narodenia nebol zadaný, takže údaje o tranzitoch sú len približné.',
    'fc.x.leadYear': 'Hlavná téma roka {year}: {lean}.',
    'fc.x.leadYearShared': 'Hlavná téma roka {year}: {lean}. Ukazuje tým smerom viac vplyvov naraz.',
    'fc.x.yearPartialOne': 'Tento vplyv BaZi pokrýva iba časť kalendárneho roka: {spans}.',
    'fc.x.yearPartialMany': 'Tieto vplyvy BaZi pokrývajú každý iba časť kalendárneho roka: {spans}.',
    'fc.x.leadPeriod': 'Hlavná téma širšieho obdobia: {lean}.',
    'fc.x.leadPeriodShared': 'Hlavná téma širšieho obdobia: {lean}. Ukazuje tým smerom viac vplyvov naraz.',
    'fc.x.month.with': '{month} ide s hlavným smerom roka. Hlavná téma mesiaca: {lean}.',
    'fc.x.month.against': '{month} pôsobí ako protiváha roka. Hlavná téma mesiaca: {lean}.',
    'fc.x.month.own': '{month} pridáva k roku vlastnú farbu. Hlavná téma mesiaca: {lean}.',
    'fc.x.pullYear': 'Zároveň ťa časť roka ťahá {pull}.',
    'fc.x.pullMonth': 'Zároveň ťa časť mesiaca ťahá {pull}.',
    'fc.x.pullPeriod': 'Zároveň ťa niektoré vplyvy ťahajú {pull}.',
    'fc.x.pullNatal': 'Časť tohto obdobia ide aj proti tvojej vlastnej mape, ktorá ťa ťahá {pull}.',
    'fc.x.tension': 'Jedna časť {period} ťa ťahá {pullA} ({namesA}), iná {pullB} ({namesB}). '
        + 'Zvykne sa to ukázať pri rozhodnutiach, kde sa nedá mať oboje. {balance}',
    'fc.x.tensionNatal': '{period} ťa ťahá {pullA} ({namesA}), tvoja vlastná mapa zase {pullH} ({natal}). '
        + 'Zvykne to pôsobiť skôr ako postrčenie proti zvyku než ako zmena smeru. {balance}',
    'fc.x.periodOf.year': 'tohto roka',
    'fc.x.periodOf.month': 'tohto mesiaca',
    'fc.x.periodOf.period': 'tohto obdobia',
    'fc.x.periodThis.year': 'Tento rok',
    'fc.x.periodThis.month': 'Tento mesiac',
    'fc.x.periodThis.period': 'Toto obdobie',
    'fc.x.dayToday': 'Dnešný deň',
    'fc.x.dayThis': 'Tento deň',
    'fc.x.nowToday': 'dnes',
    'fc.x.nowThis': 'v tento deň',
    /* No {now} in Slovak: the day is already the subject, and the clitic „sa" in
       „dohodni sa" cannot follow a fronted „dnes" without reordering the verb. */
    'fc.x.bridge.with': '{day} ide s dlhším obdobím okolo seba, nie proti nemu: {act}. Zvyčajne to posunie dopredu '
        + 'hlavnú tému tohto obdobia, ktorou je {lean}.',
    'fc.x.bridge.against': '{day} môže byť {tone} než dlhšie obdobie okolo neho. Využi ten kontrast namiesto boja '
        + 's ním: {act} a potom sa vráť k hlavnej téme tohto obdobia, ktorou je {lean}.',
    'fc.x.bridge.own': '{day} dodáva dlhšiemu obdobiu okolo seba vlastný odtieň: {act}. Hlavná téma tohto obdobia – '
        + '{lean} – zvyčajne zostáva v pozadí.',
    'fc.x.methodYear': 'Profil roka: každý deň roka {year}, prečítaný rovnako ako v zobrazení dňa; každý bod grafu '
        + 'je daný mesiac sám za seba. Zhrnutie a vplyvy vychádzajú zo všetkého, čo počas roka platí, '
        + 'a každý vplyv váži podľa počtu dní, ktoré pokrýva - nie podľa jedného vzorového dátumu.',
    'fc.x.methodMonth': 'Profil a graf mesiaca: každý deň mesiaca, prečítaný rovnako ako v zobrazení dňa - profil '
        + 'je priemer grafu. Zhrnutie a vplyvy vychádzajú zo všetkého, čo počas mesiaca platí, a každý '
        + 'vplyv váži podľa počtu dní, ktoré pokrýva.',
    'fc.x.methodDay': 'Všetko, čo v tento deň platí, zoskupené podľa toho, ako dlho to trvá. Dlhšie vplyvy vážia '
        + 'viac než krátke, takže jeden deň môže obdobie zafarbiť, ale nikdy ho neurčuje.',
    'fc.x.activeDays': 'platí {days} z {total} dní',
    'fc.lean.introspective': 'premýšľanie a práca so sebou',
    'fc.lean.outwardly-engaged': 'aktivita navonok a zapájanie sa',
    'fc.lean.analytical': 'dôkladný rozbor',
    'fc.lean.intuitive': 'dôvera vo vlastný inštinkt',
    'fc.lean.independent': 'konanie podľa vlastných pravidiel',
    'fc.lean.collaborative': 'spolupráca s inými ľuďmi',
    'fc.lean.structured': 'štruktúra a pravidelnosť',
    'fc.lean.adaptable': 'pružnosť a prispôsobovanie sa za pochodu',
    'fc.lean.cautious': 'opatrnosť a starostlivý výber',
    'fc.lean.risk-oriented': 'odvaha riskovať',
    'fc.lean.emotionally-expressive': 'dávanie citov najavo',
    'fc.lean.emotionally-contained': 'pokojné zvládanie citov',
    'fc.lean.private': 'súkromie a čas pre seba',
    'fc.lean.social': 'spoločnosť a čas s ľuďmi',
    'fc.lean.stability-seeking': 'stabilita a udržanie toho, čo funguje',
    'fc.lean.novelty-seeking': 'nové začiatky a zmena',
    'fc.lean.assertive': 'preberanie iniciatívy',
    'fc.lean.receptive': 'trpezlivosť a čakanie na správnu chvíľu',
    'fc.lean.practical': 'praktická práca',
    'fc.lean.conceptual': 'nápady a plánovanie',
    'fc.lean.creative': 'tvorba niečoho nového',
    'fc.lean.persistent': 'vytrvalosť a dotiahnutie vecí do konca',
    'fc.lean.emotionally-sensitive': 'citlivosť na ľudí a atmosféru',
    'fc.lean.communicative': 'rozprávanie, písanie a vysvetľovanie',
    'fc.pull.introspective': 'dovnútra, k premýšľaniu',
    'fc.pull.outwardly-engaged': 'von, k činom a zapájaniu sa',
    'fc.pull.analytical': 'k dôkladnému rozboru',
    'fc.pull.intuitive': 'k dôvere vo vlastný inštinkt',
    'fc.pull.independent': 'k vlastnej ceste',
    'fc.pull.collaborative': 'k spolupráci s druhými',
    'fc.pull.structured': 'k štruktúre a pravidelnosti',
    'fc.pull.adaptable': 'k pružnosti',
    'fc.pull.cautious': 'k opatrnosti',
    'fc.pull.risk-oriented': 'k riskovaniu',
    'fc.pull.emotionally-expressive': 'k dávaniu citov najavo',
    'fc.pull.emotionally-contained': 'k zdržanlivosti v citoch',
    'fc.pull.private': 'k súkromiu',
    'fc.pull.social': 'k ľuďom',
    'fc.pull.stability-seeking': 'k stabilite',
    'fc.pull.novelty-seeking': 'k zmene a novým veciam',
    'fc.pull.assertive': 'k činom a iniciatíve',
    'fc.pull.receptive': 'k trpezlivosti a k podpore od druhých',
    'fc.pull.practical': 'k praktickým veciam',
    'fc.pull.conceptual': 'k nápadom a plánovaniu',
    'fc.pull.creative': 'k tvorbe',
    'fc.pull.persistent': 'k vytrvalosti',
    'fc.pull.emotionally-sensitive': 'k citlivosti',
    'fc.pull.communicative': 'k rozhovoru',
    'fc.balance.inner-focus': 'Činy navonok fungujú najlepšie, keď ich vyvažuje čas na premýšľanie.',
    'fc.balance.reasoning': 'Pred rozhodnutím over inštinkt faktami.',
    'fc.balance.autonomy': 'Rozlíš, o čom môžeš rozhodnúť bez druhých a čo ich potrebuje.',
    'fc.balance.structure': 'Drž sa plánu, ale nechaj si priestor ho zmeniť.',
    'fc.balance.risk': 'Riskuj tam, kde je možná strata malá, a inde postupuj opatrne.',
    'fc.balance.emotional-expression': 'Povedz, na čom záleží, ale vyber si správnu chvíľu.',
    'fc.balance.visibility': 'Vyvažuj čas s ľuďmi časom pre seba.',
    'fc.balance.change': 'Zmeň, čo treba zmeniť, a nechaj, čo už funguje.',
    'fc.balance.initiative': 'Urob ďalší krok tam, kde rozhoduješ ty; tam, kde záleží na tom, kedy sa rozhodne niekto iný, nechaj mu priestor odpovedať.',
    'fc.balance.abstraction': 'Premysli to a potom to uveď do praxe.',
    'fc.guideYear.introspective': 'Nájdi si tento rok pravidelný čas na odstup a premýšľanie pred veľkými rozhodnutiami.',
    'fc.guideYear.outwardly-engaged': 'Hovor tento rok častejšie áno zapojeniu sa navonok: projektom, ľuďom a miestam.',
    'fc.guideYear.analytical': 'Dôležité rozhodnutia tohto roka staviaj na overených faktoch.',
    'fc.guideYear.intuitive': 'Daj tento rok prvým dojmom väčšiu váhu a potom ich over faktami.',
    'fc.guideYear.independent': 'Rozhodni sa, čo chceš tento rok budovať po svojom, a nečakaj na povolenie.',
    'fc.guideYear.collaborative': 'Postav tento rok na správnych ľuďoch a včas sa s nimi dohodni na úlohách.',
    'fc.guideYear.structured': 'Vybuduj tento rok rutiny, ktoré ťa ponesú aj budúci rok.',
    'fc.guideYear.adaptable': 'Nechaj si plány na tento rok pružné a každých pár mesiacov ich prehodnoť.',
    'fc.guideYear.cautious': 'Vezmi si tento rok menej záväzkov a pri každom najprv zváž riziká.',
    'fc.guideYear.risk-oriented': 'Podstúp tento rok jedno dobre zvolené riziko namiesto čakania na istotu.',
    'fc.guideYear.emotionally-expressive': 'Hovor tento rok o pocitoch skôr, namiesto toho, aby sa hromadili.',
    'fc.guideYear.emotionally-contained': 'Daj tento rok silným pocitom čas, skôr než podľa nich budeš konať.',
    'fc.guideYear.private': 'Chráň si tento rok čas pre seba a plány zdieľaj až vtedy, keď sú hotové.',
    'fc.guideYear.social': 'Investuj tento rok do kontaktov, lebo noví ľudia znamenajú viac než inokedy.',
    'fc.guideYear.stability-seeking': 'Posilni tento rok to, čo už funguje, skôr než pridáš niečo nové.',
    'fc.guideYear.novelty-seeking': 'Vyber si jeden nový smer, na ktorom tento rok najviac záleží, a zaviaž sa k nemu včas.',
    'fc.guideYear.assertive': 'Prevezmi tento rok vedenie v tom, na čom ti najviac záleží, a kľúčové rozhodnutia urob ty.',
    'fc.guideYear.receptive': 'Nechaj príležitosti tohto roka prichádzať a dobre na ne reaguj namiesto tlačenia.',
    'fc.guideYear.practical': 'Premeň plány tohto roka na konkrétne, merateľné výsledky.',
    'fc.guideYear.conceptual': 'Venuj tento rok čas celkovému obrazu: plánom, nápadom a smerovaniu.',
    'fc.guideYear.creative': 'Urob si tento rok priestor na projekt, v ktorom tvoríš niečo vlastné.',
    'fc.guideYear.persistent': 'Vyber si tento rok zopár vecí, ktoré stojí za to dokončiť, a dotiahni ich.',
    'fc.guideYear.emotionally-sensitive': 'Všímaj si tento rok, ako sa majú ľudia okolo teba, a prispôsob sa.',
    'fc.guideYear.communicative': 'Dostaň tento rok svoje myšlienky do slov: píš, prezentuj a vysvetľuj.',
    'fc.guideMonth.introspective': 'Nechaj si tento mesiac v kalendári viac voľna a priestor na premýšľanie.',
    'fc.guideMonth.outwardly-engaged': 'Tento mesiac sa zapájaj a nezostávaj len pri pozorovaní zboku.',
    'fc.guideMonth.analytical': 'Skôr než sa tento mesiac k niečomu zaviažeš, dvakrát skontroluj čísla a detaily.',
    'fc.guideMonth.intuitive': 'Všímaj si tento mesiac prvé reakcie, lebo často predbehnú úvahy.',
    'fc.guideMonth.independent': 'Urob tento mesiac jedno rozhodnutie bez čakania na súhlas všetkých.',
    'fc.guideMonth.collaborative': 'Zapoj tento mesiac kľúčových ľudí včas a dohodni sa s nimi, kto čo robí.',
    'fc.guideMonth.structured': 'Zaveď tento mesiac jednu rutinu alebo systém a drž sa ho.',
    'fc.guideMonth.adaptable': 'Nechaj si v plánoch na tento mesiac rezervu, lebo úpravy sú pravdepodobné.',
    'fc.guideMonth.cautious': 'S veľkými záväzkami tento mesiac počkaj, kým nezvážiš riziká.',
    'fc.guideMonth.risk-oriented': 'Ak sa tento mesiac objaví príležitosť, vyskúšaj ju malým prvým krokom.',
    'fc.guideMonth.emotionally-expressive': 'Otvor tento mesiac úprimný rozhovor namiesto ďalšieho odkladania.',
    'fc.guideMonth.emotionally-contained': 'Emotívne rozhodnutia nechaj tento mesiac vyležať do rána.',
    'fc.guideMonth.private': 'Niektoré plány si tento mesiac nechaj pre seba, kým nie sú hotové.',
    'fc.guideMonth.social': 'Hovor tento mesiac áno stretnutiam a pozvaniam.',
    'fc.guideMonth.stability-seeking': 'Tento mesiac upevňuj: dokonči, oprav a zabezpeč, až potom rozširuj.',
    'fc.guideMonth.novelty-seeking': 'Urob tento mesiac prvý konkrétny krok k niečomu novému namiesto ďalšieho plánovania.',
    'fc.guideMonth.novelty-seeking-partnership': 'Tento mesiac zároveň zdôrazňuje spoluprácu. Ak chceš skúsiť niečo nové, začni malým krokom a prediskutuj ho s ľuďmi, ktorých sa týka.',
    'fc.guideMonth.assertive': 'Prevezmi tento mesiac iniciatívu: rozhodni namiesto čakania, kým ťa niekto vyzve.',
    'fc.guideMonth.receptive': 'Počkaj tento mesiac na správnu chvíľu a keď príde, chop sa jej.',
    'fc.guideMonth.practical': 'Vyber si tento mesiac jednu praktickú úlohu a dotiahni ju úplne do konca.',
    'fc.guideMonth.conceptual': 'Spíš si tento mesiac plán skôr, než začneš pracovať.',
    'fc.guideMonth.creative': 'Daj tento mesiac jednému tvorivému nápadu skutočný pracovný čas.',
    'fc.guideMonth.persistent': 'Zostaň tento mesiac pri jednej rozrobenej úlohe, kým nie je hotová.',
    'fc.guideMonth.emotionally-sensitive': 'Ozvi sa tento mesiac ľuďom, ktorí sú ti blízki.',
    'fc.guideMonth.communicative': 'Veď tento mesiac dôležité rozhovory namiesto domnienok.',
    'fc.dayTone.1': 'rozhodnejší a samostatnejší',
    'fc.dayTone.2': 'pomalší a viac naladený na spoluprácu',
    'fc.dayTone.3': 'zhovorčivejší a spoločenskejší',
    'fc.dayTone.4': 'pokojnejší a metodickejší',
    'fc.dayTone.5': 'nepokojnejší a premenlivejší',
    'fc.dayTone.6': 'viac zameraný na povinnosti a blízkych ľudí',
    'fc.dayTone.7': 'tichší a premýšľavejší',
    'fc.dayTone.8': 'náročnejší a viac zameraný na výsledky',
    'fc.dayTone.9': 'viac o dokončovaní',
    'fc.dayAct.1': 'rozhodni sa a začni',
    'fc.dayAct.2': 'dohodni sa a počúvaj',
    'fc.dayAct.3': 'prebri veci s ostatnými',
    'fc.dayAct.4': 'pracuj sústavne a po poriadku',
    'fc.dayAct.5': 'nechaj si priestor na zmeny',
    'fc.dayAct.6': 'postaraj sa o svoje záväzky',
    'fc.dayAct.7': 'premýšľaj a prehodnocuj',
    'fc.dayAct.8': 'dotiahni jeden výsledok do konkrétnej podoby',
    'fc.dayAct.9': 'dokonči a uprac',
    'fc.methodBody': 'Osobný rok = mesiac narodenia + deň narodenia + kalendárny rok, po redukcii. '
        + 'Osobný mesiac = Osobný rok + mesiac, po redukcii. Osobný deň = Osobný mesiac '
        + '+ deň, po redukcii. Postup je pri každej časti uvedený nad ňou. Osobný rok platí '
        + 'od 1. januára do 31. decembra – je to kalendárny rok, nie rok od narodenín. Ročný '
        + 'pilier BaZi sa mení až v Li Chun, v prvých dňoch februára, takže v prvých týždňoch '
        + 'januára ešte platí predchádzajúci rok BaZi.',
    'fc.needBirthDate': 'Predpoveď potrebuje dátum narodenia. Doplň ho v časti Skontrolovať údaje a '
        + 'výpočet prebehne sám.',
    'fc.badge.year': 'Osobný rok {year}',
    'fc.badge.month': 'Osobný mesiac · {month} {year}',
    'fc.badge.day': 'Osobný deň · {label}',
    'fc.facet.year.opportunities': 'Príležitosti',
    'fc.facet.year.cautions': 'Na čo si dať pozor',
    'fc.facet.year.work': 'Práca a kariéra',
    'fc.facet.year.money': 'Peniaze',
    'fc.facet.year.relationships': 'Vzťahy',
    'fc.facet.year.family': 'Rodina a domov',
    'fc.facet.year.development': 'Osobný rozvoj',
    'fc.facet.year.goodToStart': 'Dobré začať',
    'fc.facet.year.betterToFinish': 'Lepšie dokončiť',
    'fc.facet.year.doNotForce': 'Netlač na',
    'fc.facet.month.tone': 'Citové a praktické ladenie',
    'fc.facet.month.focus': 'Na čo sa sústrediť',
    'fc.facet.month.work': 'Práca a kariéra',
    'fc.facet.month.money': 'Peniaze',
    'fc.facet.month.relationships': 'Vzťahy',
    'fc.facet.month.family': 'Rodina',
    'fc.facet.month.creativity': 'Tvorivosť',
    'fc.facet.month.rest': 'Odpočinok a regenerácia',
    'fc.facet.month.decisions': 'Rozhodnutia',
    'fc.facet.month.social': 'Spoločenský život',
    'fc.facet.month.favorable': 'Priaznivé kroky',
    'fc.facet.month.caution': 'Na čo si dať pozor',
    'fc.trace.birthMonth': 'Mesiac narodenia',
    'fc.trace.birthDay': 'Deň narodenia',
    'fc.trace.calendarYear': 'Kalendárny rok',
    'fc.trace.personalYear': 'Osobný rok',
    'fc.trace.calendarMonth': 'Kalendárny mesiac',
    'fc.trace.personalMonth': 'Osobný mesiac',
    'fc.trace.dayOfMonth': 'Deň v mesiaci',
    'fc.facet.favorable': 'Priaznivé kroky',
    'fc.facet.cautions': 'Na čo si dať pozor',
    'fc.facet.work': 'Práca',
    'fc.facet.communication': 'Komunikácia',
    'fc.facet.relationships': 'Vzťahy',
    'fc.facet.planning': 'Plánovanie',
    'fc.facet.rest': 'Odpočinok',
    'fc.facet.practical': 'Praktické úlohy',
    'fc.facet.pace': 'Tempo a intenzita',
    /* Second person singular on purpose: the rest of the flow addresses the
       reader formally, but this is the one moment the experience speaks to
       them rather than asking them something. */
    'onb.intro.incarnation': 'Tvoja duša vstupuje do hmoty',
    /* Locative case, with the preposition that sign actually takes. */
    'zodiac.in.aries': 'v Baranovi',
    'zodiac.in.taurus': 'v Býkovi',
    'zodiac.in.gemini': 'v Blížencoch',
    'zodiac.in.cancer': 'v Rakovi',
    'zodiac.in.leo': 'v Levovi',
    'zodiac.in.virgo': 'v Panne',
    'zodiac.in.libra': 'vo Váhach',
    'zodiac.in.scorpio': 'v Škorpiónovi',
    'zodiac.in.sagittarius': 'v Strelcovi',
    'zodiac.in.capricorn': 'v Kozorožcovi',
    'zodiac.in.aquarius': 'vo Vodnárovi',
    'zodiac.in.pisces': 'v Rybách',
    'pillar.numerology.title': 'Numerológia',
    'pillar.numerology.eyebrow': 'Deterministická štruktúra mena a dátumu',
    'pillar.numerology.output': 'Životná cesta',
    'pillar.western-astrology.title': 'Západná astrológia',
    'pillar.western-astrology.eyebrow': 'Vypočítané z určeného momentu narodenia',
    'pillar.western-astrology.output': 'Slnko',
    'pillar.bazi-tcm.title': 'BaZi / TČM',
    'pillar.bazi-tcm.eyebrow': 'Vypočítaná štruktúra štyroch pilierov a piatich fáz',
    'pillar.bazi-tcm.output': 'Pilier roka',
    'pillar.human-design.title': 'Human Design',
    'pillar.human-design.eyebrow': 'Vypočítaná mechanika brán, kanálov a centier',
    'pillar.human-design.output': 'Typ',
    'pillar.status.calculatedLocally': 'Vypočítané lokálne',
    'pillar.status.unavailable': 'Nedostupné',
    'synthesis.card.convergence': 'Najsilnejšia zhoda',
    'synthesis.card.agreement': 'Zhoda: {count} zo štyroch systémov',
    'synthesis.card.noConvergence': 'Obmedzené: systémy sa nezhodujú',
    /* Sign, stem, branch, Type and Profile values arrive from the engines in
       English and stay that way, so a translated value would not match the
       technical appendix beside it. Only the frame around them is translated. */
    'chart.unavailableUntilMoment': 'Tento diagram nie je dostupný, kým sa nedá normalizovať moment narodenia.',
    'chart.astro.aria': 'Natálny kruh západnej astrológie',
    'chart.astro.ariaSuppressed': 'Natálny kruh západnej astrológie bez domov a osí, lebo čas narodenia nebol zadaný',
    'chart.astro.unavailableAria': 'Kruh západnej astrológie, nedostupný',
    'chart.astro.suppressedLabel': 'Čas narodenia nebol zadaný, preto sú domy, osi a vládca mapy vynechané.',
    'chart.astro.suppressedCta': 'Doplň čas narodenia, aj odhadovaný, a vypočíta sa ascendent, medium coeli, domy aj vládca mapy.',
    'time.unknownFallbackNotice': 'Presný čas narodenia nie je známy. Výpočty používajú 12:00 miestneho času v deň narodenia len ako referenčný bod: čo závisí od hodiny, sa vynecháva alebo ukazuje pre celý deň, nikdy sa nečíta z tohto referenčného bodu.',
    'chart.astro.footer': 'Celoznamenkové domy · Ascendent {ascendant} · {count} hlavných aspektov',
    'chart.astro.footerEstimated': 'Celoznamenkové domy · Ascendent {ascendant} z odhadovaného času · {count} hlavných aspektov',
    'chart.astro.adv.title': 'Rozšírený kruh',
    'chart.astro.adv.aria': 'Ovládanie rozšíreného kruhu',
    'chart.astro.adv.groupObjects': 'Telesá',
    'chart.astro.adv.groupAspects': 'Aspekty',
    'chart.astro.adv.groupHouses': 'Domy',
    'chart.astro.adv.groupDisplay': 'Zobrazenie',
    'chart.astro.adv.lunarNodes': 'Lunárne uzly',
    'chart.astro.adv.majorAspects': 'Hlavné aspekty',
    'chart.astro.adv.minorAspects': 'Vedľajšie aspekty',
    'chart.astro.adv.minorHint': 'Tenké prerušované: 30°, 45°, 135°, 150°',
    'chart.astro.adv.houseNumbers': 'Čísla domov',
    'chart.astro.adv.degreeLabels': 'Stupne pri telesách',
    'chart.astro.adv.retrogradeMarkers': 'Značky retrográdnosti',
    'chart.astro.adv.houseSystem': 'Systém domov',
    'chart.astro.adv.system.whole-sign': 'Celé znamenia (Whole Sign)',
    'chart.astro.adv.system.equal': 'Rovnaké domy (Equal House)',
    'chart.astro.adv.system.porphyry': 'Porfyrov systém (Porphyry)',
    'chart.astro.adv.system.placidus': 'Placidus',
    'chart.astro.adv.houseNote': 'Na tomto kruhu skúmaš domy v systéme {system}. Výklad aj hlavné Technické podrobnosti zostávajú v systéme celé znamenia (Whole Sign); ostatné systémy sú uvedené v Technických podrobnostiach.',
    'chart.astro.adv.needTime': 'Vedľajšie aspekty a ďalšie systémy domov sa počítajú pre presný čas narodenia.',
    'chart.astro.adv.reset': 'Späť na štandardný kruh',
    'chart.astro.footerExplore': 'Domy v systéme {system}, na skúmanie · Ascendent {ascendant} · {count} hlavných aspektov',
    'chart.astro.footerMinor': 'Zobrazené vedľajšie aspekty: {count}',
    'chart.bazi.wheelAria': 'Kruh piatich fáz',
    'chart.bazi.wheelUnavailableAria': 'Kruh piatich fáz, nedostupný',
    'chart.bazi.wheelFullAria': 'Kruh plodivého a ovládacieho cyklu piatich fáz so zvýrazneným Day Master {element}',
    'chart.bazi.wheelNote': 'Veľkosť uzla = surový viditeľný počet. Fáza Day Master ({element}) je zvýraznená zlatou. '
        + 'Plná zlatá = plodivý cyklus; prerušovaná červená = ovládací cyklus.',
    'chart.bazi.nodeTitle': '{phase}: {count} započítaných pozícií',
    'chart.bazi.nodeTitleDayMaster': '{phase}: {count} započítaných pozícií (fáza Day Master)',
    'chart.bazi.arcAria': 'Prstenec sezónnej vlády',
    'chart.bazi.arcUnavailableAria': 'Sezónny oblúk, nedostupný',
    'chart.bazi.arcFullAria': 'Prstenec sezónnej vlády pre Day Master {element}, zvýraznený mesiac narodenia {branch}',
    'chart.bazi.arcNote': 'Odtieň každého mesiaca ukazuje, ako sezónne podporený by bol Day Master ({element}), '
        + 'keby tento mesiac vládol mape. Zlatý obrys = skutočný mesiac narodenia ({branch}).',
    'chart.bazi.sectorTitle': 'Mesiac {branch} ({animal}): Day Master ({element}) by bol sezónne {state}',
    'chart.bazi.sectorTitleActive': 'Mesiac {branch} ({animal}): Day Master ({element}) by bol sezónne {state} '
        + '— toto je skutočný mesiac narodenia',
    'chart.bazi.dayMaster': 'Day Master',
    'bazi.sheet.back': 'Späť na {title}',
    'bazi.sheet.previousTopic': 'predchádzajúcu tému',
    'bazi.sheet.englishOnly': 'Tieto vysvetlenia sú zatiaľ len v angličtine.',
    'bazi.sheet.personal': 'Vo tvojej mape',
    'bazi.sheet.explore': 'Preskúmať ďalej',
    'bazi.sheet.yourMonth': 'Tvoj mesiac narodenia',
    'bazi.sheet.yourAnimal': 'Tvoje zviera roka',
    'bazi.sheet.yourDayMaster': 'Tvoj Day Master',
    'bazi.legend.cyclesAria': 'Preskúmať cykly a čísla',
    'bazi.legend.generating': 'Plodivý cyklus',
    'bazi.legend.controlling': 'Ovládací cyklus',
    'bazi.legend.numbers': 'Čo čísla počítajú',
    'bazi.legend.wheelAria': 'Preskúmať sezónne koleso',
    'bazi.legend.goldenPetal': 'Zlatý lupienok',
    'bazi.legend.seasonal': 'Sezónna podpora',
    'bazi.legend.months': 'Všetkých dvanásť mesiacov',
    'bazi.aria.open': '{subject}. Otvoriť vysvetlenie.',
    'numerology.orbit.open': '{subject} {value}: otvoriť význam',
    'numerology.sheet.strengths': 'Silné stránky',
    'numerology.sheet.tensions': 'Napätia',
    'numerology.sheet.shows': 'Ako sa to môže prejaviť',
    'numerology.sheet.question': 'Otázka na zamyslenie',
    'numerology.sheet.footer': 'Symbolické čítanie na zamyslenie, nie meranie ani predpoveď.',
    'numerology.sheet.pos.life-path': 'Životná cesta',
    'numerology.sheet.pos.expression': 'Vyjadrenie',
    'numerology.sheet.pos.soul-urge': 'Túžba duše',
    'numerology.sheet.pos.personality': 'Osobnosť',
    'numerology.sheet.ask.life-path': 'Dlhý tvar života',
    'numerology.sheet.ask.expression': 'S čím prichádzaš',
    'numerology.sheet.ask.soul-urge': 'Čo ti súkromne dáva zmysel',
    'numerology.sheet.ask.personality': 'Čo ľudia stretnú ako prvé',
    'bazi.aria.feeds': '{from} živí {to}. Otvoriť vysvetlenie.',
    'bazi.aria.regulates': '{from} usmerňuje {to}. Otvoriť vysvetlenie.',
    'bazi.aria.orb': '{element}, počet {count}. Otvoriť vysvetlenie.',
    'bazi.aria.orbDayMaster': '{element}, počet {count}, živel tvojho Day Master. Otvoriť vysvetlenie.',
    'bazi.aria.petal': 'Mesiac {branch}, zviera {animal}. Otvoriť vysvetlenie.',
    'bazi.aria.petalBirth': 'Mesiac {branch}, zviera {animal}, tvoj mesiac narodenia. Otvoriť vysvetlenie.',
    'bazi.aria.disc': 'Day Master {polarity} {element}. Otvoriť vysvetlenie.',
    'chart.hd.aria': 'Human Design BodyGraph',
    'chart.hd.ariaSuppressed': 'Human Design BodyGraph, mechanika sa neuvádza, lebo čas narodenia nebol zadaný',
    'chart.hd.suppressedLabel': 'Mechanika Human Design sa neuvádza, lebo čas narodenia nebol zadaný.',
    'chart.hd.ariaEnvelope': 'Human Design BodyGraph pre celý deň narodenia: zobrazené je len to, čo platí v každej jeho hodine',
    'chart.hd.envelopeLabel': 'Čas narodenia nebol zadaný, preto tento BodyGraph ukazuje len to, čo platí v každej hodine dňa narodenia.',
    'chart.hd.envelopeNote': 'Sivé centrá závisia od hodiny narodenia. Kanály a brány svietia len tam, kde platia celý deň.',
    'chart.hd.envelopeCta': 'Zaznamenaný čas narodenia by mapu doplnil.',
    'chart.hd.suppressedCta': 'Doplň presný čas narodenia a vypočíta sa typ, autorita, profil, centrá, kanály aj brány.',
    'chart.hd.footer': '{type} · Profil {profile} · {count} definovaných centier',
    'chart.hd.design': 'Design',
    'chart.hd.designSub': 'Nevedomé · ~88° pred narodením',
    'chart.hd.personality': 'Personality',
    'chart.hd.personalitySub': 'Vedomé · moment narodenia',
    'chart.hd.activationsAria': 'Planetárne aktivácie',
    'chart.hd.showActivations': 'Zobraziť planetárne aktivácie',
    'chart.hd.showBodygraph': 'Zobraziť BodyGraph',
    'chart.hd.deckHint': 'Ťuknutím prepneš karty',
    'chart.hd.centerAria': 'Centrum {center}: {state}. Otvorí vysvetlenie.',
    'chart.hd.centerState.defined': 'definované',
    'chart.hd.centerState.open': 'otvorené',
    'chart.hd.centerState.uncertain': 'bez času narodenia neisté',
    'chart.hd.scrollCue': 'Posunúť nadol k výkladu',
    'chart.unavailableValue': 'Nedostupné',
    'map.previewEyebrow': 'NÁHĽAD MAPY',
    'map.previewTitle': 'Načítava sa hybridná mapa.',
    'map.previewNote': 'Kým nezadáš súradnice alebo neklepneš na mapu, nie je vybrané žiadne miesto.',
    'map.unavailableEyebrow': 'MAPA NEDOSTUPNÁ',
    'map.unavailableTitle': 'Hybridnú mapu sa nepodarilo načítať.',
    'map.unavailableNote': 'Skontroluj obmedzenia kľúča prehliadača a pripojenie k sieti. Súradnice zostali nezmenené.',
    'concept.aria': 'čo to znamená v systéme',
    'concept.fallbackNote': 'Toto vysvetlenie zatiaľ nie je preložené, preto sa zobrazuje po anglicky.',
    /* --------------------------------------------------------- onboarding --
       Written with real characters rather than \u escapes: the first attempt used
       escapes and shipped two silent defects - a malformed \u010salej, and an 'a'
       that was actually the Cyrillic \u0430. Diacritics are the content here, so
       they are written as content. */
    'onb.search.question': 'Kde sa začne tvoj príbeh?',
    'onb.search.placeholder': 'Zadaj miesto narodenia',
    'onb.search.aria': 'Vyhľadať miesto narodenia',
    'onb.search.submit': 'Hľadať',
    'onb.suggestions.aria': 'Návrhy miest narodenia',
    'onb.earth.aria': 'Zem, ktorá sa pomaly otáča za stránkou. Miesto narodenia vyhľadaj nižšie.',
    'onb.birthplace.label': 'Miesto narodenia',
    'onb.birthplace.confirm': 'Potvrdiť',
    'onb.birthplace.change': 'Zmeniť',
    'onb.birthplace.chooseAnother': 'Vybrať iné',
    'onb.birthplace.aria': 'Vyber a potvrď miesto narodenia',
    'onb.birthplace.confirmed': 'Miesto narodenia potvrdené',
    'onb.birthplace.restored': 'Miesto narodenia je obnovené. Môžeš ho upraviť alebo znova potvrdiť.',
    'onb.vessel.title': 'Vyber si telo',
    'onb.vessel.question': 'Do akého tela vstupuješ?',
    'onb.vessel.aria': 'Vyber telo, do ktorého vstupuješ',
    'onb.vessel.male': 'Muž',
    'onb.vessel.female': 'Žena',
    'onb.vessel.undefined': 'Neurčovať',
    'onb.vessel.confirm': 'Prijať telo',
    'onb.vessel.confirmed': 'Schránka potvrdená',
    'onb.vessel.hint': 'Vyber telo, do ktorého vstupuješ.',
    'onb.vessel.backAria': 'Späť na výber schránky',
    'onb.identity.kicker': '03 · Identita',
    /* „Kým budeš?“ is correct Slovak and reads as the conjunction „kým“ on
       first pass - „while you will be“. This screen collects the birth name,
       so it asks for the birth name, which is also what the English poem is
       doing underneath its rhetoric. */
    'onb.identity.title': 'Aké meno si prinášaš?',
    'onb.identity.birthName': 'Rodné meno',
    'onb.identity.birthSurname': 'Rodné priezvisko',
    'onb.identity.namePlaceholder': 'Rodné meno',
    'onb.identity.surnamePlaceholder': 'Rodné priezvisko',
    'onb.identity.needName': 'Zadaj svoje rodné meno a rodné priezvisko.',
    'onb.arrival.kicker': '04 · Príchod',
    'onb.arrival.title': 'V akom okamihu prichádzaš na Zem?',
    'onb.arrival.date': 'Dátum príchodu',
    'onb.arrival.time': 'Čas príchodu',
    'onb.arrival.chooseDate': 'Vyber dátum',
    'onb.arrival.chooseTime': 'Vyber čas',
    'onb.arrival.backAria': 'Späť na príchod',
    'onb.arrival.editHint': 'Uprav dátum alebo čas svojho príchodu na Zem.',
    'onb.flow.aria': 'Identita a príchod',
    'onb.picker.year': 'Rok',
    'onb.picker.month': 'Mesiac',
    'onb.picker.hour': 'Hodina',
    'onb.picker.minute': 'Minúta',
    'onb.picker.changeYear': 'Zmeniť rok',
    'onb.picker.prevYear': 'Predchádzajúci rok',
    'onb.picker.nextYear': 'Nasledujúci rok',
    'onb.picker.prevMonth': 'Predchádzajúci mesiac',
    'onb.picker.nextMonth': 'Nasledujúci mesiac',
    'onb.picker.chooseMonth': 'Vyber mesiac',
    'onb.picker.chooseDay': 'Vyber deň',
    'onb.picker.selectedDate': 'Vybraný dátum',
    'onb.picker.timeCaption': '24-hodinový čas · píšte priamo',
    'onb.picker.hourAria': 'Hodina od 00 do 23',
    'onb.picker.minuteAria': 'Minúta od 00 do 59',
    'onb.picker.quickMinutes': 'Rýchly výber minút',
    'onb.picker.selectedTime': 'Vybraný čas',
    'onb.picker.confirmTime': 'Potvrdiť čas',
    'onb.picker.unknownTime': 'Nepoznám svoj čas narodenia',
    'onb.review.title': 'Skontroluj svoje údaje',
    'onb.review.aria': 'Kontrola údajov profilu',
    'onb.review.name': 'Meno',
    'onb.review.dateOfBirth': 'Dátum narodenia',
    'onb.review.timeOfBirth': 'Čas narodenia',
    'onb.review.placeOfBirth': 'Miesto narodenia',
    'onb.review.vessel': 'Schránka',
    'onb.review.flowAria': 'Identita, príchod a záverečný prehľad',
    'onb.action.back': 'Späť',
    'onb.action.next': 'Ďalej',
    'onb.action.cancel': 'Zrušiť',
    /* A confirm button, so the natural Slovak is "done" rather than the borrowed "OK". */
    'onb.action.ok': 'Hotovo',
    'onb.action.confirm': 'Potvrdiť',
    'onb.action.confirmAria': 'Potvrdiť profil',
    'onb.action.createProfile': 'Vytvoriť profil',
    'onb.complete.kicker': 'Profil je pripravený',
    'onb.complete.title': 'Tvoja prvá mapa je pripravená.',
    'onb.complete.copy': 'Tvoja identita, schránka a okamih príchodu sú prepojené.',
    'onb.status.earthReady': 'Interaktívna Zem je pripravená. Môžeš hľadať alebo si prezrieť glóbus.',
    'onb.status.searching': 'Hľadám miesta.',
    'onb.status.lookingUp': 'Zisťujem vybraný bod na mape.',
    'onb.vessel.kicker': '02 · Schránka',
    'onb.vessel.nonbinary': 'Nebinárne',
    'onb.vessel.ratherNotDefine': 'Radšej to nedefinujem',
    'onb.vessel.orbitInstructions': 'Ťahaním po obežnej dráhe otáčaš výber schránok. Klepnutím schránku vyberieš.',
    'onb.status.earthUnavailable': 'Zobrazenie Zeme nie je dostupné. Vyhľadávanie miesta narodenia zostáva dostupné.',
    'onb.status.earthRestored': 'Zobrazenie Zeme obnovené. Vyhľadaj a vyber miesto narodenia.',
    'onb.status.timezoneUnresolved': 'Miesto je vybrané, ale jeho časové pásmo sa nepodarilo určiť.',
    'onb.status.placeConfirmed': 'Miesto narodenia potvrdené: {place}.',
    'onb.status.placeReady': 'Pripravené na potvrdenie: {place}.',
    'onb.status.noResults': 'Pre výraz {query} sa nenašli žiadne miesta.',
    'onb.status.resultsFound': 'Nájdených miest: {count}.',
    'onb.status.searchUnavailable': 'Vyhľadávanie miest je dočasne nedostupné. Skús to znova.',
    'onb.map.unavailable': 'Mapu sa teraz nepodarilo zobraziť.',
    'onb.status.mapUnavailable': 'Mapa a vyhľadávanie miest sú teraz nedostupné. Skús to o chvíľu znova.',
    'onb.status.vesselSelected': 'Vybraná schránka: {vessel}.',
    'onb.status.vesselConfirmed': 'Schránka potvrdená: {vessel}.',
    'onb.place.mapPoint': 'Vybraný bod na mape',
    'onb.place.locating': 'Zisťujem polohu…',
    'onb.place.timezoneUnavailable': 'Časové pásmo nedostupné',
    'onb.place.kind.city': 'Veľké mesto',
    'onb.place.kind.town': 'Mesto',
    'onb.place.kind.village': 'Obec',
    'onb.place.kind.facility': 'Pôrodnícke zariadenie',
    'onb.place.facility.current': 'dnešný záznam OpenStreetMap',
    'onb.place.kind.hospital': 'Nemocnica',
    'onb.place.hospital.unconfirmed': 'pôrodnica nepotvrdená',
    'onb.place.timezoneLookupFailed': 'Vyhľadanie časového pásma pre toto miesto zlyhalo.',
    'onb.vessel.undefinedLabel': 'Neurčené',
    'onb.overview.kicker': '05 · Prehľad',
    'onb.overview.copy': 'Skontroluj, či je všetko správne, než vytvoríš profil.',
    'onb.overview.listAria': 'Údaje profilu',
    'onb.overview.notSet': 'Nezadané',
    'onb.time.unknown': 'Neznámy',
    'onb.time.unknownEstimate': 'Číta sa celý deň narodenia; 12:00 je len referenčný bod',
    'onb.time.precisionAria': 'Istota času narodenia',
    'onb.time.precision.exact': 'Presný',
    'onb.time.precision.approximate': 'Približný',
    'onb.time.precision.unknown': 'Neznámy',
    'onb.time.approximateNote': 'Zvoľ najbližší čas, ktorý poznáš. Čo by sa v rozpätí dvoch hodín od neho mohlo zmeniť, sa ukáže ako predbežné.',
    'onb.time.unknownNote': 'Bez času narodenia každý systém číta len to, čo určuje samotný dátum narodenia. 12:00 slúži len ako referenčný bod, nikdy nie ako tvoj čas.',
    'onb.time.approximateValue': 'Približne {time}',
    'onb.time.approximateMeta': 'Tvoj najlepší odhad',
    'onb.overview.coordsTimezone': 'Súradnice · Časové pásmo',
    'onb.overview.finalAction': 'Zhmotniť telo',
    'onb.action.saveChange': 'Uložiť zmenu',
    'onb.action.reviewDetails': 'Skontrolovať údaje',
    'onb.status.reviewBeforeCreate': 'Pred vytvorením profilu skontroluj svoje údaje.',
    'onb.status.needArrival': 'Zadaj dátum a čas svojho príchodu na Zem.',
    'onb.status.editIdentity': 'Uprav svoje rodné meno a rodné priezvisko.',
    'onb.complete.reviewedCopy': 'Profil je pripravený. Tvoje skontrolované údaje sú prepojené.',
    'onb.complete.connected': 'Profil je pripravený. Identita, schránka a príchod sú prepojené.',
    'onb.vessel.chooseAria': 'Vybrať schránku {vessel}',
    'onb.vessel.selectionAria': 'Výber schránky',
    'onb.vessel.changeSelectionAria': 'Zmeniť výber schránky',
    'onb.vessel.previousAria': 'Predchádzajúca schránka',
    'onb.vessel.nextAria': 'Nasledujúca schránka',
    'onb.place.markerTitle': 'Vybrané miesto narodenia',
    'options.qaProfiles': 'QA profily',
    'options.qaProfilesNote': 'Testovacie skratky. Načíta celý profil a otvorí mapu seba; upraviť sa dá cez Skontrolovať údaje.',
    'options.qaOwnerRemove': 'Odstrániť profily majiteľa z tohto zariadenia',
    'options.qaOwnerFromBuild': 'Profily majiteľa: verejný anonymizovaný náhradný zoznam. Verejný náhľad nesie vymyslených ľudí, nikdy skutočné záznamy.',
    'options.qaOwnerFromReview': 'Profily majiteľa: API (súkromne doručené na kontrolu).',
    'options.qaOwnerFromOwnerBuild': 'Profily majiteľa na QA: z tohto buildu (vývojový náhľad majiteľa). Rovnaké na každom zariadení.',
    'options.qaOwnerReviewLoading': 'Profily majiteľa: načítavam...',
    'options.qaOwnerReviewFailed': 'Profily majiteľa: nedoručené. Zariadenie je spárované, ale súkromná služba neodpovedala a nie je skoršie doručenie.',
    'options.qaOwnerFromCache': 'Profily majiteľa: API z pamäte (súkromná služba neodpovedala; zobrazí sa posledné overené doručenie).',
    'options.qaOwnerReviewRefused': 'Token na kontrolu bol odmietnutý (401): zariadenie už nie je spárované. Otvor nový párovací odkaz. Zobrazuje sa verejný náhradný zoznam.',
    'options.qaOwnerHostMismatch': 'NEZHODA HOSTITEĽA KONTROLY - profily majiteľa fungujú len na',
    'options.accentTheme': 'Farebný akcent',
    /* ------------------------------------------------------ the name layer -- */
    'section.your-name': 'Tvoje meno',
    'section.name-culture': 'Tvoje meno naprieč kultúrami',
    'section.name-day': 'Meniny',
    'name.meaningLine': 'Meno {name} pochádza zo slova s významom {meaning}.',
    'name.meaningTraditionalLine': 'Tradične sa vykladá vo význame {meaning}.',
    'name.disputedIntro': 'Pre toto meno sa navrhuje viac než jeden pôvod a bádanie otázku neuzavrelo. Nižšie uvádzame oba výklady.',
    'name.notAboutYou': 'Toto hovorí o tom, odkiaľ slovo pochádza. Pôvod mena je fakt o jazyku a histórii, nie tvrdenie o človeku, ktorý ho nosí.',
    'name.claimLine': '{claim} · {confidence}',
    'name.matchedVia': 'Podoba {form} je zaznamenaná ako {kind} mena {name} a nasledujúci záznam patrí tomuto menu.',
    'name.unknown': 'Pre meno {name} zatiaľ nemáme dostatočne spoľahlivý etymologický záznam. Namiesto dohadov necháme túto časť prázdnu — zvyšok tvojho profilu to neovplyvní.',
    'name.ambiguous': 'Meno {name} zodpovedá viacerým záznamom a nebudeme hádať, ktorý máš na mysli. Radšej neukážeme nič, než by sme ti ukázali históriu iného mena.',
    'name.variantsLine': 'Podoby v iných jazykoch: {list}.',
    'name.diminutivesLine': 'Skrátené a domácke podoby: {list}.',
    'name.relatedLine': 'Príbuzné mená: {list}.',
    'name.confidence.well-attested': 'dobre doložené',
    'name.confidence.probable': 'pravdepodobné',
    'name.confidence.disputed': 'sporné',
    'name.confidence.uncertain': 'neisté',
    'name.class.etymological-fact': 'Doložené odvodenie',
    'name.class.traditional-interpretation': 'Tradičný výklad',
    'name.class.disputed-origin': 'Navrhovaný pôvod',
    'name.class.folk-etymology': 'Rozšírený výklad bez opory',
    'name.kind.spelling': 'pravopisná obmena',
    'name.kind.language-form': 'podoba používaná v inom jazyku',
    'name.kind.transliteration': 'prepis',
    'name.kind.diminutive': 'skrátená podoba',
    'name.relation.shares-root': 'spoločný koreň',
    'name.relation.feminine-form': 'ženská podoba',
    'name.relation.masculine-form': 'mužská podoba',
    'name.relation.derived-from': 'odvodené od',
    'name.relation.cognate': 'príbuzné slovo',
    'name.day.primary': '{region}: {name} má meniny {date}.',
    'name.day.secondary': 'Ďalší uznávaný dátum ({region}): {date}.',
    'name.day.elsewhere': 'Inde je dátum iný — {list}. Meniny patria kalendáru krajiny, nie samotnému menu.',
    'name.day.noneInRegion': 'Toto meno sa v kalendári menín ({region}) nenachádza.',
    'synthesis.strongestConvergence': 'Čo sa tiahne celým výkladom',
    'synthesis.noConvergence': 'Pre tento profil nie je spoločný výklad',
    /* Slovak counts the systems rather than naming the number, because
       „zo štyroch systémov sa zhodli tri“ is how the sentence is actually said. */
    /*
     * THIS SAID SOMETHING THE ENGLISH NEVER SAID.
     *
     * „Zo štyroch systémov sa zhodli štyri“ claims four systems AGREED. The
     * English counts how many of the four could be calculated at all, which
     * is a statement about the input data and not about the result - and a
     * caption asserting agreement above a reading whose whole point is that
     * agreement is measured, not assumed, is the worst place to be wrong.
     */
    'synthesis.synthesisedFrom': 'Zahrnuté tradície: {count} zo štyroch',
    'synthesis.synthesisedAll': 'Zahrnuté všetky štyri tradície',
    'synthesis.statusEstimated': ' – bez času narodenia',
    'synthesis.statusApproximate': ' – čas narodenia je približný',
    'synthesis.limitedNoConvergence': 'Obmedzené: dalo sa prečítať príliš málo tradícií',
    'synthesis.count.0': 'žiadne',
    'synthesis.count.1': 'jeden',
    'synthesis.count.2': 'dva',
    'synthesis.count.3': 'tri',
    'synthesis.count.4': 'štyri',
    /* ------------------------------------------------- the reading composers --
       Tykanie throughout: the reading speaks to one person.
  
       A NAME stays as it is; a LABEL does not. Day Master, Human Design, the
       pinyin stems and branches and the sign, animal and phase names the engines
       print are NAMES - every source for those systems writes them that way, and
       each gets a short plain gloss inside the sentence the first time it
       appears. The numerology POSITIONS are not names but ordinary words for
       rows, so they read in Slovak and match i18n/labels/numerology.ts word for
       word: zivotna cesta, vyjadrenie, tuzba duse, osobnost, postoj, rovnovaha,
       den narodenia, skryta vasen, vyzva, zrelost, vrchol, osobny rok/mesiac/den,
       karmicka lekcia, karmicky dlh, majstrovske cislo. A heading and the
       paragraph under it must never call the same thing two things. The hedges are carried across word for word: „tradícia to
       číta ako“ never becomes „znamená to“, and everything marked symbolic stays
       symbolic. */
    'reading.list.and': ' a ',
    'reading.list.andClause': ', a ',
    /* ------------------------------------------------------------ numerology */
    'reading.numerology.intro.1': 'Numerológia berie dve veci — tvoj dátum narodenia a tvoje celé rodné meno — a '
        + 'redukuje ich pevnou aritmetikou. Výsledky potom číta ako sústavu pozícií. Každá '
        + 'pozícia sa pýta na niečo iné, a preto to isté číslo na dvoch miestach neznamená '
        + 'dvakrát to isté.',
    'reading.numerology.intro.2': 'Výklad nižšie začína číslami, ktoré opisujú teba a nemenia sa, číta ich jedno '
        + 'voči druhému a končí kapitolou života, v ktorej si teraz. Každé číslo osobitne '
        + 'a to, ako vzniklo, nájdeš v časti Ísť do hĺbky; každodenné cykly patria do '
        + 'Predpovede.',
    'reading.numerology.atAGlance.standfirst': 'Štyri čísla, z ktorých je tvoja mapa postavená, a kapitola, v ktorej si teraz.',
    'reading.numerology.title.bornOn': 'Deň narodenia v mesiaci: {day}',
    'reading.numerology.title.noKarmicLessons': 'Karmické lekcie: žiadne',
    'reading.numerology.title.noKarmicDebt': 'Karmický dlh: nič sa nenašlo',
    'reading.numerology.title.chapterPairing': 'Ako čítať kapitolu',
    'reading.numerology.title.threeClocks': 'Tri hodiny idú naraz',
    'reading.numerology.title.readingThree': 'Ako ich čítať spolu',
    'reading.numerology.title.yearCaveat': 'Jedna výhrada k roku',
    'reading.numerology.chapter.first': 'prvá kapitola',
    'reading.numerology.chapter.second': 'druhá kapitola',
    'reading.numerology.chapter.third': 'tretia kapitola',
    'reading.numerology.chapter.fourth': 'štvrtá kapitola',
    'reading.numerology.chapterTitle.withChallenge': '{span} — Vrchol {pinnacle} a Výzva {challenge}',
    'reading.numerology.chapterTitle.current': '{title} (aktuálna)',
    'reading.numerology.pinnacleRepeats': 'Vrchol {pinnacle} pokračuje aj sem: {chapter}. Predtým bola na rade {earlier}. '
        + 'Téma je tá istá, ale úsek života je iný, takže ďalej je napísané len to, čo sa '
        + 'mení; podrobnejší opis samotného čísla nájdeš vyššie.',
    'reading.numerology.challengeRepeats': 'Výzva {challenge} prechádza aj sem: {chapter}. Je to ten istý tlak, ktorý už '
        + 'opísala {earlier}. Opakovaná výzva naprieč kapitolami nie je ani tak zhoda '
        + 'aritmetiky ako téma, ku ktorej sa celý život vracia. Výklad je uvedený pri jej '
        + 'prvom výskyte.',
    'reading.numerology.scale.year': 'rok {value}',
    'reading.numerology.scale.month': 'mesiac {value}',
    'reading.numerology.scale.day': 'deň {value}',
    'reading.numerology.scale.dayNamed': 'deň {value}',
    'reading.numerology.cycle.allAgree': 'Všetky tri škály vychádzajú na to isté číslo: {named}. Je to najmenej časté '
        + 'usporiadanie a najľahšie sa podľa neho koná, lebo nie je otázka, čo má prednosť. '
        + 'Klíma roka, dôraz mesiaca aj tempo dňa žiadajú to isté, a v tomto úseku úsilie '
        + 'mierené tým smerom nenaráža na žiaden vnútorný odpor.',
    'reading.numerology.cycle.twoAgree': 'Dve z troch škál sa tu zhodujú: {named}. Keď rok a kratšia škála nesú to isté '
        + 'číslo, kratšia nepridáva nič nové, skôr zosilňuje to, čo rok už žiadal. '
        + 'Ber to ako časť kalendára, kde je téma roka najdostupnejšia, a podľa toho si '
        + 'plánuj.',
    'reading.numerology.cycle.shortAgree': 'Mesiac a deň sa tu zhodujú, rok nie: {named}. Dve krátke škály na pár dní '
        + 'sústreďujú jeden dôraz vnútri roka, ktorý žiada niečo iné, takže to ber ako '
        + 'krátky úsek, nie ako zmenu klímy.',
    'reading.numerology.cycle.differ': 'Tri škály ukazujú rôznymi smermi: {named}. Je to bežný prípad, nie protirečenie, a '
        + 'je užitočnejší než zhoda, lebo ti hovorí, čo kam patrí. Rok určuje, k čomu sa '
        + 'celý úsek vyvíja; mesiac hovorí, ktorá časť z toho je dostupná teraz; deň je o '
        + 'tempe a o ničom väčšom.',
    'reading.numerology.cycle.priority': 'Keď si protirečia, prednosť má vždy väčšia škála. Rok je vývojová klíma a deň je '
        + 'utorok; rozhodnutie urobené kvôli číslu dňa je rozhodnutie na základe najľahšej '
        + 'informácie v celom systéme. Prakticky to čítaj takto: rok {year} rozhoduje o '
        + 'tom, načo toto obdobie je, mesiac {month} rozhoduje o tom, na čom v ňom '
        + 'pracovať, a {day} rozhoduje len o tom, čo urobiť dnes ráno ako prvé.',
    /* ---------------------------------------------------- western astrology */
    'reading.astrology.intro': 'Výklad začína hlavným vzorcom tvojej mapy. Potom ukazuje, ako sa jej časti '
        + 'navzájom podporujú a kde ťahajú rozdielnymi smermi.',
    'reading.astrology.atAGlance.standfirst': 'Kľúčové údaje mapy. Čo znamenajú, je nižšie.',
    'reading.astrology.placements.standfirst': 'Každá planéta vo svojom znamení a dome, spolu s aspektmi, ktoré ju formujú.',
    'reading.astrology.placements.standfirstNoHouses': 'Každá planéta vo svojom znamení, spolu s aspektmi, ktoré ju formujú. Domy si vyžadujú čas narodenia.',
    'reading.astrology.chartStructure.standfirst': 'Z čoho je rozloženie poskladané — otázka, ktorá prichádza až po zhrnutí vyššie.',
    'reading.astrology.dignity.peregrineSummary': 'Peregrinná planéta nie je vo svojom znamení v žiadnom zo štyroch hlavných postavení, '
        + 'ktoré toto čítanie zvažuje: domicil, exaltácia, exil, pád. Nie je teda ani doma, '
        + 'ani v exile. Tradícia ju číta ako funkciu bez pevnej adresy: povahu si berie od '
        + 'toho, čo v mape hovorí najhlasnejšie, a preto to isté postavenie môže z jednej '
        + 'časti života do druhej vyzerať nepodobne samo sebe. V tejto mape to platí pre '
        + '{planets}.',
    'reading.astrology.ascendantLine': 'Tvoj ascendent {sign} nastavuje polohu, v akej všetko ostatné '
        + 'prichádza.',
    'reading.astrology.ascendantTitle': 'Ascendent {sign}',
    'reading.astrology.placementTitle': '{body} {sign}',
    'reading.astrology.placementTitleHouse': '{body} {sign}, dom {house}',
    'reading.astrology.keyAspects.standfirst': 'Uhly medzi tvojimi planétami, od najsilnejšieho. Opisujú funkcie, ktoré musia '
        + 'pracovať jedna cez druhú, nie oddelene.',
    'reading.astrology.angleOn.ascendant': 'na ascendente',
    'reading.astrology.angleOn.midheaven': 'na Medium Coeli',
    'reading.astrology.angleOn.descendant': 'na descendente',
    'reading.astrology.angleOn.imum-coeli': 'na Imum Coeli (IC)',
    'reading.astrology.houseIn.1': 'v 1. dome',
    'reading.astrology.houseIn.2': 'v 2. dome',
    'reading.astrology.houseIn.3': 'v 3. dome',
    'reading.astrology.houseIn.4': 'v 4. dome',
    'reading.astrology.houseIn.5': 'v 5. dome',
    'reading.astrology.houseIn.6': 'v 6. dome',
    'reading.astrology.houseIn.7': 'v 7. dome',
    'reading.astrology.houseIn.8': 'v 8. dome',
    'reading.astrology.houseIn.9': 'v 9. dome',
    'reading.astrology.houseIn.10': 'v 10. dome',
    'reading.astrology.houseIn.11': 'v 11. dome',
    'reading.astrology.houseIn.12': 'v 12. dome',
    /* ---------------------------------------------------------------- BaZi */
    'reading.bazi.intro.1': 'BaZi číta okamih tvojho narodenia ako osem čínskych znakov v štyroch dvojiciach, '
        + 'pre rok, mesiac, deň a hodinu. Jeden z nich predstavuje teba a ostatné sa čítajú '
        + 'podľa toho, čo mu robia.',
    'reading.bazi.intro.2': 'Ročné obdobie tvojho narodenia váži viac než ktorýkoľvek jednotlivý znak, preto sa '
        + 'výklad začína tam. Názvy, počty a vzťahy za každou časťou sú v časti Ísť do hĺbky.',
    'reading.bazi.state.prosperous': 'v období svojej vlastnej fázy, čo je najväčšia možná podpora',
    'reading.bazi.state.aided': 'v období, ktoré jeho fázu vytvára, takže ho niečo živí zvonku',
    'reading.bazi.state.resting': 'v období, ktoré jeho vlastná fáza vytvára, takže sa z neho neustále čerpá',
    'reading.bazi.state.trapped': 'v období, ktoré jeho vlastná fáza ovláda, čo je namáhavé a produktívne',
    'reading.bazi.state.dead': 'v období, ktoré jeho fázu ovláda, čo je zovretá poloha',
    'reading.bazi.dayMaster.bornNote': 'Day Master je {state}',
    'reading.bazi.zodiac.standfirst': 'Zviera tvojho roka a živel, ktorý nesie, čítané ako jedna vec: {title}.',
    'reading.bazi.zodiac.markNote': 'kmeň {polarity} {element} nad vetvou {branchElement}',
    'reading.bazi.phaseDepthTitle': '{phase} do hĺbky',
    'reading.bazi.balanceMethodTitle': 'Ako sa rovnováha počíta',
    'reading.bazi.strengthMethodTitle': 'Ako sa posudzuje sila',
    'reading.bazi.atAGlance.standfirst': 'Celá mapa na jednom mieste. Za tlačidlom s informáciou má každý pojem vysvetlenie.',
    'reading.bazi.glance.knownNote': 'zo šiestich známych znakov',
    'reading.bazi.glance.estimatedNote': 'vrátane odhadnutej hodiny',
    'bazi.hero.estimate': 'Odhad',
    'reading.bazi.dayMaster.standfirst': 'Kmeň tvojho denného piliera. Každý ďalší znak v mape sa číta podľa toho, čo robí '
        + 'práve tomuto.',
    'reading.bazi.dayMaster.body': 'Day Master tejto mapy je {dayMaster}. Nie je to vlastnosť ani hodnotenie — je to '
        + 'referenčný bod. Keď Desať bohov nižšie opisuje niektorý kmeň ako podporujúci, '
        + 'odčerpávajúci, ovládajúci alebo súperiaci, opisujú ho práve voči tomuto.',
    'reading.bazi.dayMaster.portraitFollows': 'Čo to znamená pre teba, opisuje výklad vyššie, ktorý sa od neho začína.',
    'reading.bazi.position.year': 'roka',
    'reading.bazi.position.month': 'mesiaca',
    'reading.bazi.position.day': 'dňa',
    'reading.bazi.position.hour': 'hodiny',
    'reading.bazi.positionName.year': 'Rok',
    'reading.bazi.positionName.month': 'Mesiac',
    'reading.bazi.positionName.day': 'Deň',
    'reading.bazi.positionName.hour': 'Hodina',
    'reading.bazi.positionName.hourEstimated': 'Hodina (odhadnutá)',
    'reading.bazi.pillarTitle': 'Pilier {position} — {value}',
    'reading.bazi.pillarTitleUnavailable': 'Pilier {position} — nevypočítaný',
    'reading.bazi.pillarTitleEstimated': 'Pilier {position} — {value} (z tvojho odhadnutého času)',
    'reading.bazi.pillarEstimatedNote': 'Tento pilier vychádza z tvojho odhadnutého času narodenia, preto všetko v tomto '
        + 'zázname ber voľnejšie než pri ostatných troch pilieroch.',
    'reading.bazi.pillarRepeatsPair': 'Pilier {position} opakuje dvojicu kmeňa a vetvy, ktorá je v mape už skôr, takže '
        + 'výklad samotnej dvojice je uvedený tam. Opakovaný pilier je vlastnosť mapy, nie '
        + 'náhoda kalendára: tá istá zostava dvakrát v osemznakovej mape ju zosilňuje a '
        + 'čokoľvek tá dvojica prináša, prináša to v dvoch častiach života naraz.',
    'reading.bazi.branchRepeats': 'Vetva {branch} obsadzuje pilier {position} aj jeden skorší a jej celý výklad je '
        + 'pri prvom z nich. Opakovaná vetva nie je duplicitný záznam — tradícia číta '
        + 'zdvojenú vetvu ako zahustenie tej kvality a v niekoľkých konkrétnych prípadoch '
        + 'ako sebatrestanie, ktoré je uvedené osobitne, ak sa tu vyskytuje.',
    'reading.bazi.fourPillars.standfirst': 'Štyri piliere, každý je kmeň stojaci na vetve. To, čo vetva robí kmeňu nad sebou, '
        + 'je rovnako dôležité ako ktorýkoľvek z nich samostatne.',
    'reading.bazi.hiddenStems.bodyNone': 'V tejto mape nesú vetvy toto: {described}. Ani jeden z týchto kmeňov nestojí '
        + 'zároveň na povrchu mapy, takže do výkladu prispievajú len zospodu; bežné váhy, '
        + 'ktoré výpočet použil, sú v úplnosti uvedené v technickej časti nižšie.',
    'reading.bazi.hiddenStems.bodyOne': 'V tejto mape nesú vetvy toto: {described}. {visible} stojí aj na povrchu mapy; '
        + 'ostatné sú len pod povrchom. Bežné váhy, ktoré výpočet použil, sú v úplnosti '
        + 'uvedené v technickej časti nižšie.',
    'reading.bazi.hiddenStems.bodyMany': 'V tejto mape nesú vetvy toto: {described}. {visible} stoja aj na povrchu mapy; '
        + 'ostatné sú len pod povrchom. Bežné váhy, ktoré výpočet použil, sú v úplnosti '
        + 'uvedené v technickej časti nižšie.',
    'reading.bazi.hiddenStems.standfirst': 'Z čoho sú vetvy naozaj urobené. Veľká časť mapy BaZi je tu, nie na jej povrchu.',
    'reading.bazi.fiveElements.standfirst': 'Päť fáz, spočítaných štyrmi rôznymi spôsobmi — a tie štyri počty sa nezhodujú.',
    'reading.bazi.tenGodTitle': '{god} — kmeň {positions}',
    'reading.bazi.tenGodTitleEstimated': '{god} — kmeň {positions} (z odhadnutej hodiny)',
    'reading.bazi.tenGodEstimatedNote': 'Tento záznam stojí na odhadnutej hodine narodenia: ber ho voľnejšie než záznamy '
        + 'pre ostatné piliere.',
    'reading.bazi.tenGodPartlyEstimatedNote': 'Jeho miesto v hodinovom pilieri stojí na odhadnutej hodine narodenia; jeho druhé '
        + 'miesto nie.',
    'reading.bazi.tenGods.standfirst': 'Desať bohov opisuje každý ďalší kmeň podľa toho, čo robí tvojmu Day Master — '
        + 'podporuje ho, odčerpáva ho, ovláda ho alebo s ním súperí. Ani jeden z tých '
        + 'desiatich nie je sám osebe dobrý ani zlý.',
    'reading.bazi.seasonalStrength.pointer': 'Ročné obdobie je vrstva, ktorá prebíja obyčajné počítanie: v tradícii Ziping má '
        + 'vládnuci mesiac väčšiu váhu než akýkoľvek počet znakov, a preto sa výklad otvára '
        + 'práve ním. Mesiac tejto mapy, stav, do ktorého stavia Day Mastera, a tendenciu '
        + 'modelu nájdeš v časti Prečo sa to tu objavuje; ako model k tendencii dospieva, '
        + 'je opísané nižšie.',
    'reading.bazi.seasonalStrength.standfirst': 'Či mapa ako celok Day Master drží hore alebo ho ťahá dole, a čo s tým robí ročné '
        + 'obdobie, do ktorého sa narodil.',
    'reading.bazi.luckPillars.standfirst': 'Piliere šťastia opisujú podmienky, ktorými mapa prechádza v desaťročných '
        + 'obdobiach. Hovoria, čomu obdobie praje, nie čo sa v ňom stane.',
    'reading.bazi.tcmTitle': 'Symbolické priradenie tradičnej čínskej medicíny — {value}',
    'reading.bazi.tcmBody': 'Priradenie, ktoré táto mapa nesie, je {value}. Je to symbolické priradenie medzi '
        + 'fázou a dvojicou orgánových sústav v tradičnej teórii a je tu preto, že patrí k '
        + 'tomu, ako sa tento systém po stáročia čítal. Nehovorí nič o tvojom tele, nie je '
        + 'to diagnóza a nemalo by ovplyvniť žiadne rozhodnutie, ktoré patrí k lekárovi.',
    'reading.bazi.tcm.standfirst': 'Symbolické priradenie, ktoré tradícia vedie medzi piatimi fázami a telom. Kultúrny '
        + 'materiál, nie zdravotná informácia.',
    /* ------------------------------------------------------- Chinese zodiac */
    /*
     * THE PHASE AND THE ANIMAL ARE ORDINARY WORDS HERE.
     *
     * `Fire` and `Rabbit` are engine values, and they stay engine values in the
     * mark, the title and the technical appendix, where a reader checks the
     * calculation. Inside these paragraphs they are nouns in a Slovak sentence,
     * and a nominative English one dropped into the middle of a clause produced
     * `Fire na znamení Rabbit` - not a sentence in either language.
     *
     * So the frames below are written around the cases Slovak actually has. The
     * animal always arrives in the GENITIVE, because every frame says `znamenie
     * <animal>`; the phase arrives in the NOMINATIVE as `{element}` and
     * `{branchElement}` and in the ACCUSATIVE as `{elementObject}` and
     * `{branchElementObject}`, because `drevo plodí oheň` needs both. No frame
     * begins with a phase: the tables hold `oheň`, not `Oheň`, and a sentence
     * starting mid-word is a worse fault than the one being fixed.
     */
    'reading.zodiac.element.wood': 'Drevo je fáza rastu — siaha von, plánuje, chce priestor. Čohokoľvek sa dotkne, dá '
        + 'to náklon dopredu a istú neochotu zostať malé.',
    'reading.zodiac.element.fire': 'Oheň je viditeľná fáza — teplo, prejav, byť videný. Prináša horúčavu a rýchlosť a '
        + 'potrebuje palivo; neudrží sa ticho sám tak, ako to vedia zemitejšie fázy.',
    'reading.zodiac.element.earth': 'Zem je usadzujúca fáza — drží, opatruje, robí veci spoľahlivými. To, čoho sa '
        + 'dotkne, spomalí a dodá tomu váhu, v dobrom aj v zlom.',
    'reading.zodiac.element.metal': 'Kov je zjemňujúca fáza — odrezáva, určuje hrany, trvá na štandardoch. Čohokoľvek '
        + 'sa dotkne, to zaostrí a zúži.',
    'reading.zodiac.element.water': 'Voda je hlboká fáza — tečie, počúva, ide okolo namiesto cez. Zmäkčuje obrysy a '
        + 'obracia pozornosť dovnútra.',
    'reading.zodiac.combination.same': 'Na znamení {animal} je {element} zdvojením, nie zmesou. Znamenie {animal} je už od '
        + 'prírody {branchElement} a niesť na ňom navyše {elementObject} zosilňuje to, čím '
        + 'zviera už bolo, namiesto pridania druhého tónu. Tradícia to číta ako nezriedené '
        + 'znamenie: zhustené a bez ničoho, čo by v tejto dvojici ťahalo opačne.',
    'reading.zodiac.combination.fed': 'Na znamení {animal} má {element} z čoho brať. Znamenie {animal} je od prírody '
        + '{branchElement} a {branchElement} plodí {elementObject}, takže vlastný temperament '
        + 'zvieraťa živí živel, ktorý nesie, namiesto toho, aby mu odporoval. Tradícia to '
        + 'považuje za ľahkú dvojicu: {element} tu má pod sebou palivo, takže sa zvykne '
        + 'prejavovať vyrovnane, nie vzplanutím a zhasnutím.',
    'reading.zodiac.combination.spent': 'Na znamení {animal} sa {element} na zviera minie. Znamenie {animal} je '
        + '{branchElement} a {element} plodí {branchElementObject}, takže sa živel vlieva do '
        + 'znamenia namiesto toho, aby sedel navrchu. Zviera je posilnené a živel je tichší, '
        + 'než by bol inde: najprv stretneš znamenie {animal} a až potom {elementObject}, '
        + 'skôr ako niečo cítené než ukazované.',
    'reading.zodiac.combination.disciplined': 'Na znamení {animal} tvorí {element} disciplinujúcu dvojicu. Znamenie {animal} je '
        + '{branchElement} a {element} ovláda {branchElementObject}, takže živel pôsobí ako '
        + 'obmedzenie prirodzeného pohybu zvieraťa, nie ako povzbudenie. Ak sa to číta '
        + 'dobre, práve odtiaľ má znamenie {animal} štruktúru, ktorú by si samo neuložilo. '
        + 'Ak zle, je to znamenie, ktoré sa drží na uzde viac, než potrebuje.',
    'reading.zodiac.combination.pressured': 'Na znamení {animal} je {element} pod tlakom. Znamenie {animal} je {branchElement} '
        + 'a {branchElement} ovláda {elementObject}, takže vlastná povaha zvieraťa pracuje '
        + 'proti živlu, ktorý nesie. Dve polovice tohto znamenia sa hádajú a tradícia to '
        + 'nepovažuje za chybu: spor vnútri znamenia je aj spôsob, ako poznať obe jeho strany.',
    'reading.zodiac.combination.other': 'Znamenie {animal} a {element} nesú rôzne fázy a dvojica sa číta z toho, ako sa tie '
        + 'dve fázy stretávajú.',
    /* "the face OF Fire" - genitive, and the phase arrives already declined. */
    'reading.zodiac.polarity.yang': 'vonkajšia, iniciujúca tvár {element}',
    'reading.zodiac.polarity.yin': 'vnútorná, prijímajúca tvár {element}',
    'reading.zodiac.polarityLine': '{polarity} je polarita kmeňa roka: {face}. Je to odtieň na živle, nie samostatná '
        + 'vlastnosť.',
    'reading.zodiac.oneOfFour': 'Toto je pilier roka — jeden zo štyroch. Opisuje vonkajšiu vrstvu mapy, to, čo sa '
        + 'ukáže skôr než čokoľvek iné, a je to tá časť BaZi, ktorú si širšia kultúra '
        + 'zapamätala. Nie je to stred mapy: tým je Day Master, živel, od ktorého sa začína '
        + 'výklad nižšie, a ďalšie tri piliere spresnia všetko, čo je tu povedané.',
    /* -------------------------------------------------------- Human Design */
    'reading.hd.intro.1': 'Human Design číta dva okamihy — tvoje narodenie a bod asi osemdesiatosem stupňov '
        + 'slnečného oblúka pred ním — a premieta ich do grafu s deviatimi centrami. Nevyjde '
        + 'z toho ani tak opis tvojej osobnosti ako opis mechaniky: kde je tvoja energia '
        + 'stála, kde je požičaná od toho, kto je práve nablízku, a ako sa v tom najlepšie '
        + 'robí rozhodnutie.',
    'reading.hd.intro.2': 'Je to symbolický systém, nie meraný, a najužitočnejší je čítaný ako súbor otázok, '
        + 'ktoré sa oplatí položiť si o tom, ako naozaj funguješ. Nič nižšie nie je '
        + 'rozsudok.',
    'reading.hd.atAGlance.standfirst': 'Celá mechanika na jednom mieste. Za tlačidlom s informáciou má každý pojem '
        + 'vysvetlenie; čo z toho pre teba čokoľvek znamená, je výklad nižšie.',
    'reading.hd.portrait.standfirst': 'Typ, autorita, profil a definícia čítané ako jedna vec: na akej energii bežíš, '
        + 'ako sa v nej rozhodnutie naozaj robí, čo stretávajú ostatní a ako je celý graf '
        + 'zapojený.',
    'reading.hd.innerWorld.standfirst': 'Tvoja autorita je mechanizmus, ktorý ti hovorí áno alebo nie. Nie je to myseľ, a '
        + 'naučiť sa ju počuť ponad myseľ je väčšina práce, ktorú tento systém žiada.',
    'reading.hd.relationships.standfirst': 'Tvoj profil sú dve línie — tá, ktorú prežívaš, a tá, ktorá beží, či si to všimneš '
        + 'alebo nie. Opisuje, ako ťa ostatní stretávajú.',
    'reading.hd.work.standfirst': 'Definícia opisuje, ako sa tvoje definované centrá spájajú a kde sú medzery, ktoré '
        + 'zhodou okolností uzatvárajú iní ľudia.',
    'reading.hd.centreTitle.defined': '{centre} — definované',
    'reading.hd.centreTitle.open': '{centre} — otvorené',
    'reading.hd.definedCentres.standfirst': 'Definované centrum je stále a je tvoje. Toto sú časti teba, ktoré sa nemenia podľa '
        + 'miestnosti, a tie, na ktoré sa ostatní naučia spoliehať.',
    'reading.hd.openCentres.standfirst': 'Otvorené centrum berie dnu to, čo je okolo neho, a zosilňuje to. Práve tam žije '
        + 'podmieňovanie — a po dlhom čase aj múdrosť. Otvorené nie je to isté ako chýbajúce.',
    'reading.hd.channels.standfirst': 'Tvoje kanály sú pevné zapojenie: schopnosti, ktoré máš vždy poruke, nie '
        + 'požičané od toho, kto je práve nablízku. Každý spája dve centrá a práve on ich '
        + 'robí definovanými.',
    'reading.hd.gates.standfirst': 'Brány, ktoré nesú v tvojej mape najväčšiu štrukturálnu váhu: tie štyri, ktoré '
        + 'tvoria tvoj Incarnation Cross, a tie, ktoré dopĺňajú definovaný kanál. Všetky '
        + 'aktivované brány sú v úplnosti vypísané nižšie.',
    'reading.hd.growth.standfirst': 'Najširší rám, ktorý mapa kreslí, a tie časti systému, ktoré sú najmenej o '
        + 'každodennom fungovaní.',
    /* Go deeper, pod vrstvou rozprávania. */
    'reading.hd.typeDetail.standfirst': 'Úplný záznam k tomuto typu a jeho stratégii, v pojmoch samotného systému.',
    'reading.hd.authorityDetail.standfirst': 'Úplný záznam k tejto autorite — ako tradícia opisuje ten mechanizmus a ako sa bežne nesprávne používa.',
    'reading.hd.profileDetail.standfirst': 'Obe čiary profilu v úplnosti a to, čo tradícia hovorí o tejto dvojici.',
    'reading.hd.definitionDetail.standfirst': 'Čo táto definícia znamená pre to, ako sa časti grafu spájajú.',
    'reading.hd.cross.standfirst': 'Najširší rám, ktorý mapa kreslí, a tá časť systému, ktorá je najmenej o každodennom fungovaní.',
    'reading.hd.variables.standfirst': 'Neskorá a špecializovaná vrstva systému, ponúknutá ako rámcovanie samotného systému, nie ako tvrdenie o tom, ako funguje myslenie.',
    /* ------------------------------------ Human Design: strategy and authority */
    'reading.hdPractice.standfirst': 'Čo od teba tvoj typ a tvoja autorita naozaj žiadajú, keď máš pred sebou '
        + 'rozhodnutie.',
    'reading.hdPractice.authorityTitle': 'Rozhodovanie cez autoritu {authority}',
    'reading.hdPractice.opening': 'Tvoja autorita kladie rozhodovací signál sem: {signal}. V praxi to beží v pevnom '
        + 'poradí a práve to poradie je celá pointa:',
    'reading.hdPractice.strategyTitle': 'Tvoja stratégia: {strategy}',
    'reading.hdPractice.strategyTitlePlain': 'Tvoja stratégia',
    'reading.hdPractice.strategyBody': 'Stratégia nie je druhé rozhodnutie — vyplýva z tvojho typu a opisuje, ako do veci '
        + 'vstupuješ ešte predtým, než je rozhodnutie vôbec tvoje. Tvoja znie: {strategy}.',
    'reading.hdPractice.boundaryTitle': 'Čo toto je a čo nie je',
    'reading.hdPractice.boundary.1': 'Viaceré z týchto krokov opisujú veci, ktoré sú obyčajné a pozorovateľné: že ľudia '
        + 'zaznamenajú telesnú reakciu skôr, než ju vedia vysvetliť, a že vysvetlenie často '
        + 'prichádza až potom a pôsobí ako príčina. To je skutočné a tlačidlá s informáciou '
        + 'tu vedú na ich jednoduché opisy.',
    'reading.hdPractice.boundary.2': 'To ešte nerobí Human Design pravdivým. Postup vyššie je pokynom symbolického '
        + 'systému a to, že pri jeho dodržiavaní venuješ pozornosť niečomu skutočnému, nie '
        + 'je dôkaz pre systém, ktorý ho odporúča. Oboje môže platiť naraz a tento výklad '
        + 'ich zámerne drží oddelene.',
    'reading.hdPractice.sacral.signal': 'okamžitá odpoveď z brucha, dostupná v momente, keď ti vec niekto položí',
    'reading.hdPractice.sacral.step1': 'Objaví sa skutočná možnosť — pozvanie, žiadosť, kus práce. Musí byť skutočná a '
        + 'musí byť pred tebou; Sacral neodpovedá na hypotézy, ktoré si vyrobíš v hlave.',
    'reading.hdPractice.sacral.step2': 'Všimni si, čo sa v prvom momente deje v tele, ešte než niečo povieš. Tradícia to '
        + 'opisuje ako zdvih smerom k veci alebo ako plochosť smerom preč od nej — nižšie v '
        + 'trupe než myšlienka a rýchlejšie než ona.',
    'reading.hdPractice.sacral.step3': 'Odlíš to od vysvetlenia, ktoré príde o sekundu neskôr. Vysvetlenie nie je tá '
        + 'odpoveď; je to komentár k nej a ochotne sa postaví za tú odpoveď, ktorá sa práve '
        + 'hodí viac. Ak nevieš rozoznať, čo prišlo prvé, práve to je zručnosť, o ktorej '
        + 'budovanie tu ide — a dá sa vybudovať.',
    'reading.hdPractice.sacral.step4': 'Až potom použi uvažovanie — na logistiku a dôsledky. Čo by to stálo, koho sa to '
        + 'dotkne, kedy by to mohlo byť. Uvažovanie veci zariaďuje; v tomto systéme '
        + 'nerozhoduje.',
    'reading.hdPractice.emotional.signal': 'jasnosť, ktorá prichádza v čase, nikdy nie v danom momente',
    'reading.hdPractice.emotional.step1': 'Objaví sa skutočná možnosť. Čokoľvek k nej práve teraz cítiš, je bod na vlne, nie '
        + 'rozsudok — a systém výslovne hovorí, že prvé čítanie je najmenej spoľahlivé.',
    'reading.hdPractice.emotional.step2': 'Všimni si ten stav bez toho, aby po ňom nasledoval čin. Nadšenie aj nechuť pominú; '
        + 'čakáš na to, aby tá istá možnosť pôsobila zhruba rovnako naprieč rôznymi '
        + 'náladami.',
    'reading.hdPractice.emotional.step3': 'Nechaj prejsť čas — hodiny pri malej veci, dlhšie pri veľkej. Toto je celý postup '
        + 'a je to tá časť, ktorá je naozaj nepohodlná.',
    'reading.hdPractice.emotional.step4': 'Odlíš ustálené čítanie od príbehu, ktorý sa ti počas čakania odvíjal v hlave. Až potom '
        + 'použi uvažovanie na logistiku a dôsledky, keď sa smer prestal hýbať.',
    'reading.hdPractice.splenic.signal': 'jediný tichý signál v danom momente, ktorý sa neopakuje',
    'reading.hdPractice.splenic.step1': 'Objaví sa skutočná situácia. Splenický signál sa opisuje tak, že príde raz, ticho, '
        + 'a svoju vec nehovorí dvakrát.',
    'reading.hdPractice.splenic.step2': 'Všimni si prvý dojem — často je to telesná nepohoda alebo pohoda, nie myšlienka, a '
        + 'ľahko sa prekričí práve preto, že je taký tichý.',
    'reading.hdPractice.splenic.step3': 'Odlíš ho od uvažovania, ktoré nasleduje. Riziko tu nie je, že uvažovanie prebije '
        + 'hlasný signál, ale že vyplní ticho po tichom.',
    'reading.hdPractice.splenic.step4': 'Až potom použi uvažovanie na logistiku a dôsledky. Ak signál už prešiel a ty sa '
        + 'stále dohaduješ so sebou, systém hovorí, že si za rozhodnutím a v '
        + 'ospravedlňovaní.',
    'reading.hdPractice.egoManifested.signal': 'či na to naozaj máš vôľu',
    'reading.hdPractice.egoManifested.step1': 'Objaví sa skutočná možnosť. Otázka nie je, či je to dobrý nápad, ale či to naozaj '
        + 'chceš natoľko, aby sa to dalo uniesť.',
    'reading.hdPractice.egoManifested.step2': 'Všimni si, čo nájdeš, keď sa spýtaš naplno. Systém berie úprimné „nie, na toto '
        + 'nemám chuť“ ako smerodajné, nie ako zlyhanie.',
    'reading.hdPractice.egoManifested.step3': 'Odlíš to od toho, čo si myslíš, že chcieť treba. Táto autorita sa opisuje ako '
        + 'tá, ktorú povinnosť najčastejšie prehovorí proti nej samej.',
    'reading.hdPractice.egoManifested.step4': 'Až potom použi uvažovanie na logistiku a dôsledky.',
    'reading.hdPractice.egoProjected.signal': 'to, čo počuješ z vlastných úst o vlastnej ochote',
    'reading.hdPractice.egoProjected.step1': 'Objaví sa skutočná možnosť a ty o nej nahlas hovoríš s niekým, komu dôveruješ.',
    'reading.hdPractice.egoProjected.step2': 'Počúvaj vlastnú odpoveď namiesto jej plánovania. Signál je v tom, čo '
        + 'vyjde, nie v tom, čo bolo v pláne povedať.',
    'reading.hdPractice.egoProjected.step3': 'Odlíš to od odôvodnenia, ktoré si potom postavíš pre tú odpoveď, ktorá je '
        + 'upratanejšia.',
    'reading.hdPractice.egoProjected.step4': 'Až potom použi uvažovanie na logistiku a dôsledky.',
    'reading.hdPractice.selfProjected.signal': 'to, čo počuješ vo vlastnom hlase, keď to vyslovíš',
    'reading.hdPractice.selfProjected.step1': 'Objaví sa skutočná možnosť. Táto autorita sa opisuje tak, že potrebuje byť '
        + 'vyslovená, nie premyslená potichu.',
    'reading.hdPractice.selfProjected.step2': 'Vyrozprávaj to niekomu, kto ťa nebude usmerňovať. Počúvaš zvuk vlastného smeru, '
        + 'nie jeho názor.',
    'reading.hdPractice.selfProjected.step3': 'Odlíš to, čo urobil tvoj hlas, od toho, čo hovoril tvoj argument. Často sa '
        + 'nezhodnú a tento systém berie ako signál ten hlas.',
    'reading.hdPractice.selfProjected.step4': 'Až potom použi uvažovanie na logistiku a dôsledky.',
    'reading.hdPractice.mental.signal': 'aké je prostredie, kým si to premýšľaš',
    'reading.hdPractice.mental.step1': 'Objaví sa skutočná možnosť. Táto autorita nemá telesný verdikt, ktorý by sa dal '
        + 'skonzultovať, a systém to hovorí otvorene, nie ospravedlňujúco.',
    'reading.hdPractice.mental.step2': 'Preber to s viacerými ľuďmi, ktorí ti poslúžia ako ozvučná doska, a všímaj si, kde '
        + 'pri tom si. Prostredie — miestnosť, spoločnosť — sa berie ako nositeľ väčšej '
        + 'časti signálu než samotný argument.',
    'reading.hdPractice.mental.step3': 'Odlíš jasnosť, ktorá prišla z toho, že si na správnom mieste, od dômyselnosti '
        + 'ktorejkoľvek konkrétnej úvahy.',
    'reading.hdPractice.mental.step4': 'Až potom použi uvažovanie na logistiku a dôsledky.',
    'reading.hdPractice.lunar.signal': 'vzorec, ktorý sa ukáže až za približne mesiac',
    'reading.hdPractice.lunar.step1': 'Objaví sa skutočná možnosť. Nič na nej sa dnes nerozhoduje.',
    'reading.hdPractice.lunar.step2': 'Všimni si, ako pôsobí v rôznych prostrediach a v rôznej spoločnosti počas zhruba '
        + 'jedného lunárneho cyklu. Reflector sa opisuje ako niekto, kto ochutnáva svoje '
        + 'okolie, takže tá istá možnosť naozaj pôsobí inak podľa toho, kde stojíš.',
    'reading.hdPractice.lunar.step3': 'Odlíš vzorec naprieč mesiacom od ktoréhokoľvek jedného silného dňa v ňom.',
    'reading.hdPractice.lunar.step4': 'Až potom použi uvažovanie na logistiku a dôsledky.',
    'reading.hdPractice.inform.manifestingGenerator': 'Jeden krok navyše pre Manifesting Generator: INFORMUJ ľudí, ktorých sa tvoje '
        + 'rozhodnutie dotkne, skôr než konáš, nie potom. Manifesting Generator sa hýbe '
        + 'rýchlo a často preskočí krok, ktorý bol jemu zjavný a ostatným neviditeľný. '
        + 'Systém berie väčšinu odporu, na ktorý naráža, ako predvídateľný dôsledok práve '
        + 'tohto, nie ako rozsudok nad rozhodnutím. Informovanie nie je pýtanie si dovolenia; '
        + 'je to oznámenie ľuďom, čo sa chystá stať.',
    'reading.hdPractice.inform.manifestor': 'Jeden krok navyše pre Manifestor: INFORMUJ ľudí, ktorých sa tvoje rozhodnutie '
        + 'dotkne, skôr než konáš. V tomto systéme je informovanie to, čo mení odpor na '
        + 'spoluprácu — nie preto, že si pýta súhlas, ale preto, že odstraňuje prekvapenie.',
    /* ------------------------------------------- the cross-pillar composers --
       Tykanie, krátke vety, a hedges carried across in full: „sporné“ stays
       sporné, „nejde o meranie“ is never dropped, „len jeden systém“ never
       becomes agreement. Where English puts a numeral in front of a noun, the
       Slovak key exists once per plural band, because 1 systém / 2 systémy /
       5 systémov are three different words and only one of them is ever right.
  
       Canonical names stay: BaZi, Human Design. The theme and axis names come
       from knowledge/translations/themeLabels.ts and are not repeated here. */
    'synthesis.compose.count.m.0': 'žiadny',
    'synthesis.compose.count.m.1': 'jeden',
    'synthesis.compose.count.m.2': 'dva',
    'synthesis.compose.count.m.3': 'tri',
    'synthesis.compose.count.m.4': 'štyri',
    'synthesis.compose.count.m.5': 'päť',
    'synthesis.compose.count.m.6': 'šesť',
    'synthesis.compose.count.m.7': 'sedem',
    'synthesis.compose.count.m.8': 'osem',
    'synthesis.compose.count.f.0': 'žiadna',
    'synthesis.compose.count.f.1': 'jedna',
    'synthesis.compose.count.f.2': 'dve',
    'synthesis.compose.count.f.3': 'tri',
    'synthesis.compose.count.f.4': 'štyri',
    'synthesis.compose.count.f.5': 'päť',
    'synthesis.compose.count.f.6': 'šesť',
    'synthesis.compose.count.f.7': 'sedem',
    'synthesis.compose.count.f.8': 'osem',
    'synthesis.compose.pillar.numerology': 'Numerológia',
    'synthesis.compose.pillar.astrology': 'Západná astrológia',
    'synthesis.compose.pillar.bazi': 'BaZi',
    'synthesis.compose.pillar.human-design': 'Human Design',
    'synthesis.compose.support.strong': 'silná zhoda',
    'synthesis.compose.support.moderate': 'stredná zhoda',
    'synthesis.compose.support.weak': 'slabá zhoda',
    'synthesis.compose.support.single-system': 'len jeden systém',
    'synthesis.compose.support.insufficient': 'prislabé na uvedenie',
    'synthesis.compose.level.strong': 'silná',
    'synthesis.compose.level.moderate': 'stredná',
    'synthesis.compose.level.weak': 'slabá',
    'synthesis.compose.level.single-system': 'len z jedného systému',
    'synthesis.compose.level.insufficient': 'nedostatočná',
    /* Každý pól je zvolený tak, aby sa jeho akuzatív rovnal nominatívu. Preto
       jedno slovo vystačí aj vo vete „ukazuje na …“, aj vo výpise „X verzus Y“. */
    'synthesis.compose.pole.introspective': 'vnútorné sústredenie',
    'synthesis.compose.pole.outwardly-engaged': 'zameranie navonok',
    'synthesis.compose.pole.analytical': 'analytické uvažovanie',
    'synthesis.compose.pole.intuitive': 'intuitívne uvažovanie',
    /* Not „samostatnosť": that is the AXIS this pole sits on, and printing both
       gave „Samostatnosť: samostatnosť verzus zameranie na spoluprácu". */
    'synthesis.compose.pole.independent': 'nezávislosť',
    'synthesis.compose.pole.collaborative': 'zameranie na spoluprácu',
    'synthesis.compose.pole.structured': 'pevný poriadok',
    'synthesis.compose.pole.adaptable': 'prispôsobivosť',
    'synthesis.compose.pole.cautious': 'opatrnosť',
    'synthesis.compose.pole.risk-oriented': 'chuť riskovať',
    'synthesis.compose.pole.emotionally-expressive': 'prejavovanie emócií',
    'synthesis.compose.pole.emotionally-contained': 'zadržiavanie emócií',
    'synthesis.compose.pole.private': 'súkromie',
    'synthesis.compose.pole.social': 'spoločenskosť',
    'synthesis.compose.pole.stability-seeking': 'hľadanie stability',
    'synthesis.compose.pole.novelty-seeking': 'hľadanie nového',
    'synthesis.compose.pole.assertive': 'presadzovanie sa',
    'synthesis.compose.pole.receptive': 'prijímanie',
    'synthesis.compose.pole.practical': 'praktickosť',
    'synthesis.compose.pole.conceptual': 'pojmové myslenie',
    'synthesis.compose.pole.mastery': 'majstrovstvo',
    'synthesis.compose.pole.achievement': 'výsledok',
    'synthesis.compose.pole.recognition': 'uznanie',
    'synthesis.compose.pole.meaning': 'zmysel',
    'synthesis.compose.pole.belonging': 'patrenie niekam',
    'synthesis.compose.pole.freedom': 'sloboda',
    'synthesis.compose.pole.care': 'starostlivosť',
    'synthesis.compose.pole.understanding': 'porozumenie',
    'synthesis.compose.pole.self-expression': 'sebavyjadrenie',
    'synthesis.compose.pole.beauty': 'tvar',
    'synthesis.compose.pole.creative': 'tvorivosť',
    'synthesis.compose.pole.persistent': 'vytrvalosť',
    'synthesis.compose.pole.emotionally-sensitive': 'citlivosť',
    'synthesis.compose.pole.communicative': 'komunikatívnosť',
    'synthesis.compose.poleSide': '{pole}',
    'synthesis.compose.domain.core-identity': 'Jadro identity',
    'synthesis.compose.domain.inner-world': 'Vnútorný svet',
    'synthesis.compose.domain.decision-making': 'Rozhodovanie',
    'synthesis.compose.domain.relationships': 'Vzťahy',
    'synthesis.compose.domain.communication': 'Komunikácia',
    'synthesis.compose.domain.work-career': 'Práca a kariéra',
    'synthesis.compose.domain.money-material': 'Peniaze a vzťah k hmotnému',
    'synthesis.compose.domain.creativity': 'Tvorivosť',
    'synthesis.compose.domain.stress-shadow': 'Stres a tieňové vzorce',
    'synthesis.compose.domain.growth': 'Rast',
    'synthesis.compose.domain.energy-pace': 'Energia a tempo',
    'synthesis.compose.domain.social-style': 'Spoločenský štýl',
    /* ------------------------------------------------------------ orientation */
    'synthesis.compose.orientation.draws.1': 'Tento výklad stavia na jednom zo štyroch systémov – {pillars} – a zvážil z neho '
        + '{evidence}.',
    'synthesis.compose.orientation.draws.2': 'Tento výklad stavia na dvoch zo štyroch systémov – {pillars} – a zvážil z nich '
        + '{evidence}.',
    'synthesis.compose.orientation.draws.3': 'Tento výklad stavia na troch zo štyroch systémov – {pillars} – a zvážil z nich '
        + '{evidence}.',
    'synthesis.compose.orientation.draws.4': 'Tento výklad stavia na všetkých štyroch systémoch – {pillars} – a zvážil z nich '
        + '{evidence}.',
    'synthesis.compose.orientation.draws.n': 'Tento výklad stavia na systémoch, ktorých je {count} zo štyroch – {pillars} – a '
        + 'zvážil z nich {evidence}.',
    'synthesis.compose.evidencePieces.zero': '{count} samostatných zistení',
    'synthesis.compose.evidencePieces.one': '{count} samostatné zistenie',
    'synthesis.compose.evidencePieces.few': '{count} samostatné zistenia',
    'synthesis.compose.evidencePieces.many': '{count} samostatných zistení',
    /* The count arrives capitalised and in the feminine, for „téma“. */
    'synthesis.compose.orientation.themesReach.zero': '{count} téma nie je dosť silná na to, aby sme ju uviedli',
    'synthesis.compose.orientation.themesReach.one': '{count} téma je dosť silná na to, aby sme ju uviedli',
    'synthesis.compose.orientation.themesReach.few': '{count} témy sú dosť silné na to, aby sme ich uviedli',
    'synthesis.compose.orientation.themesReach.many': '{count} tém je dosť silných na to, aby sme ich uviedli',
    /* Lower case and masculine, for „sporný bod“: the place where the systems
       disagree. Not „os“ - a reader is not reading a model. */
    'synthesis.compose.orientation.axesContested.zero': '{count} sporný bod medzi nimi nestojí za zmienku',
    'synthesis.compose.orientation.axesContested.one': '{count} sporný bod medzi nimi stojí za zmienku',
    'synthesis.compose.orientation.axesContested.few': '{count} sporné body medzi nimi stoja za zmienku',
    'synthesis.compose.orientation.axesContested.many': '{count} sporných bodov medzi nimi stojí za zmienku',
    'synthesis.compose.orientation.threshold': '{themes} a {axes}.',
    'synthesis.compose.orientation.onlyOne': 'Keď je vypočítaná jedna tradícia, nie je ju voči čomu čítať, takže sa nižšie '
        + 'neuvádzajú žiadne spoločné témy. Výklad {pillars} je úplný a nedotknutý a '
        + 'materiál tohto profilu je práve v ňom.',
    'synthesis.compose.orientation.missing.1': 'Pre tento profil sa nepodarilo vypočítať: {pillars}. Každý počet nižšie je preto '
        + 'z jedného, nie zo štyroch.',
    'synthesis.compose.orientation.missing.2': 'Pre tento profil sa nepodarilo vypočítať: {pillars}. Každý počet nižšie je preto '
        + 'z dvoch, nie zo štyroch.',
    'synthesis.compose.orientation.missing.3': 'Pre tento profil sa nepodarilo vypočítať: {pillars}. Každý počet nižšie je preto '
        + 'z troch, nie zo štyroch.',
    'synthesis.compose.orientation.missing.4': 'Pre tento profil sa nepodarilo vypočítať: {pillars}. Každý počet nižšie je preto '
        + 'zo štyroch, nie zo štyroch.',
    'synthesis.compose.orientation.missing.n': 'Pre tento profil sa nepodarilo vypočítať: {pillars}. Každý počet nižšie je preto '
        + 'z {count}, nie zo štyroch.',
    'synthesis.compose.orientation.timeSensitive.zero': '{count} z {total} zistení nižšie pochádza zo systému, ktorý potreboval čas '
        + 'narodenia, a každé z nich dostalo pred započítaním nižšiu váhu.',
    'synthesis.compose.orientation.timeSensitive.one': '{count} z {total} zistení nižšie pochádza zo systému, ktorý potreboval čas '
        + 'narodenia, a pred započítaním dostalo nižšiu váhu.',
    'synthesis.compose.orientation.timeSensitive.few': '{count} z {total} zistení nižšie pochádzajú zo systému, ktorý potreboval čas '
        + 'narodenia, a každé z nich dostalo pred započítaním nižšiu váhu.',
    'synthesis.compose.orientation.timeSensitive.many': '{count} z {total} zistení nižšie pochádza zo systému, ktorý potreboval čas '
        + 'narodenia, a každé z nich dostalo pred započítaním nižšiu váhu.',
    'synthesis.compose.orientation.standfirst': 'Štyri tradície, spôsob váženia a znižovania váhy dôkazov a to, ako sa triedi '
        + 'nezhoda.',
    /* ------------------------------------------------------------ convergence */
    'synthesis.compose.convergence.standfirst': 'Ako tvoj spôsob fungovania opisujú jednotlivé tradície. Najvýraznejšie sú prvé.',
    'synthesis.compose.convergence.standfirstWeak': 'Silná ani stredná zhoda sa nenašla. To, čo nasleduje, je slabšie a je to tak aj '
        + 'označené.',
    'synthesis.compose.convergence.pointAll.2': 'Oba dostupné systémy ukazujú na to isté: {theme} – {pillars}.',
    'synthesis.compose.convergence.pointAll.3': 'Všetky tri dostupné systémy ukazujú na to isté: {theme} – {pillars}.',
    'synthesis.compose.convergence.pointAll.4': 'Všetky štyri dostupné systémy ukazujú na to isté: {theme} – {pillars}.',
    'synthesis.compose.convergence.pointAll.n': 'Všetky dostupné systémy, ktorých je {count}, ukazujú na to isté: {theme} – '
        + '{pillars}.',
    'synthesis.compose.convergence.pointSome.2of3': 'Dva z troch dostupných systémov ukazujú na to isté: {theme} – {pillars}.',
    'synthesis.compose.convergence.pointSome.2of4': 'Dva zo štyroch dostupných systémov ukazujú na to isté: {theme} – {pillars}.',
    'synthesis.compose.convergence.pointSome.3of4': 'Tri zo štyroch dostupných systémov ukazujú na to isté: {theme} – {pillars}.',
    'synthesis.compose.convergence.pointSome.n': '{count} z {total} dostupných systémov ukazuje na to isté: {theme} – {pillars}.',
    'synthesis.compose.convergence.supportCountered': 'Zhoda je {support}, hoci časť mapy ťahá opačným smerom.',
    'synthesis.compose.convergence.supportClean': 'Zhoda je {support} a nič v mape jej neodporuje.',
    'synthesis.compose.convergence.caution': 'Pri téme „{theme}“ je namieste opatrnosť. Buď mapa hovorí proti nej takmer '
        + 'rovnako ako za ňu, alebo časť zhody stojí na výkladoch, ktoré sú sporné aj vo '
        + 'vlastnej tradícii. Tak či tak váži menej, než naznačuje samotný počet systémov. '
        + 'Presné čísla sú v Technických podrobnostiach.',
    'synthesis.compose.convergence.entryStandfirst': '{count} systémy · {support}',
    'synthesis.compose.convergence.badgeCountered': ' · sporné',
    'synthesis.compose.convergence.badgeCaution': ' · drž zľahka',
    /* --------------------------------------------------------------- tensions */
    'synthesis.compose.tensions.standfirst': 'Sporné body: miesta, kde systémy z tých istých údajov o narodení opisujú opačné '
        + 'veci.',
    'synthesis.compose.tensions.line.11': 'Jeden systém ukazuje na {heavierSide}, kým iný na {lighterSide}. {note}',
    'synthesis.compose.tensions.line.n1': '{heavier} systémy ukazujú na {heavierSide}, kým jeden na {lighterSide}. {note}',
    'synthesis.compose.tensions.line.1n': 'Jeden systém ukazuje na {heavierSide}, kým {lighter} na {lighterSide}. {note}',
    'synthesis.compose.tensions.line.nn': '{heavier} systémy ukazujú na {heavierSide}, kým {lighter} na {lighterSide}. '
        + '{note}',
    'synthesis.compose.tensions.line.eq': 'Systémy sa delia rovnako: {heavier} ukazujú na {heavierSide} a {lighter} na '
        + '{lighterSide}. {note}',
    'synthesis.compose.tensions.noteTrue': 'Obe strany nesú porovnateľnú váhu a je to dvojica, pri ktorej je držať oboje naraz '
        + 'naozaj nepohodlné – práve preto ide o skutočné napätie, nie o bežnú zložitosť.',
    'synthesis.compose.tensions.noteContextual.leads': '{side} váhou zreteľne vedie, takže sa to číta ako niečo, čo sa mení podľa '
        + 'situácie, nie ako protirečenie.',
    'synthesis.compose.tensions.noteContextual.single': 'Obe strany sú si váhou blízko, no za tou slabšou stojí jediný systém – jedna '
        + 'tradícia nesúhlasí s ostatnými. Číta sa to preto ako niečo, čo sa mení podľa '
        + 'situácie, nie ako protirečenie.',
    'synthesis.compose.tensions.noteContextual.ordinary': 'Obe strany nesú porovnateľnú váhu, no je to dvojica, ktorú väčšina ľudí bez '
        + 'ťažkostí nesie naraz – číta sa to preto ako niečo, čo sa mení podľa situácie, '
        + 'nie ako protirečenie.',
    'synthesis.compose.tensions.entryTrue': 'Za oboma stranami stojí dosť veľa a naraz sa držia ťažko',
    'synthesis.compose.tensions.entryContextual.leads': 'Sú tu obe a zvyčajne vedie {side}, takže sa to mení podľa situácie',
    'synthesis.compose.tensions.entryContextual.single': 'Sú tu obe, ale za tou slabšou stojí jediná tradícia',
    'synthesis.compose.tensions.entryContextual.ordinary': 'Sú tu obe a niesť obe je bežné, nie konflikt',
    'synthesis.compose.tensions.moved.one': 'Dosť silná na uvedenie bola aj téma {list}. Vyššie ju zámerne neuvádzame ako '
        + 'zhodu: v tejto mape hovorí proti nej viac než za ňu. Uviesť ju medzi zhodami by '
        + 'znamenalo tvrdiť, že systémy sa naraz zhodujú na oboch stranách toho istého '
        + 'sporného bodu – a presne takto vyzerá sporný bod z nesprávneho uhla. Preto je '
        + 'vysvetlená tu.',
    'synthesis.compose.tensions.moved.many': 'Dosť silné na uvedenie boli aj témy {list}. Vyššie ich zámerne neuvádzame ako '
        + 'zhodu: v tejto mape hovorí proti nim viac než za ne. Uviesť ich medzi zhodami by '
        + 'znamenalo tvrdiť, že systémy sa naraz zhodujú na oboch stranách toho istého '
        + 'sporného bodu – a presne takto vyzerá sporný bod z nesprávneho uhla. Preto sú '
        + 'vysvetlené tu.',
    /* ---------------------------------------------------------- single system */
    'synthesis.compose.single.standfirst': 'Pozorovania, ktoré urobila len jedna tradícia. Ukazujeme ich, ale držíme ich '
        + 'voľne.',
    'synthesis.compose.single.entryStandfirst': 'len {pillars}',
    'synthesis.compose.single.line': '{pillars} ako jediný systém ukazuje na jedno: {theme}. Ostatné systémy o tom mlčia '
        + '– nenamietajú, čo je rozdiel a zvyčajne to znamená, že pre to nemajú slová. Jedna '
        + 'tradícia sama osebe nikdy nie je vzorcom naprieč systémami, nech to hovorí '
        + 'akokoľvek dôrazne.',
    /* ---------------------------------------------------------------- domains */
    'synthesis.compose.domains.standfirst': 'Kam témy vyššie dopadajú. Nič nové sa tu netvrdí – je to ten istý materiál, '
        + 'zoradený podľa oblasti života.',
    'synthesis.compose.domains.agreed.zero': 'Tejto oblasti ({domain}) sa nedotýka žiadna téma.',
    'synthesis.compose.domains.agreed.one': 'Tejto oblasti ({domain}) sa dotýka jedna téma: {list}.',
    'synthesis.compose.domains.agreed.few': 'Tejto oblasti ({domain}) sa dotýkajú tieto témy: {list}.',
    'synthesis.compose.domains.agreed.many': 'Tejto oblasti ({domain}) sa dotýkajú tieto témy: {list}.',
    'synthesis.compose.domains.moreThemes': 'ďalšie ({count})',
    'synthesis.compose.domains.moreThemes.one': 'ďalšia ({count})',
    'synthesis.compose.domains.noneAgreed': 'Tejto oblasti ({domain}) sa nedotýka žiadna z tém, na ktorých sa systémy zhodli, '
        + 'takže to, čo o nej hovoria, je skôr sporné než ustálené.',
    'synthesis.compose.domains.contested.one': '{list} sa jej tiež dotýka, ale patrí k tomu, v čom sa systémy rozchádzajú.',
    'synthesis.compose.domains.contested.many': '{list} sa jej tiež dotýkajú, ale patria k tomu, v čom sa systémy rozchádzajú.',
    'synthesis.compose.domains.axes.one': 'Sporný bod, ktorý sem patrí: {list}.',
    'synthesis.compose.domains.axes.many': 'Sporné body, ktoré sem patria: {list}.',
    /* The area is already named by the clause before this one in the same
       paragraph; English repeats the noun, Slovak would read as a stutter. */
    'synthesis.compose.domains.noAxes': 'Do tejto oblasti nezasahuje žiadny sporný bod, takže výklad je tu súdržnejší než '
        + 'inde.',
    /* ----------------------------------------------------------------- limits */
    'synthesis.compose.limits.notMeasurement': 'Ber to ako symbolický spôsob, ako lepšie porozumieť sebe, nie ako meranie teba. '
        + 'Tradície za týmto výkladom vychádzajú z tých istých údajov o narodení a zdieľajú niektoré '
        + 'predstavy o povahe, takže ich zhoda ukazuje, že ťa vidia podobne, nie že by sa to overilo.',
    'synthesis.compose.limits.weighed': 'Model zvážil {evidence}{suppressed}{time}.',
    'synthesis.compose.piecesOfEvidence.zero': '{count} zistení',
    'synthesis.compose.piecesOfEvidence.one': '{count} zistenie',
    'synthesis.compose.piecesOfEvidence.few': '{count} zistenia',
    'synthesis.compose.piecesOfEvidence.many': '{count} zistení',
    'synthesis.compose.limits.suppressed.zero': ', z toho {count} bolo úplne vynechaných, pretože údaje, ktoré potrebovali, neboli '
        + 'dostupné',
    'synthesis.compose.limits.suppressed.one': ', z toho {count} bolo úplne vynechané, pretože údaje, ktoré potrebovalo, neboli '
        + 'dostupné',
    'synthesis.compose.limits.suppressed.few': ', z toho {count} boli úplne vynechané, pretože údaje, ktoré potrebovali, neboli '
        + 'dostupné',
    'synthesis.compose.limits.suppressed.many': ', z toho {count} bolo úplne vynechaných, pretože údaje, ktoré potrebovali, neboli '
        + 'dostupné',
    'synthesis.compose.limits.timeWeighted.zero': ' a {count} dostalo nižšiu váhu ako citlivé na čas',
    'synthesis.compose.limits.timeWeighted.one': ' a {count} dostalo nižšiu váhu ako citlivé na čas',
    'synthesis.compose.limits.timeWeighted.few': ' a {count} dostali nižšiu váhu ako citlivé na čas',
    'synthesis.compose.limits.timeWeighted.many': ' a {count} dostalo nižšiu váhu ako citlivé na čas',
    'synthesis.compose.limits.subThreshold.zero': '{count} ďalšia téma sa nenašla, takže pod hranicou uvedenia nezostalo nič skryté.',
    'synthesis.compose.limits.subThreshold.one': '{count} ďalšia téma bola prislabá na to, aby sme ju uviedli vo výklade vyššie – '
        + 'nájdeš ju v zoradenej tabuľke na konci.',
    'synthesis.compose.limits.subThreshold.few': '{count} ďalšie témy boli prislabé na to, aby sme ich uviedli vo výklade vyššie – '
        + 'nájdeš ich v zoradenej tabuľke na konci.',
    'synthesis.compose.limits.subThreshold.many': '{count} ďalších tém bolo prislabých na to, aby sme ich uviedli vo výklade vyššie – '
        + 'nájdeš ich v zoradenej tabuľke na konci.',
    'synthesis.compose.limits.evidenceChain': 'Každé zistenie za každou uvedenou témou – vrátane toho, ktorým sa znížila váha pre '
        + 'vzájomnú závislosť – nájdeš v reťazi dôkazov pripojenej k tomuto výkladu.',
    'synthesis.compose.limits.pillarsSayMore': 'Tento prehľad sa drží toho, čo je v jednotlivých výkladoch silné, opakuje sa alebo je '
        + 'mimoriadne výpovedné, a rozpory medzi nimi nezahladzuje. Každá tradícia sama osebe povie '
        + 'oveľa viac, než sa sem zmestí.',
    /* --------------------------------------------------------------- portrait */
    'synthesis.compose.portrait.standfirst': 'Čo hovorí celý obraz, ešte pred výpočtami.',
    'synthesis.compose.portrait.lead1': 'To najsilnejšie, čo majú výklady spoločné, je jedno: {theme}. Nesú to {pillars}.',
    'synthesis.compose.portrait.lead2': 'Popri tom beží ďalšia téma: {theme}. K nej dospeli {pillars}.',
    'synthesis.compose.portrait.lead3': 'Tretia niť – {theme} – sa objavuje v týchto systémoch: {pillars}.',
    'synthesis.compose.portrait.central': 'Proti tomu všetkému stojí jediné miesto, kde sa tradície nezhodnú: {axis}. {note}',
    'synthesis.compose.portrait.centralTrue': 'Za oboma stranami stojí viac než jeden systém a ani jedna neustúpi. To je '
        + 'najbližšie, ako sa tento výklad dostane k pomenovaniu skutočného vnútorného '
        + 'konfliktu.',
    'synthesis.compose.portrait.central.leads': '{side} vedie, takže tu nejde ani tak o konflikt, ako o vec, ktorá sa mení podľa '
        + 'situácie – oplatí sa však vedieť, ktorým smerom to zvyčajne ide.',
    'synthesis.compose.portrait.central.single': 'Obe strany sú si blízko, no za tou slabšou stojí jediný systém, takže tu nejde ani '
        + 'tak o konflikt, ako o jednu tradíciu, ktorá nesúhlasí – oplatí sa to vedieť a '
        + 'držať to voľne.',
    'synthesis.compose.portrait.central.ordinary': 'Za oboma stranami niečo stojí a ani jedna neustúpi, no je to dvojica, ktorú ľudia '
        + 'bežne nesú naraz – nejde teda ani tak o konflikt, ako o vec, ktorá sa mení podľa '
        + 'situácie.',
    /* -------------------------------------------------------------- takeaways */
    'synthesis.compose.takeaways.standfirst': 'Celý výklad, stlačený. Nič tu nie je nové – je to to, čo zostane, keď sa zvyšok '
        + 'odoberie.',
    'synthesis.compose.takeaways.entryStandfirst.zero': '{count} tradícia · {support} zhoda',
    'synthesis.compose.takeaways.entryStandfirst.one': '{count} tradícia · {support} zhoda',
    'synthesis.compose.takeaways.entryStandfirst.few': '{count} tradície · {support} zhoda',
    'synthesis.compose.takeaways.entryStandfirst.many': '{count} tradícií · {support} zhoda',
    'synthesis.compose.takeaways.line': '{pillars} opisujú niečo veľmi podobné: {theme}. {note}',
    'synthesis.compose.takeaways.caution': 'Pri tejto téme je namieste opatrnosť, tak ju drž voľne.',
    'synthesis.compose.takeaways.cautionMark': 'Aj tu je namieste opatrnosť.',
    'synthesis.compose.takeaways.clean': 'Nič v mape jej výrazne neodporuje.',
    /* -------------------------------------------------------------- practical */
    'synthesis.compose.practical.standfirst': 'Ten istý výklad, zoradený podľa toho, kde sa naozaj prejaví. Oblasť, ktorá nemá čo '
        + 'povedať, sa radšej vynechá, než by sa vypĺňala.',
    'synthesis.compose.practical.line': 'Výklad tu stojí na tomto: {list}. {note}',
    'synthesis.compose.practical.tension': 'Je to zároveň oblasť, kde sa ukáže {tension}.',
    'synthesis.compose.practical.tensionOpen': 'Práve v tejto oblasti sa ukáže {tension}.',
    /* --------------------------------------------- drives and support table */
    'synthesis.compose.drives.standfirst': 'Na čo podľa symbolov mieriš. Sú tu len tie, za ktorými stojí viac než letmý '
        + 'signál.',
    'synthesis.compose.supportTable.standfirst': 'Všetky témy, ktoré model vyrobil, v poradí, v akom ich zoradil, a s tým, kde pri '
        + 'každej stála ktorá tradícia.',
    'synthesis.compose.supportTable.row': '{theme} — {facet}, {kind}. Významnosť {salience}; {support}. {stances}.',
    'synthesis.compose.facet.style': 'spôsob fungovania',
    'synthesis.compose.facet.drive': 'pohnútka',
    'synthesis.compose.themeKind.convergent': 'tri a viac tradícií',
    'synthesis.compose.themeKind.reinforced': 'dve tradície',
    'synthesis.compose.themeKind.pillar-signature': 'jedna tradícia, ktorá to nesie výrazne',
    'synthesis.compose.stance.supports': 'podporuje',
    'synthesis.compose.stance.opposes': 'hovorí opak',
    'synthesis.compose.stance.both': 'hovorí oboje',
    'synthesis.compose.stance.silent': 'nehovorí o tom nič',
    'synthesis.compose.stance.unavailable': 'nedalo sa prečítať',
    'synthesis.compose.human.need.freedom': 'Potrebuješ {list}.',
    'synthesis.compose.human.need.depth': 'V hĺbke potrebuješ {list}.',
    'synthesis.compose.human.need.making': 'Chceš {list}.',
    'synthesis.compose.human.need.people': 'Hľadáš {list}.',
    'synthesis.compose.human.need.method': 'Najlepšie ti je, keď máš {list}.',
    'synthesis.compose.human.need.freedom.soft': 'Zdá sa, že potrebuješ {list}.',
    'synthesis.compose.human.need.depth.soft': 'V hĺbke zrejme potrebuješ {list}.',
    'synthesis.compose.human.need.making.soft': 'Zdá sa, že chceš {list}.',
    'synthesis.compose.human.need.people.soft': 'Zdá sa, že hľadáš {list}.',
    'synthesis.compose.human.need.method.soft': 'Zrejme ti je najlepšie, keď máš {list}.',
    'synthesis.compose.human.need.fused.freedom': 'Nakoniec potrebuješ {list}.',
    'synthesis.compose.human.need.fused.depth': 'Najviac potrebuješ {list}.',
    'synthesis.compose.human.need.fused.making': 'Ide ti o {list}.',
    'synthesis.compose.human.need.fused.people': 'Hľadáš najmä {list}.',
    'synthesis.compose.human.need.fused.method': 'Najviac ti pomáha, keď máš {list}.',
    'synthesis.compose.human.need.fused.freedom.soft': 'Nakoniec zrejme potrebuješ {list}.',
    'synthesis.compose.human.need.fused.depth.soft': 'Zdá sa, že potrebuješ {list}.',
    'synthesis.compose.human.need.fused.making.soft': 'Zdá sa, že ti ide o {list}.',
    'synthesis.compose.human.need.fused.people.soft': 'Zdá sa, že hľadáš najmä {list}.',
    'synthesis.compose.human.need.fused.method.soft': 'Zrejme ti najviac pomáha, keď máš {list}.',
    'synthesis.compose.human.need.one.freedom': 'Viac než čokoľvek iné potrebuješ {list}.',
    'synthesis.compose.human.need.one.depth': 'V jadre ti ide o {list}.',
    'synthesis.compose.human.need.one.making': 'Viac než čokoľvek iné chceš {list}.',
    'synthesis.compose.human.need.one.people': 'Viac než čokoľvek iné hľadáš {list}.',
    'synthesis.compose.human.need.one.method': 'Najlepšie ti je, keď máš predovšetkým {list}.',
    'synthesis.compose.human.need.one.freedom.soft': 'Viac než čokoľvek iné zrejme potrebuješ {list}.',
    'synthesis.compose.human.need.one.depth.soft': 'V jadre ti zrejme ide o {list}.',
    'synthesis.compose.human.need.one.making.soft': 'Viac než čokoľvek iné zrejme chceš {list}.',
    'synthesis.compose.human.need.one.people.soft': 'Viac než čokoľvek iné zrejme hľadáš {list}.',
    'synthesis.compose.human.need.one.method.soft': 'Zrejme ti je najlepšie, keď máš predovšetkým {list}.',
    'synthesis.compose.human.needAlso.freedom': 'Potrebuješ aj {list}.',
    'synthesis.compose.human.needAlso.depth': 'Veľa pre teba znamená aj to, keď máš {list}.',
    'synthesis.compose.human.needAlso.making': 'Popri tom chceš {list}.',
    'synthesis.compose.human.needAlso.people': 'Hľadáš aj {list}.',
    'synthesis.compose.human.needAlso.method': 'Pomáha ti aj, keď máš {list}.',
    'synthesis.compose.human.needAlso.freedom.soft': 'Zrejme potrebuješ aj {list}.',
    'synthesis.compose.human.needAlso.depth.soft': 'Zdá sa, že potrebuješ aj {list}.',
    'synthesis.compose.human.needAlso.making.soft': 'Popri tom zrejme chceš {list}.',
    'synthesis.compose.human.needAlso.people.soft': 'Zrejme hľadáš aj {list}.',
    'synthesis.compose.human.needAlso.method.soft': 'Zrejme ti pomáha aj, keď máš {list}.',
    'synthesis.compose.human.needAlso2.freedom': 'Okrem toho ti pomáha, keď máš {list}.',
    'synthesis.compose.human.needAlso2.depth': 'Okrem toho hľadáš {list}.',
    'synthesis.compose.human.needAlso2.making': 'Popri tom hľadáš aj {list}.',
    'synthesis.compose.human.needAlso2.people': 'Okrem toho potrebuješ {list}.',
    'synthesis.compose.human.needAlso2.method': 'Okrem toho chceš {list}.',
    'synthesis.compose.human.needAlso2.freedom.soft': 'Okrem toho ti zrejme pomáha, keď máš {list}.',
    'synthesis.compose.human.needAlso2.depth.soft': 'Okrem toho zrejme hľadáš {list}.',
    'synthesis.compose.human.needAlso2.making.soft': 'Popri tom zrejme hľadáš aj {list}.',
    'synthesis.compose.human.needAlso2.people.soft': 'Okrem toho zrejme potrebuješ {list}.',
    'synthesis.compose.human.needAlso2.method.soft': 'Okrem toho zrejme chceš {list}.',
    'synthesis.compose.human.act.freedom': 'Máš sklon {list}.',
    'synthesis.compose.human.act.depth': 'Zvykneš {list}.',
    'synthesis.compose.human.act.making': 'Máš vo zvyku {list}.',
    'synthesis.compose.human.act.people': 'Tvoj prvý inštinkt je {list}.',
    'synthesis.compose.human.act.method': 'Tvoj spôsob práce je {list}.',
    'synthesis.compose.human.act.freedom.soft': 'Často máš sklon {list}.',
    'synthesis.compose.human.act.depth.soft': 'Často zvykneš {list}.',
    'synthesis.compose.human.act.making.soft': 'Často máš vo zvyku {list}.',
    'synthesis.compose.human.act.people.soft': 'Tvoj prvý inštinkt často býva {list}.',
    'synthesis.compose.human.act.method.soft': 'Tvoj spôsob práce zvyčajne býva {list}.',
    'synthesis.compose.human.actAlso.freedom': 'Máš aj sklon {list}.',
    'synthesis.compose.human.actAlso.depth': 'Zvykneš aj {list}.',
    'synthesis.compose.human.actAlso.making': 'Je ti tiež vlastné {list}.',
    'synthesis.compose.human.actAlso.people': 'Ďalší tvoj inštinkt je {list}.',
    'synthesis.compose.human.actAlso.method': 'Súčasťou tvojho postupu je {list}.',
    'synthesis.compose.human.actAlso.freedom.soft': 'Zrejme máš aj sklon {list}.',
    'synthesis.compose.human.actAlso.depth.soft': 'Často zvykneš aj {list}.',
    'synthesis.compose.human.actAlso.making.soft': 'Zdá sa, že ti je vlastné aj {list}.',
    'synthesis.compose.human.actAlso.people.soft': 'Ďalším tvojím inštinktom zrejme býva {list}.',
    'synthesis.compose.human.actAlso.method.soft': 'Súčasťou tvojho postupu zrejme býva {list}.',
    'synthesis.compose.human.actToo': 'Okrem toho zvykneš {list}.',
    'synthesis.compose.human.actToo.soft': 'Zdá sa, že zvykneš aj {list}.',
    'synthesis.compose.human.tentative.need': 'Menej výrazne hľadáš aj {list}.',
    'synthesis.compose.human.tentative.needSingle': 'Jedna strana výkladu ukazuje aj na {list}.',
    'synthesis.compose.human.tentative.act': 'V niektorých situáciách máš možno sklon aj {list}.',
    /* The conditions are infinitives after `môžeš`, so one frame takes them all in
       one form - the colon apposition the handles needed is gone with them. */
    'synthesis.compose.human.life.work-career': 'V práci sa ti darí najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.life.relationships': 'S blízkymi ľuďmi to funguje najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.life.decision-making': 'Najlepšie sa rozhoduješ, keď môžeš {list}.',
    'synthesis.compose.human.life.communication': 'V rozhovore ti to ide najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.life.money-material': 'S peniazmi a praktickými vecami ti to ide najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.life.work-career.soft': 'V práci sa ti pravdepodobne darí najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.life.relationships.soft': 'S blízkymi ľuďmi to zvyčajne funguje najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.life.decision-making.soft': 'Pravdepodobne sa najlepšie rozhoduješ, keď môžeš {list}.',
    'synthesis.compose.human.life.communication.soft': 'V rozhovore ti to zrejme ide najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.life.money-material.soft': 'S peniazmi a praktickými vecami ti to pravdepodobne ide najlepšie, keď môžeš {list}.',
    'synthesis.compose.human.close.freedom': 'Zjednodušene: potrebuješ {list}.',
    'synthesis.compose.human.close.depth': 'V podstate potrebuješ {list}.',
    'synthesis.compose.human.close.making': 'Povedané priamo, potrebuješ {list}.',
    'synthesis.compose.human.close.people': 'Keď sa to zloží dokopy, potrebuješ {list}.',
    'synthesis.compose.human.close.method': 'Celkovo vzaté potrebuješ {list}.',
    'synthesis.compose.human.close.freedom.soft': 'Zjednodušene: pravdepodobne potrebuješ {list}.',
    'synthesis.compose.human.close.depth.soft': 'V podstate pravdepodobne potrebuješ {list}.',
    'synthesis.compose.human.close.making.soft': 'Povedané priamo, pravdepodobne potrebuješ {list}.',
    'synthesis.compose.human.close.people.soft': 'Keď sa to zloží dokopy, pravdepodobne potrebuješ {list}.',
    'synthesis.compose.human.close.method.soft': 'Celkovo vzaté pravdepodobne potrebuješ {list}.',
    'synthesis.why': 'Prečo sa to tu objavuje',
    'synthesis.whyNote': 'Vychádza to z týchto tradícií: {pillars}. Konkrétne výsledky za každou časťou '
        + 'výkladu aj s váhami sú nižšie v Technických podrobnostiach.',
    'synthesis.notice.estimatedTime': 'Čas narodenia nie je známy. Číta sa tu len to, čo určuje samotný dátum narodenia; '
        + 'čo závisí od hodiny, sa vynecháva, nie odhaduje.',
    'synthesis.notice.approximateTime': 'Tento výklad vychádza z tvojho odhadu času narodenia. Všetko, čo by sa v rozpätí dvoch '
        + 'hodín od neho mohlo zmeniť, tu má menšiu váhu.',
    'synthesis.notice.why': 'Prečo na tom záleží',
    'synthesis.compose.practical.noTension': 'Tradície sa v tejto oblasti neťahajú proti sebe.',
    /* --------------------------------------------------- headline and opening */
    'synthesis.compose.headline.none': 'Naprieč systémami sa neukázal jeden vzorec',
    'synthesis.compose.intro.converges.1': 'Jediná dostupná symbolická tradícia hovorí najsilnejšie o jednom: {theme}{then}.',
    'synthesis.compose.intro.converges.2': 'Dve odlišné symbolické tradície sa najsilnejšie zhodujú v jednom: {theme}{then}.',
    'synthesis.compose.intro.converges.3': 'Tri odlišné symbolické tradície sa najsilnejšie zhodujú v jednom: {theme}{then}.',
    'synthesis.compose.intro.converges.4': 'Štyri odlišné symbolické tradície sa najsilnejšie zhodujú v jednom: {theme}{then}.',
    'synthesis.compose.intro.converges.n': 'Odlišné symbolické tradície – je ich {count} – sa najsilnejšie zhodujú v jednom: '
        + '{theme}{then}.',
    'synthesis.compose.intro.then': ', hneď za tým {list}',
    /* Capitalised and masculine, for „sporný bod“. */
    'synthesis.compose.intro.axes.zero': '{count} sporný bod medzi nimi nie je skutočný, hoci práve sporné body bývajú tou '
        + 'zaujímavejšou časťou.',
    'synthesis.compose.intro.axes.one': '{count} sporný bod medzi nimi je skutočný a práve ten býva tou zaujímavejšou '
        + 'časťou.',
    'synthesis.compose.intro.axes.few': '{count} sporné body medzi nimi sú skutočné a práve tie bývajú tou zaujímavejšou '
        + 'časťou.',
    'synthesis.compose.intro.axes.many': '{count} sporných bodov medzi nimi je skutočných a práve tie bývajú tou '
        + 'zaujímavejšou časťou.',
    'synthesis.compose.intro.none.1': 'S jedinou dostupnou symbolickou tradíciou sa silná ani stredná zhoda nedá '
        + 'dosiahnuť. To je skutočný výsledok, nie chýbajúci, a to, v čom sa systémy '
        + 'rozchádzajú, je nižšie miesto, kde má práve táto mapa čo povedať.',
    'synthesis.compose.intro.none.2': 'Dve odlišné symbolické tradície sa silno ani stredne nezhodli na žiadnej téme. To '
        + 'je skutočný výsledok, nie chýbajúci, a to, v čom sa rozchádzajú, je nižšie miesto, '
        + 'kde má práve táto mapa čo povedať.',
    'synthesis.compose.intro.none.3': 'Tri odlišné symbolické tradície sa silno ani stredne nezhodli na žiadnej téme. To '
        + 'je skutočný výsledok, nie chýbajúci, a to, v čom sa rozchádzajú, je nižšie miesto, '
        + 'kde má práve táto mapa čo povedať.',
    'synthesis.compose.intro.none.4': 'Štyri odlišné symbolické tradície sa silno ani stredne nezhodli na žiadnej téme. To '
        + 'je skutočný výsledok, nie chýbajúci, a to, v čom sa rozchádzajú, je nižšie miesto, '
        + 'kde má práve táto mapa čo povedať.',
    'synthesis.compose.intro.none.n': 'Odlišné symbolické tradície – je ich {count} – sa silno ani stredne nezhodli na '
        + 'žiadnej téme. To je skutočný výsledok, nie chýbajúci, a to, v čom sa rozchádzajú, '
        + 'je nižšie miesto, kde má práve táto mapa čo povedať.',
    /* ------------------------------------------------------- the interactions */
    'synthesis.compose.interaction.lead.tension': 'Najostrejšie je na tejto kombinácii rozdelenie, ktoré si systémy medzi sebou '
        + 'nevyriešia. {heavierFacts} ukazujú na {heavierPole}. {lighterFacts} ukazujú na '
        + '{lighterPole}.',
    'synthesis.compose.interaction.lead.convergence': 'Najzreteľnejšie je na tejto kombinácii to, koľko z nej hovorí jedno a to isté. '
        + 'Toto sa zbieha na jednom – {theme} – a hovoria to systémy, ktorých je {count} a '
        + 'navzájom o sebe nevedia: {facts}.',
    'synthesis.compose.interaction.sources': 'Tie dve strany ani nestoja na rovnakom vstupe: na jednej {heavierSources}, na '
        + 'druhej {lighterSources}.',
    'synthesis.compose.interaction.reinforcement': 'Na jedno a to isté – {theme} – ukazuje toto: {facts}.',
    'synthesis.compose.interaction.tensionLine': '{heavierFacts} ukazujú na {heavierPole}. {lighterFacts} ukazujú na {lighterPole}.',
    'synthesis.compose.interaction.restsOn': 'Stojí to tu na tomto: {facts}.',
    /* -------------------------------------------------------- the mechanisms */
    'synthesis.compose.mechanism.shared': 'To spoločné je užšie než {theme}: {emergent}.',
    'synthesis.compose.mechanism.against': 'Proti tomu stojí toto:',
    'synthesis.compose.mechanism.inPractice': 'V praxi: {emergent}.',
    'synthesis.compose.mechanism.takeaway': '{pillars} k tomu dospeli oddelene: {emergent}.',
    'synthesis.compose.interaction.concretely': 'Konkrétne: {facts}.',
    'synthesis.compose.interaction.input.numerology': 'tvoje meno a dátum narodenia',
    'synthesis.compose.interaction.input.astrology': 'obloha v okamihu tvojho narodenia',
    'synthesis.compose.interaction.input.bazi': 'šesťdesiatčlenný kalendár',
    'synthesis.compose.interaction.input.human-design': 'dva okamihy, z ktorých sa dizajn číta',
    /* ---------------------------------------------------- the summary card -- */
    'synthesis.compose.unified.subject.relationships': 'vzťahy',
    'synthesis.compose.unified.subject.work-career': 'práca a kariéra',
    'synthesis.compose.unified.subject.growth': 'rast a učenie',
    'synthesis.compose.unified.subject.stress-shadow': 'stres a tieňové vzorce',
    'synthesis.compose.unified.domain.empty': 'V tejto oblasti ({subject}) nebola žiadna téma dosť silná na to, aby sme ju '
        + 'uviedli. Systémy tu skôr mlčia, než by sa zhodovali, a jednotlivé pilierové '
        + 'výklady ju aj tak pokrývajú.',
    'synthesis.compose.unified.domain.agreed': 'Naprieč systémami sa tejto oblasti ({subject}) dotýka toto: {list}.',
    'synthesis.compose.unified.domain.noAgreed': 'Do tejto oblasti ({subject}) nesiaha žiadna téma, na ktorej sa systémy zhodli; to, '
        + 'čo o nej hovoria, je skôr sporné než ustálené.',
    'synthesis.compose.unified.domain.disputed.one': ' {list} sa jej tiež dotýka, no patrí k tomu, v čom sa systémy rozchádzajú.',
    'synthesis.compose.unified.domain.disputed.many': ' {list} sa jej tiež dotýkajú, no patria k tomu, v čom sa systémy rozchádzajú.',
    'synthesis.compose.unified.domain.axes.one': ' Sporný bod, ktorý sem patrí: {list}.',
    'synthesis.compose.unified.domain.axes.many': ' Sporné body, ktoré sem patria: {list}.',
    'synthesis.compose.unified.domain.noAxes': ' Nezasahuje sem žiadny sporný bod.',
    /* The count clause carries its own verb, because Slovak conjugates it
       differently for one, for two-to-four and for five-and-up. */
    'synthesis.compose.unified.map.converge': '{count} tradície sa najsilnejšie zhodujú v jednom: {theme}{behind}. {axes}',
    'synthesis.compose.unified.map.behind': ', hneď za tým {list}',
    'synthesis.compose.unified.map.axes.zero': 'Nie je medzi nimi žiadny sporný bod.',
    'synthesis.compose.unified.map.axes.one': 'Je medzi nimi jeden sporný bod.',
    'synthesis.compose.unified.map.axes.few': 'Sú medzi nimi {count} sporné body.',
    'synthesis.compose.unified.map.axes.many': 'Je medzi nimi {count} sporných bodov.',
    'synthesis.compose.unified.map.none.1': 'S jediným dostupným systémom sa zhoda nedá posúdiť. Je to skutočný výsledok, nie '
        + 'chýbajúci.',
    'synthesis.compose.unified.map.none.2': 'Dva dostupné systémy sa silno ani stredne nezhodli na žiadnej téme. Je to skutočný '
        + 'výsledok, nie chýbajúci.',
    'synthesis.compose.unified.map.none.3': 'Tri dostupné systémy sa silno ani stredne nezhodli na žiadnej téme. Je to skutočný '
        + 'výsledok, nie chýbajúci.',
    'synthesis.compose.unified.map.none.4': 'Štyri dostupné systémy sa silno ani stredne nezhodli na žiadnej téme. Je to '
        + 'skutočný výsledok, nie chýbajúci.',
    'synthesis.compose.unified.map.none.n': 'Dostupné systémy – je ich {count} – sa silno ani stredne nezhodli na žiadnej téme. '
        + 'Je to skutočný výsledok, nie chýbajúci.',
    'synthesis.compose.unified.strength': '{theme} ({count} z {total} systémov, {support} zhoda)',
    'synthesis.compose.unified.noStrength': 'Žiadna téma nebola dosť silná na uvedenie naprieč dvoma či viacerými systémami.',
    'synthesis.compose.unified.tension': '{axis}: {poleA} verzus {poleB} ({kind})',
    'synthesis.compose.unified.kind.true': 'skutočné napätie',
    'synthesis.compose.unified.kind.contextual': 'kontextová dvojakosť',
    'synthesis.compose.unified.noTension': 'Medzi systémami nie je žiadny sporný bod, ktorý by stál za zmienku.',
    'synthesis.compose.unified.rec.test': 'Najsilnejšie zhody si over na tom, ako naozaj vyzeral tvoj posledný mesiac, '
        + 'nie na tom, ako o sebe premýšľaš. Zhoda medzi systémami ti hovorí, ktoré časti '
        + 'výkladu si over najskôr – nie ktoré sú pravdivé.',
    'synthesis.compose.unified.rec.readAxes': 'Najprv si prečítaj {axes} a až potom zhody. Tam, kde sa systémy nezhodujú, má '
        + 'výklad zvyčajne čo povedať konkrétne, lebo rozdelenie opisuje človeka, ktorý robí '
        + 'dve veci, nie jednu.',
    'synthesis.compose.unified.rec.axes.zero': 'sporné body',
    'synthesis.compose.unified.rec.axes.one': 'jediný sporný bod',
    'synthesis.compose.unified.rec.axes.few': '{count} sporné body',
    'synthesis.compose.unified.rec.axes.many': '{count} sporných bodov',
    'synthesis.compose.unified.rec.nothingContested': 'V tejto mape nemajú systémy žiadny sporný bod, takže jednotlivé pilierové výklady '
        + 'ti povedia viac než tento súhrn.',
    'synthesis.compose.unified.rec.narrow': 'Každý pilierový výklad je vo vlastných hraniciach úplný a hovorí veľa vecí, ktoré '
        + 'by neprežili overenie voči trom ďalším tradíciám. Táto vrstva je zámerne tá úzka '
        + 'časť.',
    'synthesis.compose.unified.q.visible': 'Kde by v bežnom týždni niekto zvonku naozaj videl toto – {theme}?',
    'synthesis.compose.unified.q.recognised': 'Ktorý zo štyroch pilierových výkladov opísal niečo, čo v sebe poznáš, a '
        + 'ktorý nie?',
    'synthesis.compose.unified.q.axis': 'Pri tomto spornom bode – {axis} – ktorá strana sa ukazuje v práci a ktorá doma? '
        + 'Alebo sa to u teba takto nedelí?',
    'synthesis.compose.unified.q.expect': 'Na čom by sa podľa teba mali štyri symbolické tradície o tebe zhodnúť – a zhodli sa?',
    'synthesis.compose.unified.q.evidence': 'Čo by ti muselo zmeniť názor na najsilnejšiu tému, ktorá tu je?',
};
const TABLES = { en: EN, sk: SK };
/**
 * One UI string.
 *
 * Falls back to English by the single rule stated in locale.ts. It cannot
 * return a key name or an empty string: `EN` is exhaustive over UiStringKey, so
 * the final lookup always hits.
 */
export function t(key, locale = activeLocale()) {
    const text = TABLES[locale]?.[key] ?? TABLES[FALLBACK_LOCALE][key] ?? EN[key];
    /* A Slovak string may carry a gender token (readerGrammar.ts); English never
       does, and the resolver is a no-op on text without a brace-and-pipe group,
       so the `{name}` placeholders tf() fills in afterwards pass through it. */
    return locale === FALLBACK_LOCALE ? text : resolveReaderGrammar(text);
}
/**
 * One UI string with values substituted into it.
 *
 * `{name}` placeholders, replaced from `params`. This exists so a sentence that
 * mentions a place or a vessel stays ONE translatable sentence: building it by
 * concatenation would freeze English word order into every language, and Slovak
 * needs the noun and the value in the other order to stay grammatical.
 *
 * An unknown placeholder is left visible rather than blanked, so a missing
 * parameter shows up in review instead of silently producing a gap.
 */
export function tf(key, params, locale = activeLocale()) {
    return t(key, locale).replace(/\{(\w+)\}/g, (whole, name) => {
        const value = params[name];
        return value === undefined ? whole : String(value);
    });
}
/** Keys with no translation in a locale. Used by the coverage test and report. */
export function untranslatedKeys(locale) {
    if (locale === FALLBACK_LOCALE)
        return [];
    const table = TABLES[locale] ?? {};
    return Object.keys(EN).filter((key) => table[key] === undefined);
}
export const UI_STRING_KEYS = Object.keys(EN);
