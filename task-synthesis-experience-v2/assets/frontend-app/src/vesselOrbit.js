/* The language is applied before any other module evaluates a template, so
   the flow is never painted in one language and corrected into another. */
import './localeControl.js?v=53c0693';
/* The menu's tap impulse comes next: it holds a tap on a card back for a beat, so it must precede every listener that opens a destination. */
import './menuTapSonarInstall.js?v=53c0693';
import './onboardingStaticText.js?v=53c0693';
// The global background lift. First, so the ambient layer exists from the very
// first paint and sits directly above the map for every screen of the flow.
/* First, so every later stylesheet can be written against the mode and a
   constrained device never renders an expensive frame before it is known. */
import './deviceCapabilityMode.js?v=53c0693';
import './onboardingAmbientBackdrop.js?v=53c0693';
import './earlyPlaceReveal.js?v=53c0693';
import './placeResultsPolish.js?v=53c0693';
import './placeGlassRefinement.js?v=53c0693';
import './vesselOrbit.core.js?v=53c0693';
import './vesselArrowCarousel.js?v=53c0693';
import './vesselConfirmHandoff.js?v=53c0693';
import './profileVisualIsolation.js?v=53c0693';
import './arrivalPicker.js?v=53c0693';
import './arrivalCalendarStability.js?v=53c0693';
import './arrivalConfirmationGuard.js?v=53c0693';
import './profileFlowPolish.js?v=53c0693';
import './identityFieldPolish.js?v=53c0693';
import './arrivalGlassRefinement.js?v=53c0693';
import './profileControlsPolish.js?v=53c0693';
import './onboardingBackNavigation.js?v=53c0693';
import './vesselTransitionStability.js?v=53c0693';
import './vesselGlyphAlignment.js?v=53c0693';
import './onboardingGlassSystem.js?v=53c0693';
import './onboardingTapHighlightPolish.js?v=53c0693';
import './placeSelectedLayout.js?v=53c0693';
import './onboardingUnifiedLayout.js?v=53c0693';
import './arrivalTimeEditorPolish.js?v=53c0693';
import './arrivalDateConfirmationPolish.js?v=53c0693';
import './arrivalPeriodSonar.js?v=53c0693';
import './arrivalDateOverlayLayout.js?v=53c0693';
import './vesselEntryReveal.js?v=53c0693';
import './placeVesselReviewPolish.js?v=53c0693';
import './onboardingLayerArchitecture.js?v=53c0693';
import './arrivalPickerOverlayAnchor.js?v=53c0693';
import './onboardingPromptAlignment.js?v=53c0693';
import './profileEarthViewportLock.js?v=53c0693';
import './arrivalWeekdayPolish.js?v=53c0693';
/* Keep the actual VESSEL arrow/effect controller after every effect/glass module.
   It owns the final visual state of the globe rim, gender glyph, inactive
   neighbour glyphs and Confirm Vessel rim. The geometry-only spacing pass stays
   immediately after it. The clickable-neighbour pass then makes those existing
   ghost glyphs the only visible previous/next controls while delegating to the
   same authoritative carousel controller. The final overview modules reuse the
   approved VESSEL visuals without redefining the underlying effect system. */
