/* No imports of its own: the startup boundary's door, used by the last statement below. */
import { markEntryAlive } from './startupBridge.js?v=4cd804d';
/* The language is applied before any other module evaluates a template, so
   the flow is never painted in one language and corrected into another. */
import './localeControl.js?v=4cd804d';
/* The menu's tap impulse comes next: it holds a tap on a card back for a beat, so it must precede every listener that opens a destination. */
import './menuTapSonarInstall.js?v=4cd804d';
import './onboardingStaticText.js?v=4cd804d';
// The global background lift. First, so the ambient layer exists from the very
// first paint and sits directly above the map for every screen of the flow.
/* First, so every later stylesheet can be written against the mode and a
   constrained device never renders an expensive frame before it is known. */
import './deviceCapabilityMode.js?v=4cd804d';
import './onboardingAmbientBackdrop.js?v=4cd804d';
import './earlyPlaceReveal.js?v=4cd804d';
import './placeResultsPolish.js?v=4cd804d';
import './placeGlassRefinement.js?v=4cd804d';
import './vesselOrbit.core.js?v=4cd804d';
import './vesselArrowCarousel.js?v=4cd804d';
import './vesselConfirmHandoff.js?v=4cd804d';
import './profileVisualIsolation.js?v=4cd804d';
import './arrivalPicker.js?v=4cd804d';
import './arrivalCalendarStability.js?v=4cd804d';
import './arrivalConfirmationGuard.js?v=4cd804d';
import './profileFlowPolish.js?v=4cd804d';
import './identityFieldPolish.js?v=4cd804d';
import './arrivalGlassRefinement.js?v=4cd804d';
import './profileControlsPolish.js?v=4cd804d';
import './onboardingBackNavigation.js?v=4cd804d';
import './vesselTransitionStability.js?v=4cd804d';
import './vesselGlyphAlignment.js?v=4cd804d';
import './onboardingGlassSystem.js?v=4cd804d';
import './onboardingTapHighlightPolish.js?v=4cd804d';
import './placeSelectedLayout.js?v=4cd804d';
import './onboardingUnifiedLayout.js?v=4cd804d';
import './arrivalTimeEditorPolish.js?v=4cd804d';
import './arrivalDateConfirmationPolish.js?v=4cd804d';
import './arrivalPeriodSonar.js?v=4cd804d';
import './arrivalDateOverlayLayout.js?v=4cd804d';
import './vesselEntryReveal.js?v=4cd804d';
import './placeVesselReviewPolish.js?v=4cd804d';
import './onboardingLayerArchitecture.js?v=4cd804d';
import './arrivalPickerOverlayAnchor.js?v=4cd804d';
import './onboardingPromptAlignment.js?v=4cd804d';
import './profileEarthViewportLock.js?v=4cd804d';
import './arrivalWeekdayPolish.js?v=4cd804d';
/* Keep the actual VESSEL arrow/effect controller after every effect/glass module.
   It owns the final visual state of the globe rim, gender glyph, inactive
   neighbour glyphs and Confirm Vessel rim. The geometry-only spacing pass stays
   immediately after it. The clickable-neighbour pass then makes those existing
   ghost glyphs the only visible previous/next controls while delegating to the
   same authoritative carousel controller. The final overview modules reuse the
   approved VESSEL visuals without redefining the underlying effect system. */
import './vesselArrowOnlyPolish.js?v=4cd804d';
import './vesselNeighborPreviewSpacing.js?v=4cd804d';
import './vesselClickableNeighborGlyphs.js?v=4cd804d';
import './onboardingVesselCoreSymbol.js?v=4cd804d';
import './profileOverviewFlow.js?v=4cd804d';
import './profileOverviewAndroidStability.js?v=4cd804d';
import './profileOverviewFitPolish.js?v=4cd804d';
import './profileOverviewEditRecovery.js?v=4cd804d';
import './onboardingTransitions.js?v=4cd804d';
import './onboardingEarthIntroSequence.js?v=4cd804d';
// The real navigation consumers of the black-boundary controller. Imported
// after it so the controller's cover exists before any route can run.
import './onboardingOverlayRoutes.js?v=4cd804d';
// The pillar experience: engine binding, hub and pillar views. Imported after
// the transition owner so it can reuse the approved card transition.
import './premiumPillarExperience.js?v=4cd804d';
// The numerology forecast surface. After the pillar experience, so the hub it
// attaches its entry point to already exists.
import './numerologyForecastExperience.js?v=4cd804d';
import './forecastMoonStage.js?v=4cd804d';
// The Tarot destination: the seventh stop of the strip, on a surface of its own, like the forecast.
import './tarotExperience.js?v=4cd804d';
// The Connections destination: the relationship layer, on a surface of its own. This is only its door; the engine and the content load on first open.
import './connectionsExperience.js?v=4cd804d';
/* The haptics switch, in the Options sheet beside the language switch. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './hapticsControl.js?v=4cd804d';
import './hapticTapFeedback.js?v=4cd804d';
/* Settings -> Colors: Interface Color and Earth Glow, migrated and applied at load, in the same sheet. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './colorsControl.js?v=4cd804d';
// The main menu: the first stop of the strip, on a surface of its own.
import './menuExperience.js?v=4cd804d';
import './onboardingIntroWatchdog.js?v=4cd804d';
import './onboardingEarthGestureAccess.js?v=4cd804d';
import './onboardingEarthCameraConstraints.js?v=4cd804d';
import './onboardingEarthIdleRotation.js?v=4cd804d';
// Scroll-linked longitude nudge on the pillar screens. After the idle drift, so
// the drift owns the baseline motion and this only ever adds to the live pose.
import './pillarScrollEarthRotation.js?v=4cd804d';
/* The reading always opens over the globe, whichever route reached it. Beside
   the scroll nudge because both read the same "a reading owns the screen" flag;
   order between them does not matter, as one sets distance and the other
   longitude. */
