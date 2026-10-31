/* The language is applied before any other module evaluates a template, so
   the flow is never painted in one language and corrected into another. */
import './localeControl.js?v=b5ef5ed';
/* The menu's tap impulse comes next: it holds a tap on a card back for a beat, so it must precede every listener that opens a destination. */
import './menuTapSonarInstall.js?v=b5ef5ed';
import './onboardingStaticText.js?v=b5ef5ed';
// The global background lift. First, so the ambient layer exists from the very
// first paint and sits directly above the map for every screen of the flow.
/* First, so every later stylesheet can be written against the mode and a
   constrained device never renders an expensive frame before it is known. */
import './deviceCapabilityMode.js?v=b5ef5ed';
import './onboardingAmbientBackdrop.js?v=b5ef5ed';
import './earlyPlaceReveal.js?v=b5ef5ed';
import './placeResultsPolish.js?v=b5ef5ed';
import './placeGlassRefinement.js?v=b5ef5ed';
import './vesselOrbit.core.js?v=b5ef5ed';
import './vesselArrowCarousel.js?v=b5ef5ed';
import './vesselConfirmHandoff.js?v=b5ef5ed';
import './profileVisualIsolation.js?v=b5ef5ed';
import './arrivalPicker.js?v=b5ef5ed';
import './arrivalCalendarStability.js?v=b5ef5ed';
import './arrivalConfirmationGuard.js?v=b5ef5ed';
import './profileFlowPolish.js?v=b5ef5ed';
import './identityFieldPolish.js?v=b5ef5ed';
import './arrivalGlassRefinement.js?v=b5ef5ed';
import './profileControlsPolish.js?v=b5ef5ed';
import './onboardingBackNavigation.js?v=b5ef5ed';
import './vesselTransitionStability.js?v=b5ef5ed';
import './vesselGlyphAlignment.js?v=b5ef5ed';
import './onboardingGlassSystem.js?v=b5ef5ed';
import './onboardingTapHighlightPolish.js?v=b5ef5ed';
import './placeSelectedLayout.js?v=b5ef5ed';
import './onboardingUnifiedLayout.js?v=b5ef5ed';
import './arrivalTimeEditorPolish.js?v=b5ef5ed';
import './arrivalDateConfirmationPolish.js?v=b5ef5ed';
import './arrivalPeriodSonar.js?v=b5ef5ed';
import './arrivalDateOverlayLayout.js?v=b5ef5ed';
import './vesselEntryReveal.js?v=b5ef5ed';
import './placeVesselReviewPolish.js?v=b5ef5ed';
import './onboardingLayerArchitecture.js?v=b5ef5ed';
import './arrivalPickerOverlayAnchor.js?v=b5ef5ed';
import './onboardingPromptAlignment.js?v=b5ef5ed';
import './profileEarthViewportLock.js?v=b5ef5ed';
import './arrivalWeekdayPolish.js?v=b5ef5ed';
/* Keep the actual VESSEL arrow/effect controller after every effect/glass module.
   It owns the final visual state of the globe rim, gender glyph, inactive
   neighbour glyphs and Confirm Vessel rim. The geometry-only spacing pass stays
   immediately after it. The clickable-neighbour pass then makes those existing
   ghost glyphs the only visible previous/next controls while delegating to the
   same authoritative carousel controller. The final overview modules reuse the
   approved VESSEL visuals without redefining the underlying effect system. */
import './vesselArrowOnlyPolish.js?v=b5ef5ed';
import './vesselNeighborPreviewSpacing.js?v=b5ef5ed';
import './vesselClickableNeighborGlyphs.js?v=b5ef5ed';
import './onboardingVesselCoreSymbol.js?v=b5ef5ed';
import './profileOverviewFlow.js?v=b5ef5ed';
import './profileOverviewAndroidStability.js?v=b5ef5ed';
import './profileOverviewFitPolish.js?v=b5ef5ed';
import './profileOverviewEditRecovery.js?v=b5ef5ed';
import './onboardingTransitions.js?v=b5ef5ed';
import './onboardingEarthIntroSequence.js?v=b5ef5ed';
// The real navigation consumers of the black-boundary controller. Imported
// after it so the controller's cover exists before any route can run.
import './onboardingOverlayRoutes.js?v=b5ef5ed';
// The pillar experience: engine binding, hub and pillar views. Imported after
// the transition owner so it can reuse the approved card transition.
import './premiumPillarExperience.js?v=b5ef5ed';
// The numerology forecast surface. After the pillar experience, so the hub it
// attaches its entry point to already exists.
import './numerologyForecastExperience.js?v=b5ef5ed';
import './forecastMoonStage.js?v=b5ef5ed';
// The Tarot destination: the seventh stop of the strip, on a surface of its own, like the forecast.
import './tarotExperience.js?v=b5ef5ed';
// The Connections destination: the relationship layer, on a surface of its own. This is only its door; the engine and the content load on first open.
import './connectionsExperience.js?v=b5ef5ed';
/* The haptics switch, in the Options sheet beside the language switch. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './hapticsControl.js?v=b5ef5ed';
import './hapticTapFeedback.js?v=b5ef5ed';
/* Settings -> Colors: Interface Color and Earth Glow, migrated and applied at load, in the same sheet. (Not in the birthplace entry: that bundle has a size ceiling.) */
import './colorsControl.js?v=b5ef5ed';
// The main menu: the first stop of the strip, on a surface of its own.
import './menuExperience.js?v=b5ef5ed';
import './onboardingIntroWatchdog.js?v=b5ef5ed';
import './onboardingEarthGestureAccess.js?v=b5ef5ed';
import './onboardingEarthCameraConstraints.js?v=b5ef5ed';
import './onboardingEarthIdleRotation.js?v=b5ef5ed';
// Scroll-linked longitude nudge on the pillar screens. After the idle drift, so
// the drift owns the baseline motion and this only ever adds to the live pose.
import './pillarScrollEarthRotation.js?v=b5ef5ed';
/* The reading always opens over the globe, whichever route reached it. Beside
   the scroll nudge because both read the same "a reading owns the screen" flag;
   order between them does not matter, as one sets distance and the other
   longitude. */
