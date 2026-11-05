const DRAFT_NOTICE = '[DRAFT — NOT LEGALLY REVIEWED. This document is a preliminary draft prepared for development purposes. It has not been reviewed or approved by a qualified legal professional. Do not rely on this text as a final legal document.]';
const CURRENT_VERSION = '0.1.0-draft';
const EFFECTIVE_DATE = '2026-11-04';
const PRIVACY_POLICY_CONTENT = `${DRAFT_NOTICE}

Privacy Policy — My Codex
Version: ${CURRENT_VERSION}
Effective date: ${EFFECTIVE_DATE}

1. DATA CONTROLLER

[Placeholder: Individual developer based in the Slovak Republic. Full legal name and contact details to be added after legal review.]

2. WHAT DATA WE COLLECT

We collect and process the following personal data that you provide directly:
- Birth given name(s) and surname
- Birth date (day, month, year)
- Birth time (optional)
- Birth location details (country, region, city or postal code)

We generate the following data from your inputs:
- Numerology calculation results
- Symbolic profile readings and synthesis outputs
- Forecast state data
- Personal report content

We do not collect data beyond what you explicitly provide or what the application generates from your inputs.

3. PURPOSE OF PROCESSING

Your data is processed for the following purposes:
- Providing the core service: generating symbolic self-exploration profiles based on your birth data and name
- Producing personalized symbolic interpretations, readings, and reports
- Persisting your profile and generated content so you do not need to re-enter data

The application provides symbolic and educational content intended for self-reflection. It does not provide medical diagnosis, psychological assessment, legal advice, financial guidance, or scientifically validated predictions.

4. LEGAL BASIS FOR PROCESSING

- Core service delivery (profile creation, calculations, readings): Performance of the contract between you and the service provider (Article 6(1)(b) GDPR).
- Optional analytics (if enabled in a future version): Your explicit consent (Article 6(1)(a) GDPR). Analytics are not currently active.
- AI-generated interpretations (when activated): Your explicit consent before any data is sent to a third-party AI provider. AI processing is not currently active.

5. DATA STORAGE

- Local device storage: Your profile data and generated readings are stored on your device using IndexedDB (a browser local database) and localStorage. This data does not leave your device unless a future cloud synchronization feature is enabled.
- Guest identity: When you use the application without creating an account, a random guest identifier (UUID) is stored in localStorage to maintain your session.
- Cloud synchronization (when available): If you create an account and enable synchronization in a future version, your data will be stored on secure servers. [Placeholder: specific cloud infrastructure details to be added.]

6. THIRD-PARTY DATA PROCESSING

When AI-powered features are activated (not currently active), your calculation input snapshots may be sent to third-party AI providers for interpretation generation. Before this occurs:
- You will be informed which data is sent and to which provider
- You will be asked for explicit consent
- The relevant data processing arrangement will be documented

No personal data is currently sent to any third-party service.

7. DATA RETENTION

Your data is retained until you delete your profile or account. You may delete your data at any time through the application settings.

8. YOUR RIGHTS

Under the General Data Protection Regulation (GDPR), you have the right to:
- Access: Request a copy of the personal data we hold about you
- Rectification: Correct inaccurate personal data
- Erasure: Request deletion of your personal data
- Data portability: Receive your data in a structured, machine-readable format
- Withdraw consent: Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing
- Restriction: Request restriction of processing in certain circumstances
- Object: Object to processing based on legitimate interests
- Lodge a complaint: File a complaint with a supervisory authority

To exercise these rights, use the data management features in the application settings or contact us at: [Placeholder: contact email to be added.]

9. CHILDREN

This service is not intended for individuals under the age of 16. We do not knowingly collect personal data from children under 16.

10. THIRD-PARTY PROFILE DATA

The Romantic Connections feature may involve entering another person's birth details. You are responsible for ensuring you have an appropriate basis for providing another person's data. Third-party profile data can be deleted at any time through the application.

11. CHANGES TO THIS POLICY

We will notify you of material changes to this policy through the application before they take effect. Continued use after notification constitutes acknowledgment of the updated policy.

12. SUPERVISORY AUTHORITY

[Placeholder: The competent supervisory authority is the Office for Personal Data Protection of the Slovak Republic (Urad na ochranu osobnych udajov Slovenskej republiky). Contact details to be confirmed after legal review.]

13. CONTACT

[Placeholder: Contact email and postal address to be added after legal review.]`;
const TERMS_OF_SERVICE_CONTENT = `${DRAFT_NOTICE}

Terms of Service — My Codex
Version: ${CURRENT_VERSION}
Effective date: ${EFFECTIVE_DATE}

1. SERVICE DESCRIPTION

My Codex is a symbolic self-exploration application that generates personalized profiles, readings, and interpretations based on user-provided birth data and name. The application uses deterministic calculation engines (numerology, and in the future: western astrology, BaZi, human design) combined with symbolic synthesis to produce content intended for self-reflection, personal exploration, and entertainment.

2. IMPORTANT LIMITATIONS

This service does NOT provide:
- Medical diagnosis or treatment recommendations
- Psychological assessment or therapy
- Legal advice or legal opinions
- Financial advice or investment recommendations
- Scientifically validated predictions about future events
- Guaranteed accuracy of any kind

The symbolic systems used (numerology, astrology, human design, BaZi) are not scientifically validated methods of personality assessment or prediction. All content is intended as symbolic reflection material only.

If you are experiencing a medical, psychological, or legal issue, consult a qualified professional.

3. USER RESPONSIBILITIES

By using this service, you agree to:
- Provide accurate birth data for your own profile
- Not use the service for purposes it is not designed for
- Not rely on generated content as professional advice
- Respect the intellectual property of the service
- Not attempt to reverse-engineer calculation engines or extract proprietary content

4. INTELLECTUAL PROPERTY

The application, its calculation engines, interpretation content, visual design, and generated output are protected by applicable intellectual property laws. You may use generated content for personal purposes. You may not redistribute, sell, or commercially exploit the application's content or generated outputs without written permission.

5. ACCOUNT AND DATA

You are responsible for maintaining the security of your account credentials. You may delete your account and associated data at any time through the application settings.

6. LIMITATION OF LIABILITY

To the maximum extent permitted by applicable law, the service provider is not liable for:
- Decisions made based on generated content
- Inaccuracies in symbolic interpretations
- Loss of data due to device failure or service interruption
- Indirect, incidental, or consequential damages

The service is provided "as is" without warranties of any kind, express or implied.

7. TERMINATION

You may stop using the service and delete your account at any time. We reserve the right to suspend or terminate access for violation of these terms, with reasonable notice where possible.

8. GOVERNING LAW

[Placeholder: These terms are governed by the laws of the Slovak Republic. The competent courts are those of the Slovak Republic. Specific jurisdiction details to be confirmed after legal review.]

9. CHANGES TO THESE TERMS

Material changes to these terms will be communicated through the application before they take effect. Continued use after notification constitutes acceptance of the updated terms.

10. CONTACT

[Placeholder: Contact information to be added after legal review.]`;
const AI_DISCLAIMER_CONTENT = `${DRAFT_NOTICE}

AI and Symbolic Interpretation Disclaimer — My Codex
Version: ${CURRENT_VERSION}
Effective date: ${EFFECTIVE_DATE}

1. NATURE OF SYMBOLIC SYSTEMS

My Codex uses symbolic systems including numerology, and in future versions: western astrology, Chinese BaZi, and human design. These systems are traditional symbolic frameworks used for self-reflection and personal exploration. They are NOT scientifically validated methods of personality assessment, diagnosis, or prediction.

No claims are made regarding the scientific validity, accuracy, or predictive power of any symbolic system used in this application.

2. PURPOSE OF GENERATED CONTENT

All content generated by this application — including profiles, readings, interpretations, synthesis reports, and forecasts — is intended exclusively for:
- Personal self-reflection
- Symbolic exploration
- Educational interest
- Entertainment

Generated content is NOT intended as and must NOT be used as:
- Medical or health diagnosis or advice
- Psychological assessment or therapy
- Legal advice or legal opinions
- Financial or investment guidance
- Relationship counseling from a licensed professional
- Career guidance from a qualified counselor
- Predictions of specific future events

3. AI-GENERATED CONTENT

When AI-powered features are available (not currently active), some interpretations are generated by artificial intelligence language models. AI-generated content:
- May contain inaccuracies, inconsistencies, or errors
- Is not reviewed by human experts before delivery
- Should not be treated as authoritative or factual
- May vary between generations even for the same input
- Reflects patterns in training data, not objective truth

4. CONSULT QUALIFIED PROFESSIONALS

If you are experiencing concerns about your physical health, mental health, legal situation, financial circumstances, or any other serious matter, consult a qualified licensed professional. This application is not a substitute for professional advice or services.

5. NO GUARANTEES

No guarantee is made regarding the accuracy, completeness, reliability, or usefulness of any content generated by this application. Use all generated content at your own discretion and risk.

6. THIRD-PARTY PROFILES

Interpretations generated about another person (such as in the Romantic Connections feature) are symbolic explorations only. They do not constitute psychological profiling, compatibility certification, or relationship advice from a qualified professional.`;
const SUBSCRIPTION_POLICY_CONTENT = `${DRAFT_NOTICE}

Subscription and Refund Policy — My Codex
Version: ${CURRENT_VERSION}
Effective date: ${EFFECTIVE_DATE}

1. SUBSCRIPTION OVERVIEW

[Placeholder: Subscription tiers and pricing to be determined. This section will be updated when subscription features are implemented.]

My Codex may offer premium features through subscription plans. Free features remain available without a subscription.

2. BILLING

Subscriptions are processed through Google Play Billing. By subscribing, you also agree to the Google Play Terms of Service.

- Subscription fees are charged at the beginning of each billing period
- Subscriptions automatically renew unless cancelled before the renewal date
- Price changes will be communicated in advance through the application and Google Play

3. CANCELLATION

You may cancel your subscription at any time through:
- Google Play Store subscription management on your device
- The application settings (which will redirect to Google Play management)

Cancellation takes effect at the end of the current billing period. You retain access to premium features until that date.

4. REFUNDS

Refund requests are handled according to Google Play's refund policy. To request a refund:
- Within 48 hours of purchase: Request through Google Play directly
- After 48 hours: Contact us at [Placeholder: contact email] with your order details

Refund eligibility is subject to Google Play's policies and applicable consumer protection laws.

5. FREE TRIAL

[Placeholder: If a free trial is offered, terms will be specified here, including duration, conversion to paid subscription, and cancellation during trial.]

6. CHANGES

Changes to subscription pricing or terms will be communicated at least 30 days before they take effect. You may cancel before the changes apply.`;
const DATA_DELETION_POLICY_CONTENT = `${DRAFT_NOTICE}

Data Deletion Policy — My Codex
Version: ${CURRENT_VERSION}
Effective date: ${EFFECTIVE_DATE}

1. YOUR RIGHT TO DELETE YOUR DATA

You have the right to request deletion of your personal data at any time. This right is provided under the General Data Protection Regulation (GDPR) Article 17 (Right to Erasure).

2. HOW TO REQUEST DELETION

You can delete your data through:
- Application settings: Open Settings and select "Delete all data"
- Account deletion: Open Settings and select "Delete account" (when accounts are available)
- Manual request: Contact us at [Placeholder: contact email] with the subject line "Data Deletion Request"

3. WHAT GETS DELETED

When you request data deletion, the following data is permanently removed:
- Your profile information (name, birth data, location details)
- All generated readings, interpretations, and reports
- Symbolic profile calculations and synthesis outputs
- Account credentials and session data
- Consent and acknowledgment records
- Any third-party profiles you created (e.g., Romantic Connections)

4. WHAT MAY BE RETAINED

The following may be retained after deletion:
- Anonymized, aggregated statistical data that cannot identify you
- Records required by law for a limited retention period (e.g., transaction records for tax compliance)

5. TIMELINE

- Self-service deletion through the application: Immediate (all data is stored locally on your device)
- Manual deletion requests: Processed within 30 days of receiving a verified request

6. VERIFICATION

For manual deletion requests (not self-service), we may need to verify your identity before processing the request. This is to protect against unauthorized deletion of someone else's data.

7. CONSEQUENCES OF DELETION

After deletion:
- Your profile and all generated content are permanently lost and cannot be recovered
- If you had a subscription, cancellation should be done separately through Google Play
- You may create a new account, but previous data cannot be restored

8. CONTACT

For questions about data deletion: [Placeholder: contact email to be added after legal review.]`;
const DOCUMENT_REGISTRY = {
    privacy_policy: {
        type: 'privacy_policy',
        version: CURRENT_VERSION,
        effectiveDate: EFFECTIVE_DATE,
        title: 'Privacy Policy',
        content: PRIVACY_POLICY_CONTENT,
    },
    terms_of_service: {
        type: 'terms_of_service',
        version: CURRENT_VERSION,
        effectiveDate: EFFECTIVE_DATE,
        title: 'Terms of Service',
        content: TERMS_OF_SERVICE_CONTENT,
    },
    ai_disclaimer: {
        type: 'ai_disclaimer',
        version: CURRENT_VERSION,
        effectiveDate: EFFECTIVE_DATE,
        title: 'AI and Symbolic Interpretation Disclaimer',
        content: AI_DISCLAIMER_CONTENT,
    },
    subscription_policy: {
        type: 'subscription_policy',
        version: CURRENT_VERSION,
        effectiveDate: EFFECTIVE_DATE,
        title: 'Subscription and Refund Policy',
        content: SUBSCRIPTION_POLICY_CONTENT,
    },
    data_deletion_policy: {
        type: 'data_deletion_policy',
        version: CURRENT_VERSION,
        effectiveDate: EFFECTIVE_DATE,
        title: 'Data Deletion Policy',
        content: DATA_DELETION_POLICY_CONTENT,
    },
};
export function getDocument(type) {
    return DOCUMENT_REGISTRY[type];
}
export function getDocumentVersion(type) {
    const doc = DOCUMENT_REGISTRY[type];
    return {
        type: doc.type,
        version: doc.version,
        effectiveDate: doc.effectiveDate,
    };
}
export function getAllVersions() {
    return Object.values(DOCUMENT_REGISTRY).map((doc) => ({
        type: doc.type,
        version: doc.version,
        effectiveDate: doc.effectiveDate,
    }));
}
export function getDocumentByTypeAndVersion(type, version) {
    const doc = DOCUMENT_REGISTRY[type];
    if (doc.version === version)
        return doc;
    return null;
}