import './readingEarthGlobeState.js?v=4cd804d';
import './onboardingKeyboardViewport.js?v=4cd804d';
import './onboardingThemePlayground.js?v=4cd804d';
/* After the theme module, so the sheet it appends into usually already exists;
   it watches for the sheet if it does not, so the order is a preference rather
   than a requirement. */
import './qaProfilePresetMenu.js?v=4cd804d';
import './onboardingEarthSceneClarity.js?v=4cd804d';
/* Locale first: it applies the stored language at module load, before any
   reading is composed, so nothing has to be re-rendered on first paint. */
import './arrivalMenuTransparencyAndHitFix.js?v=4cd804d';
/* The encyclopedia bottom sheet. One delegated listener for every info
   control in the app, so it survives the readings being re-rendered. */
import './conceptSheet.js?v=4cd804d';
/* The Encyclopedia's door: one delegated listener for the library capsule and the article links. The reader and the articles
   are fetched on the first tap, never at start-up (encyclopediaEntry.ts). */
import './encyclopediaEntry.js?v=4cd804d';
/* The Numerology hero: three glass circles orbiting the Earth. Reads the disc the glow ring is laid on, so after the module that publishes it. */
import './numerologyOrbitHero.js?v=4cd804d';
/* The position-specific meanings opened by the four Numerology hero circles. */
import './numerologyMeaningSheet.js?v=4cd804d';
/* The KT sonar effect on the four Numerology hero circles, taking turns (CSS only). */
import './numerologyAffordances.js?v=4cd804d';
/* The Western Astrology hero: the Sun, the Moon and the Ascendant labelled on the scene, which is held in an authored pose while the reading is at its top. */
import './astrologyBigThreeHero.js?v=4cd804d';
import './astrologyBigThreeSheet.js?v=4cd804d';
/* The optional Advanced chart panel under the Western Astrology natal wheel: it redraws the wheel from the model the wheel embeds (no calculation, no request). */
import './astrologyAdvancedChart.js?v=4cd804d';
/* What can be tapped in the opened Western Astrology view (a soft sonar ring), and the frosted glass under its natal wheel. CSS only. */
import './premiumAffordances.js?v=4cd804d';
import './baziKnowledgeSheet.js?v=4cd804d';
/* The KT sonar effect on what can be tapped in the opened BaZi view (CSS only). */
import './baziAffordances.js?v=4cd804d';
/* LAST. It normalises the fill and blur of every glass surface the modules
   above declare, so it has to be able to see all of them. */
import './glassSurfaceUnification.js?v=4cd804d';
/* After everything, because it drives the finished app rather than adding to
   it: it needs the overview's bridge and the pillar controller's openers to
   exist before it can put a stored profile back. It defers past this module's
   evaluation anyway, so the position is belt and braces rather than the
   mechanism. */
/* The profile identity and Settings. After the theme module, whose sheet it
   takes over, and after the QA menu, whose group it files under a dev heading;
   it waits for the sheet rather than depending on either, so the order is a
   preference and not a requirement. */
import './profileShell.js?v=4cd804d';
/* The one floating Back control of Settings: every level of Settings goes back through it. Last, so every level it can stand in already exists. */
import './settingsBackControl.js?v=4cd804d';
/* Global ambient micro-spore layer: mounted once after the modules, before session restore. */
import './ambientParticles.js?v=4cd804d';
/* The first-launch legal gate and the "Continue as …" control both watch the front door's own state attributes; they
   must exist before the restore ends the intro, and neither reads a profile into the app. */
import './legalGate.js?v=4cd804d';
import './continueProfile.js?v=4cd804d';
import './profileSessionRestore.js?v=4cd804d';
/* WebKit touch recovery is last: no legacy carousel/picker style may re-enable
   the invisible profile disc or add a compositing layer over a native input. */
import './onboardingIosWebkitRecovery.js?v=4cd804d';
/* Last statement of the entry: reaching it proves this whole ~600-module graph loaded and evaluated. If it is never reached, the startup
   boundary (an inline script, so it does not depend on this graph) is what tells the person, instead of an endless tunnel. */
markEntryAlive('vesselOrbit');
