/* The language is applied before any other module evaluates a template, so
   the flow is never painted in one language and corrected into another. */
import './localeControl.js';
/* The menu's tap impulse comes next: it holds a tap on a card back for a beat, so it must precede every listener that opens a destination. */
import './menuTapSonarInstall.js';
import './onboardingStaticText.js';
// The global background lift. First, so the ambient layer exists from the very
// first paint and sits directly above the map for every screen of the flow.
/* First, so every later stylesheet can be written against the mode and a
   constrained device never renders an expensive frame before it is known. */
import './deviceCapabilityMode.js';
import './onboardingAmbientBackdrop.js';
import './earlyPlaceReveal.js';
import './placeResultsPolish.js';
import './placeGlassRefinement.js';
import './vesselOrbit.core.js';
import './vesselArrowCarousel.js';
import './vesselConfirmHandoff.js';
import './profileVisualIsolation.js';
import './arrivalPicker.js';
import './arrivalCalendarStability.js';
import './arrivalConfirmationGuard.js';
import './profileFlowPolish.js';
import './identityFieldPolish.js';
import './arrivalGlassRefinement.js';
import './profileControlsPolish.js';
import './onboardingBackNavigation.js';
import './vesselTransitionStability.js';
import './vesselGlyphAlignment.js';
import './onboardingGlassSystem.js';
import './onboardingTapHighlightPolish.js';
import './placeSelectedLayout.js';
import './onboardingUnifiedLayout.js';
import './arrivalTimeEditorPolish.js';
import './arrivalDateConfirmationPolish.js';
import './arrivalPeriodSonar.js';
import './arrivalDateOverlayLayout.js';
import './vesselEntryReveal.js';
import './placeVesselReviewPolish.js';
import './onboardingLayerArchitecture.js';
import './arrivalPickerOverlayAnchor.js';
import './onboardingPromptAlignment.js';
import './profileEarthViewportLock.js';
import './arrivalWeekdayPolish.js';
/* Keep the actual VESSEL arrow/effect controller after every effect/glass module.
   It owns the final visual state of the globe rim, gender glyph, inactive
   neighbour glyphs and Confirm Vessel rim. The geometry-only spacing pass stays
   immediately after it. The clickable-neighbour pass then makes those existing
   ghost glyphs the only visible previous/next controls while delegating to the
   same authoritative carousel controller. The final overview modules reuse the
   approved VESSEL visuals without redefining the underlying effect system. */
import './vesselArrowOnlyPolish.js';
import './vesselNeighborPreviewSpacing.js';
import './vesselClickableNeighborGlyphs.js';
import './onboardingVesselCoreSymbol.js';
import './profileOverviewFlow.js';
import './profileOverviewAndroidStability.js';
import './profileOverviewFitPolish.js';
import './profileOverviewEditRecovery.js';
import './onboardingTransitions.js';
import './onboardingEarthIntroSequence.js';
// The real navigation consumers of the black-boundary controller. Imported
// after it so the controller's cover exists before any route can run.
import './onboardingOverlayRoutes.js';
// The pillar experience: engine binding, hub and pillar views. Imported after
// the transition owner so it can reuse the approved card transition.
import './premiumPillarExperience.js';
// The numerology forecast surface. After the pillar experience, so the hub it
// attaches its entry point to already exists.
import './numerologyForecastExperience.js';
// The Tarot destination: the seventh stop of the strip, on a surface of its own, like the forecast.
import './tarotExperience.js';
/* The haptics switch, in the Options sheet beside the language switch. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './hapticsControl.js';
import './hapticTapFeedback.js';
/* Settings -> Colors: Interface Color and Earth Glow, migrated and applied at load, in the same sheet. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './colorsControl.js';
// The main menu: the first stop of the strip, on a surface of its own.
import './menuExperience.js';
import './onboardingIntroWatchdog.js';
import './onboardingEarthGestureAccess.js';
import './onboardingEarthCameraConstraints.js';
import './onboardingEarthIdleRotation.js';
// Scroll-linked longitude nudge on the pillar screens. After the idle drift, so
// the drift owns the baseline motion and this only ever adds to the live pose.
import './pillarScrollEarthRotation.js';
/* The reading always opens over the globe, whichever route reached it. Beside
   the scroll nudge because both read the same "a reading owns the screen" flag;
   order between them does not matter, as one sets distance and the other
   longitude. */
import './readingEarthGlobeState.js';
import './onboardingKeyboardViewport.js';
import './onboardingThemePlayground.js';
/* After the theme module, so the sheet it appends into usually already exists;
   it watches for the sheet if it does not, so the order is a preference rather
   than a requirement. */
import './qaProfilePresetMenu.js';
import './onboardingEarthSceneClarity.js';
/* Locale first: it applies the stored language at module load, before any
   reading is composed, so nothing has to be re-rendered on first paint. */
import './arrivalMenuTransparencyAndHitFix.js';
/* The encyclopedia bottom sheet. One delegated listener for every info
   control in the app, so it survives the readings being re-rendered. */
import './conceptSheet.js';
/* The Numerology hero: three glass circles orbiting the Earth. Reads the disc the glow ring is laid on, so after the module that publishes it. */
import './numerologyOrbitHero.js';
/* The position-specific meanings opened by the four Numerology hero circles. */
import './numerologyMeaningSheet.js';
/* The KT sonar effect on the four Numerology hero circles, taking turns (CSS only). */
import './numerologyAffordances.js';
/* The Western Astrology hero: the Sun, the Moon and the Ascendant labelled on the scene, which is held in an authored pose while the reading is at its top. */
import './astrologyBigThreeHero.js';
import './astrologyBigThreeSheet.js';
/* The optional Advanced chart panel under the Western Astrology natal wheel: it redraws the wheel from the model the wheel embeds (no calculation, no request). */
import './astrologyAdvancedChart.js';
/* What can be tapped in the opened Western Astrology view (a soft sonar ring), and the frosted glass under its natal wheel. CSS only. */
import './premiumAffordances.js';
import './baziKnowledgeSheet.js';
/* The KT sonar effect on what can be tapped in the opened BaZi view (CSS only). */
import './baziAffordances.js';
/* LAST. It normalises the fill and blur of every glass surface the modules
   above declare, so it has to be able to see all of them. */
import './glassSurfaceUnification.js';
/* After everything, because it drives the finished app rather than adding to
   it: it needs the overview's bridge and the pillar controller's openers to
   exist before it can put a stored profile back. It defers past this module's
   evaluation anyway, so the position is belt and braces rather than the
   mechanism. */
/* The profile identity and Settings. After the theme module, whose sheet it
   takes over, and after the QA menu, whose group it files under a dev heading;
   it waits for the sheet rather than depending on either, so the order is a
   preference and not a requirement. */
import './profileShell.js';
/* The one floating Back control of Settings: every level of Settings goes back through it. Last, so every level it can stand in already exists. */
import './settingsBackControl.js';
/* Global ambient micro-spore layer: mounted once after the modules, before session restore. */
import './ambientParticles.js';
import './profileSessionRestore.js';