import './readingEarthGlobeState.js?v=b5ef5ed';
import './onboardingKeyboardViewport.js?v=b5ef5ed';
import './onboardingThemePlayground.js?v=b5ef5ed';
/* After the theme module, so the sheet it appends into usually already exists;
   it watches for the sheet if it does not, so the order is a preference rather
   than a requirement. */
import './qaProfilePresetMenu.js?v=b5ef5ed';
import './onboardingEarthSceneClarity.js?v=b5ef5ed';
/* Locale first: it applies the stored language at module load, before any
   reading is composed, so nothing has to be re-rendered on first paint. */
import './arrivalMenuTransparencyAndHitFix.js?v=b5ef5ed';
/* The encyclopedia bottom sheet. One delegated listener for every info
   control in the app, so it survives the readings being re-rendered. */
import './conceptSheet.js?v=b5ef5ed';
/* The Numerology hero: three glass circles orbiting the Earth. Reads the disc the glow ring is laid on, so after the module that publishes it. */
import './numerologyOrbitHero.js?v=b5ef5ed';
/* The position-specific meanings opened by the four Numerology hero circles. */
import './numerologyMeaningSheet.js?v=b5ef5ed';
/* The KT sonar effect on the four Numerology hero circles, taking turns (CSS only). */
import './numerologyAffordances.js?v=b5ef5ed';
/* The Western Astrology hero: the Sun, the Moon and the Ascendant labelled on the scene, which is held in an authored pose while the reading is at its top. */
import './astrologyBigThreeHero.js?v=b5ef5ed';
import './astrologyBigThreeSheet.js?v=b5ef5ed';
/* The optional Advanced chart panel under the Western Astrology natal wheel: it redraws the wheel from the model the wheel embeds (no calculation, no request). */
import './astrologyAdvancedChart.js?v=b5ef5ed';
/* What can be tapped in the opened Western Astrology view (a soft sonar ring), and the frosted glass under its natal wheel. CSS only. */
import './premiumAffordances.js?v=b5ef5ed';
import './baziKnowledgeSheet.js?v=b5ef5ed';
/* The KT sonar effect on what can be tapped in the opened BaZi view (CSS only). */
import './baziAffordances.js?v=b5ef5ed';
/* LAST. It normalises the fill and blur of every glass surface the modules
   above declare, so it has to be able to see all of them. */
import './glassSurfaceUnification.js?v=b5ef5ed';
/* After everything, because it drives the finished app rather than adding to
   it: it needs the overview's bridge and the pillar controller's openers to
   exist before it can put a stored profile back. It defers past this module's
   evaluation anyway, so the position is belt and braces rather than the
   mechanism. */
/* The profile identity and Settings. After the theme module, whose sheet it
   takes over, and after the QA menu, whose group it files under a dev heading;
   it waits for the sheet rather than depending on either, so the order is a
   preference and not a requirement. */
import './profileShell.js?v=b5ef5ed';
/* The one floating Back control of Settings: every level of Settings goes back through it. Last, so every level it can stand in already exists. */
import './settingsBackControl.js?v=b5ef5ed';
/* Global ambient micro-spore layer: mounted once after the modules, before session restore. */
import './ambientParticles.js?v=b5ef5ed';
import './profileSessionRestore.js?v=b5ef5ed';
/* WebKit touch recovery is last: no legacy carousel/picker style may re-enable
   the invisible profile disc or add a compositing layer over a native input. */
import './onboardingIosWebkitRecovery.js?v=b5ef5ed';
