/* No imports of its own: the startup boundary's door, used by the last statement below. */
import { markEntryAlive } from './startupBridge.js?v=f9ab0a6';
/* The language is applied before any other module evaluates a template, so
   the flow is never painted in one language and corrected into another. */
import './localeControl.js?v=f9ab0a6';
/* The menu's tap impulse comes next: it holds a tap on a card back for a beat, so it must precede every listener that opens a destination. */
import './menuTapSonarInstall.js?v=f9ab0a6';
import './onboardingStaticText.js?v=f9ab0a6';
// The global background lift. First, so the ambient layer exists from the very
// first paint and sits directly above the map for every screen of the flow.
/* First, so every later stylesheet can be written against the mode and a
   constrained device never renders an expensive frame before it is known. */
import './deviceCapabilityMode.js?v=f9ab0a6';
import './onboardingAmbientBackdrop.js?v=f9ab0a6';
import './earlyPlaceReveal.js?v=f9ab0a6';
import './placeResultsPolish.js?v=f9ab0a6';
import './placeGlassRefinement.js?v=f9ab0a6';
import './vesselOrbit.core.js?v=f9ab0a6';
import './vesselArrowCarousel.js?v=f9ab0a6';
import './vesselConfirmHandoff.js?v=f9ab0a6';
import './profileVisualIsolation.js?v=f9ab0a6';
import './arrivalPicker.js?v=f9ab0a6';
import './arrivalCalendarStability.js?v=f9ab0a6';
import './arrivalConfirmationGuard.js?v=f9ab0a6';
import './profileFlowPolish.js?v=f9ab0a6';
import './identityFieldPolish.js?v=f9ab0a6';
import './arrivalGlassRefinement.js?v=f9ab0a6';
import './profileControlsPolish.js?v=f9ab0a6';
import './onboardingBackNavigation.js?v=f9ab0a6';
import './vesselTransitionStability.js?v=f9ab0a6';
import './vesselGlyphAlignment.js?v=f9ab0a6';
import './onboardingGlassSystem.js?v=f9ab0a6';
import './onboardingTapHighlightPolish.js?v=f9ab0a6';
import './placeSelectedLayout.js?v=f9ab0a6';
import './onboardingUnifiedLayout.js?v=f9ab0a6';
import './arrivalTimeEditorPolish.js?v=f9ab0a6';
import './arrivalDateConfirmationPolish.js?v=f9ab0a6';
import './arrivalPeriodSonar.js?v=f9ab0a6';
import './arrivalDateOverlayLayout.js?v=f9ab0a6';
import './vesselEntryReveal.js?v=f9ab0a6';
import './placeVesselReviewPolish.js?v=f9ab0a6';
import './onboardingLayerArchitecture.js?v=f9ab0a6';
import './arrivalPickerOverlayAnchor.js?v=f9ab0a6';
import './onboardingPromptAlignment.js?v=f9ab0a6';
import './profileEarthViewportLock.js?v=f9ab0a6';
import './arrivalWeekdayPolish.js?v=f9ab0a6';
/* Keep the actual VESSEL arrow/effect controller after every effect/glass module.
   It owns the final visual state of the globe rim, gender glyph, inactive
   neighbour glyphs and Confirm Vessel rim. The geometry-only spacing pass stays
   immediately after it. The clickable-neighbour pass then makes those existing
   ghost glyphs the only visible previous/next controls while delegating to the
   same authoritative carousel controller. The final overview modules reuse the
   approved VESSEL visuals without redefining the underlying effect system. */
import './vesselArrowOnlyPolish.js?v=f9ab0a6';
import './vesselNeighborPreviewSpacing.js?v=f9ab0a6';
import './vesselClickableNeighborGlyphs.js?v=f9ab0a6';
import './onboardingVesselCoreSymbol.js?v=f9ab0a6';
import './profileOverviewFlow.js?v=f9ab0a6';
import './profileOverviewAndroidStability.js?v=f9ab0a6';
import './profileOverviewFitPolish.js?v=f9ab0a6';
import './profileOverviewEditRecovery.js?v=f9ab0a6';
import './onboardingTransitions.js?v=f9ab0a6';
import './onboardingEarthIntroSequence.js?v=f9ab0a6';
// The real navigation consumers of the black-boundary controller. Imported
// after it so the controller's cover exists before any route can run.
import './onboardingOverlayRoutes.js?v=f9ab0a6';
// The pillar experience: engine binding, hub and pillar views. Imported after
// the transition owner so it can reuse the approved card transition.
import './premiumPillarExperience.js?v=f9ab0a6';
// The numerology forecast surface. After the pillar experience, so the hub it
// attaches its entry point to already exists.
import './numerologyForecastExperience.js?v=f9ab0a6';
import './forecastMoonStage.js?v=f9ab0a6';
// The Tarot destination: the seventh stop of the strip, on a surface of its own, like the forecast.
import './tarotExperience.js?v=f9ab0a6';
// The Connections destination: the relationship layer, on a surface of its own. This is only its door; the engine and the content load on first open.
import './connectionsExperience.js?v=f9ab0a6';
/* The haptics switch, in the Options sheet beside the language switch. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './hapticsControl.js?v=f9ab0a6';
import './hapticTapFeedback.js?v=f9ab0a6';
/* Settings -> Colors: Interface Color and Earth Glow, migrated and applied at load, in the same sheet. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './colorsControl.js?v=f9ab0a6';
// The main menu: the first stop of the strip, on a surface of its own.
import './menuExperience.js?v=f9ab0a6';
import './onboardingIntroWatchdog.js?v=f9ab0a6';
import './onboardingEarthGestureAccess.js?v=f9ab0a6';
import './onboardingEarthCameraConstraints.js?v=f9ab0a6';
import './onboardingEarthIdleRotation.js?v=f9ab0a6';
// Scroll-linked longitude nudge on the pillar screens. After the idle drift, so
// the drift owns the baseline motion and this only ever adds to the live pose.
import './pillarScrollEarthRotation.js?v=f9ab0a6';
/* The reading always opens over the globe, whichever route reached it. Beside
   the scroll nudge because both read the same "a reading owns the screen" flag;
   order between them does not matter, as one sets distance and the other
   longitude. */