import './vesselArrowOnlyPolish.js?v=53c0693';
import './vesselNeighborPreviewSpacing.js?v=53c0693';
import './vesselClickableNeighborGlyphs.js?v=53c0693';
import './onboardingVesselCoreSymbol.js?v=53c0693';
import './profileOverviewFlow.js?v=53c0693';
import './profileOverviewAndroidStability.js?v=53c0693';
import './profileOverviewFitPolish.js?v=53c0693';
import './profileOverviewEditRecovery.js?v=53c0693';
import './onboardingTransitions.js?v=53c0693';
import './onboardingEarthIntroSequence.js?v=53c0693';
// The real navigation consumers of the black-boundary controller. Imported
// after it so the controller's cover exists before any route can run.
import './onboardingOverlayRoutes.js?v=53c0693';
// The pillar experience: engine binding, hub and pillar views. Imported after
// the transition owner so it can reuse the approved card transition.
import './premiumPillarExperience.js?v=53c0693';
// The numerology forecast surface. After the pillar experience, so the hub it
// attaches its entry point to already exists.
import './numerologyForecastExperience.js?v=53c0693';
import './forecastMoonStage.js?v=53c0693';
// The Tarot destination: the seventh stop of the strip, on a surface of its own, like the forecast.
import './tarotExperience.js?v=53c0693';
// The Connections destination: the relationship layer, on a surface of its own. This is only its door; the engine and the content load on first open.
import './connectionsExperience.js?v=53c0693';
/* The haptics switch, in the Options sheet beside the language switch. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './hapticsControl.js?v=53c0693';
import './hapticTapFeedback.js?v=53c0693';
/* Settings -> Colors: Interface Color and Earth Glow, migrated and applied at load, in the same sheet. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './colorsControl.js?v=53c0693';
// The main menu: the first stop of the strip, on a surface of its own.
import './menuExperience.js?v=53c0693';
import './onboardingIntroWatchdog.js?v=53c0693';
import './onboardingEarthGestureAccess.js?v=53c0693';
import './onboardingEarthCameraConstraints.js?v=53c0693';
import './onboardingEarthIdleRotation.js?v=53c0693';
// Scroll-linked longitude nudge on the pillar screens. After the idle drift, so
// the drift owns the baseline motion and this only ever adds to the live pose.
import './pillarScrollEarthRotation.js?v=53c0693';
/* The reading always opens over the globe, whichever route reached it. Beside
   the scroll nudge because both read the same "a reading owns the screen" flag;
   order between them does not matter, as one sets distance and the other
   longitude. */
import './readingEarthGlobeState.js?v=53c0693';
import './onboardingKeyboardViewport.js?v=53c0693';
import './onboardingThemePlayground.js?v=53c0693';
/* After the theme module, so the sheet it appends into usually already exists;
   it watches for the sheet if it does not, so the order is a preference rather
   than a requirement. */
import './qaProfilePresetMenu.js?v=53c0693';
import './onboardingEarthSceneClarity.js?v=53c0693';
/* Locale first: it applies the stored language at module load, before any
   reading is composed, so nothing has to be re-rendered on first paint. */
import './arrivalMenuTransparencyAndHitFix.js?v=53c0693';
/* The encyclopedia bottom sheet. One delegated listener for every info
   control in the app, so it survives the readings being re-rendered. */
import './conceptSheet.js?v=53c0693';
/* The Numerology hero: three glass circles orbiting the Earth. Reads the disc the glow ring is laid on, so after the module that publishes it. */
import './numerologyOrbitHero.js?v=53c0693';
/* The position-specific meanings opened by the four Numerology hero circles. */
import './numerologyMeaningSheet.js?v=53c0693';
/* The KT sonar effect on the four Numerology hero circles, taking turns (CSS only). */
import './numerologyAffordances.js?v=53c0693';
/* The Western Astrology hero: the Sun, the Moon and the Ascendant labelled on the scene, which is held in an authored pose while the reading is at its top. */
import './astrologyBigThreeHero.js?v=53c0693';
import './astrologyBigThreeSheet.js?v=53c0693';
/* The optional Advanced chart panel under the Western Astrology natal wheel: it redraws the wheel from the model the wheel embeds (no calculation, no request). */
import './astrologyAdvancedChart.js?v=53c0693';
/* What can be tapped in the opened Western Astrology view (a soft sonar ring), and the frosted glass under its natal wheel. CSS only. */
import './premiumAffordances.js?v=53c0693';
import './baziKnowledgeSheet.js?v=53c0693';
/* The KT sonar effect on what can be tapped in the opened BaZi view (CSS only). */
import './baziAffordances.js?v=53c0693';
/* LAST. It normalises the fill and blur of every glass surface the modules
   above declare, so it has to be able to see all of them. */
import './glassSurfaceUnification.js?v=53c0693';
/* After everything, because it drives the finished app rather than adding to
   it: it needs the overview's bridge and the pillar controller's openers to
   exist before it can put a stored profile back. It defers past this module's
   evaluation anyway, so the position is belt and braces rather than the
   mechanism. */
/* The profile identity and Settings. After the theme module, whose sheet it
   takes over, and after the QA menu, whose group it files under a dev heading;
   it waits for the sheet rather than depending on either, so the order is a
   preference and not a requirement. */
import './profileShell.js?v=53c0693';
/* The one floating Back control of Settings: every level of Settings goes back through it. Last, so every level it can stand in already exists. */
import './settingsBackControl.js?v=53c0693';
/* Global ambient micro-spore layer: mounted once after the modules, before session restore. */
import './ambientParticles.js?v=53c0693';
import './profileSessionRestore.js?v=53c0693';