import './readingEarthGlobeState.js?v=f9ab0a6';
import './onboardingKeyboardViewport.js?v=f9ab0a6';
import './onboardingThemePlayground.js?v=f9ab0a6';
/* After the theme module, so the sheet it appends into usually already exists;
   it watches for the sheet if it does not, so the order is a preference rather
   than a requirement. */
import './qaProfilePresetMenu.js?v=f9ab0a6';
import './onboardingEarthSceneClarity.js?v=f9ab0a6';
/* Locale first: it applies the stored language at module load, before any
   reading is composed, so nothing has to be re-rendered on first paint. */
import './arrivalMenuTransparencyAndHitFix.js?v=f9ab0a6';
/* The encyclopedia bottom sheet. One delegated listener for every info
   control in the app, so it survives the readings being re-rendered. */
import './conceptSheet.js?v=f9ab0a6';
/* The Numerology hero: three glass circles orbiting the Earth. Reads the disc the glow ring is laid on, so after the module that publishes it. */
import './numerologyOrbitHero.js?v=f9ab0a6';
/* The position-specific meanings opened by the four Numerology hero circles. */
import './numerologyMeaningSheet.js?v=f9ab0a6';
/* The KT sonar effect on the four Numerology hero circles, taking turns (CSS only). */
import './numerologyAffordances.js?v=f9ab0a6';
/* The Western Astrology hero: the Sun, the Moon and the Ascendant labelled on the scene, which is held in an authored pose while the reading is at its top. */
import './astrologyBigThreeHero.js?v=f9ab0a6';
import './astrologyBigThreeSheet.js?v=f9ab0a6';
/* The optional Advanced chart panel under the Western Astrology natal wheel: it redraws the wheel from the model the wheel embeds (no calculation, no request). */
import './astrologyAdvancedChart.js?v=f9ab0a6';
/* What can be tapped in the opened Western Astrology view (a soft sonar ring), and the frosted glass under its natal wheel. CSS only. */
import './premiumAffordances.js?v=f9ab0a6';
import './baziKnowledgeSheet.js?v=f9ab0a6';
/* The KT sonar effect on what can be tapped in the opened BaZi view (CSS only). */
import './baziAffordances.js?v=f9ab0a6';
/* LAST. It normalises the fill and blur of every glass surface the modules
   above declare, so it has to be able to see all of them. */
import './glassSurfaceUnification.js?v=f9ab0a6';
/* After everything, because it drives the finished app rather than adding to
   it: it needs the overview's bridge and the pillar controller's openers to
   exist before it can put a stored profile back. It defers past this module's
   evaluation anyway, so the position is belt and braces rather than the
   mechanism. */
/* The profile identity and Settings. After the theme module, whose sheet it
   takes over, and after the QA menu, whose group it files under a dev heading;
   it waits for the sheet rather than depending on either, so the order is a
   preference and not a requirement. */
import './profileShell.js?v=f9ab0a6';
/* The one floating Back control of Settings: every level of Settings goes back through it. Last, so every level it can stand in already exists. */
import './settingsBackControl.js?v=f9ab0a6';
/* Global ambient micro-spore layer: mounted once after the modules, before session restore. */
import './ambientParticles.js?v=f9ab0a6';
import './profileSessionRestore.js?v=f9ab0a6';
/* WebKit touch recovery is last: no legacy carousel/picker style may re-enable
   the invisible profile disc or add a compositing layer over a native input. */
import './onboardingIosWebkitRecovery.js?v=f9ab0a6';
/* Last statement of the entry: reaching it proves this whole ~600-module graph loaded and evaluated. If it is never reached, the startup
   boundary (an inline script, so it does not depend on this graph) is what tells the person, instead of an endless tunnel. */
markEntryAlive('vesselOrbit');
