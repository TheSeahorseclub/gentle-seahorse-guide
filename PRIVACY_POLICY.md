# PRIVACY POLICY

**Seahorse Club Ltd**  
797 Harrow Road  
London NW10 5PA  
United Kingdom  
Email: info@theseahorseclub.com  
Phone: +447543137777

**Last Updated:** June 2026  
**Effective Date:** June 2026  
**Version:** 1.0

---

## 1. INTRODUCTION & OVERVIEW

Seahorse Club Ltd ("we," "us," "our," "Company," or "Seahorse Club") operates the Seahorse Club mobile application and website (the "App" or "Service"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform.

This Privacy Policy explains how we collect, use, disclose, and otherwise process your personal information when you use our App, website, and related services. This includes information about your child(ren) that you log into the App for developmental tracking and analysis purposes.

**Who We Are:** Seahorse Club is a technology company providing neuroscience-informed developmental tracking and guidance for parents and caregivers of children aged 0–3 years. We are based in the United Kingdom and operate under UK data protection law (including the Data Protection Act 2018 and UK GDPR).

**Scope:** This Privacy Policy applies to:
- The Seahorse Club mobile application (iOS and Android)
- The Seahorse Club website (theseahorseclub.com and app.theseahorseclub.com)
- All related services, features, and functionality offered through these platforms

**Your Consent:** By using the App or Service, you consent to the collection, use, and processing of your information as described in this Privacy Policy. If you do not agree with our practices, please do not use the App. We encourage you to read this policy carefully and contact us if you have any questions.

---

## 2. INFORMATION WE COLLECT

### 2.1 Information You Provide Directly

#### Account Registration Information
When you create an account, we collect:
- **Email address** (used for login and account recovery)
- **Full name** (optional; for profile personalization)
- **Password** (encrypted; we never store plain-text passwords)
- **Country** (for localization and compliance)
- **Relationship to child(ren)** (mother, father, grandparent, foster carer, other family member, other caregiver—stored in your profile)
- **Avatar or profile image** (optional)

#### Caregiver Profile Information
If you choose to add additional context to your account:
- **Self-assessed confidence level** (1–5 scale regarding your ability to support child development)
- **Role description** (additional text describing your relationship to the child)

#### Child Profile Information
For each child tracked in the App, you provide:
- **Child's name**
- **Child's age in months** (e.g., "14 months")—we collect age in months only; we do **not** collect birth date or date of birth
- **Any optional child profile notes** you choose to add

### 2.2 Information You Log in the App

#### Behavioral Signal Data
The core of Seahorse Club is daily logging of five behavioral observations. For each signal, you provide:

**1. Sleep Signal**
- Quality category: Restful, Unsettled, or Mixed
- Duration (in minutes)
- Start time and end time of sleep
- Optional notes describing sleep patterns, disruptions, or concerns

**2. Crying Signal**
- Category: Calm Day, Some Fussiness, or More Than Usual
- Optional notes about triggers or context

**3. Feeding Signal**
- Category: Settled, Variable, or Challenging
- Optional notes about feeding difficulty, appetite, or feeding method

**4. Interaction Signal**
- Category: Connected, Quiet, or Seeking Comfort
- Optional notes about the child's social engagement or emotional state

**5. Transitions Signal**
- Category: Smooth, Needs Support, or Finding It Hard
- Optional notes about transitions (e.g., diaper changes, dressing, activities)

**Associated Metadata:**
- Timestamp (date and time the observation was logged)
- User ID of the person logging the entry (if multiple caregivers have access)
- Optional written notes for any signal

#### Sleep & Wake Window Data
If you use our sleep tracking feature, we collect:

**Sleep Logs:**
- Date of sleep
- Time sleep started and ended
- Duration in minutes
- Sleep quality rating (categorical or numeric)
- User ID (who logged it)
- Timestamp

**Wake Windows:**
- Date and time of wake window
- Duration in minutes
- Activities during wake window (categorical: play, feeding, tummy time, soothing, etc.)
- User ID
- Timestamp

#### Daily Insights & Notes
- AI-generated insights based on your logged signals and sleep data
- Caregiver type information associated with the insight
- Your optional response or notes to insights
- Timestamp

#### Content Engagement Data
- Which educational videos you view
- Duration watched
- Which lesson modules you access
- Your progress through the curriculum
- Viewing timestamps

### 2.3 Information Collected Automatically

#### Device & Usage Information
- **Device type** (iPhone model, Android device model)
- **Operating system and version** (iOS 15.x, Android 12.x, etc.)
- **App version** (which build of Seahorse Club you're using)
- **Device identifier** (for internal analytics and crash reporting only)

#### Activity & Interaction Data
- **Login timestamps** and frequency
- **Pages or features accessed** within the App
- **Actions taken** (tapped buttons, opened modals, completed forms)
- **Time spent** on each feature
- **Crash reports** and error logs
- **Search queries** within the App

#### Location Data
- **IP address** (used to infer general location for compliance and fraud detection)
- We do **not** collect precise GPS location unless you explicitly enable it for a specific feature

#### Communication Data
- **Email communications** (support inquiries, transactional emails, newsletters if opted in)
- **In-app messages** you send to support or other users
- **Support ticket history**

### 2.4 Information from Third Parties

#### Payment & Subscription Processors
- **Stripe** (web payments): payment method, billing address, subscription status
- **RevenueCat** (mobile IAP): platform, subscription entitlement status, purchase history
- **Apple App Store**: in-app purchase receipts, subscription information
- **Google Play Store**: in-app purchase receipts, subscription information

#### Authentication Services
- **Supabase Auth**: email verification status, password reset tokens

#### AI & Analysis Services
- **Google Gemini** (via Lovable): receives anonymized sleep data for AI analysis only when you request sleep analysis (see Section 3.2)

#### Infrastructure & Hosting
- **Supabase**: database events, authentication logs
- **Cloudflare**: CDN and DDoS protection logs

#### Backup & Analytics (if applicable)
- Third-party analytics platforms: aggregated usage statistics (if enabled in your settings)

---

## 3. HOW WE USE YOUR INFORMATION

### 3.1 Core App Functionality

We use your information to:

1. **Create and manage your account**
   - Verify your identity
   - Allow you to log in securely
   - Enable password recovery

2. **Store and organize your child's developmental data**
   - Maintain your daily signal entries
   - Store sleep logs and wake window data
   - Display historical data in charts and summaries

3. **Generate insights and analysis**
   - Aggregate your logged signals to identify patterns
   - Calculate consistency scores and trend data
   - Generate weekly summaries of behavioral observations
   - Identify potential sleep regressions or changes in patterns

4. **Enable multi-caregiver access**
   - Allow you to invite other family members or caregivers
   - Store role-based permissions (owner, caregiver, viewer)
   - Track which caregiver logged each entry
   - Maintain audit trails for transparency

5. **Generate clinical PDF reports**
   - Compile your logged data into downloadable clinical summaries
   - Include charts, trend analysis, and insights
   - Support parent-provider conversations with healthcare professionals

6. **Provide personalized educational content**
   - Deliver age-appropriate learning modules based on your child's age
   - Recommend relevant videos and guidance
   - Track your completion of weekly lessons

### 3.2 AI-Powered Analysis & Recommendations

When you explicitly request sleep analysis, we use **Google Gemini AI** (via Lovable) to:

**Data Sent to AI Service:**
- Child's age in months
- Complete sleep logs for the last 30 days (dates, times, duration, quality ratings)
- Complete wake window data (dates, times, duration, activities)

**Processing:**
- Analyzes patterns in your child's sleep
- Identifies potential sleep regressions
- Compares data to age-appropriate sleep benchmarks
- Generates personalized recommendations

**Output:**
- Suggested ideal wake windows for your child's age
- Predicted next wake time based on patterns
- Nap recommendations
- Sleep regression flags
- Trends summary
- Sleep improvement tips

**Important:** Sleep analysis is **on-demand only**—we only send data to AI when you click "Analyze Sleep" or similar action. We do **not** automatically send data to AI services.

### 3.3 Communication & Support

We use your information to:
- Respond to your support requests
- Send transactional emails (account confirmations, password resets, billing notices)
- Send feature announcements and updates (with your consent)
- Resolve disputes or complaints

### 3.4 Legal & Security

We may use your information to:
- Comply with legal obligations (court orders, law enforcement requests)
- Enforce our Terms of Service and other agreements
- Protect against fraud, abuse, or security threats
- Investigate and prevent illegal activity
- Protect the rights, property, and safety of Seahorse Club, our users, and the public

### 3.5 Product Improvement & Analytics

We use aggregated and anonymized data to:
- Identify which features are most used
- Understand user behavior patterns
- Improve app performance and stability
- Plan new features and enhancements
- Conduct research on child development trends (where data is properly anonymized)

---

## 4. DATA SHARING & ACCESS CONTROL

### 4.1 Within Your Family Group

You control who accesses your child's data by managing family members and roles:

**Role Hierarchy:**
- **Owner**: You (the account creator). Full access; can add/remove caregivers; can delete entire family and all data
- **Caregiver**: Can log observations and view your child's data
- **Viewer**: Read-only access to your child's data

**What Each Role Can Do:**
- **Owner**: View, edit, delete all data; invite/remove users; manage subscription; delete account
- **Caregiver**: Log new signals; view historical data; view insights
- **Viewer**: View data only; cannot log or edit

### 4.2 Sharing with Third Parties for Service Delivery

We share data with third parties **only to the extent necessary** to operate the App:

| Service Provider | Purpose | Data Shared | Location |
|---|---|---|---|
| **Supabase** | Cloud database, authentication, edge functions | All user data (encrypted in transit) | EU servers |
| **RevenueCat** | Mobile subscription management | User ID, subscription status, entitlement events | RevenueCat servers |
| **Stripe** | Web payment processing | Email, billing address, subscription status | Stripe-managed servers |
| **Apple App Store** | IAP validation, subscription platform | Subscription events, entitlements | Apple servers |
| **Google Play Store** | IAP validation, subscription platform | Subscription events, entitlements | Google servers |
| **Google Gemini** | Sleep analysis AI (on-demand) | Child age, 30-day sleep/wake logs | Google Cloud |
| **Cloudflare** | CDN, video hosting, DDoS protection | Video stream requests, server logs | Cloudflare network |

### 4.3 Data We Do NOT Share

We **do not**:
- Sell or rent your personal information to marketing companies or data brokers
- Share data with advertisers or third-party marketing services
- Use your data for targeted advertising
- Share data with unaffiliated companies except as required by law
- Disclose data to social media platforms (unless you explicitly connect your account)

### 4.4 Legal Requests & Compelled Disclosure

We may disclose your information if required by law, including:
- Court orders or legal process
- Law enforcement requests (police, regulators)
- Government investigations
- Public safety emergencies

**Commitment:** We will attempt to notify you of such requests before disclosure, where legally permitted. We will refuse overly broad requests or requests that violate privacy law.

### 4.5 Business Transfers

If Seahorse Club is acquired, merges with another company, or sells assets, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have regarding your information.

---

## 5. DATA RETENTION & DELETION

### 5.1 How Long We Keep Your Data

**User Account Data:**
- Retained while your account is active
- Indefinitely after account deletion (for legal and tax compliance) unless you request specific deletion

**Child Behavioral Data (Signals, Sleep Logs, Wake Windows):**
- Retained indefinitely while your account is active
- Deleted **immediately and completely** if you delete your account (if you are the family owner)
- Retained by other family members if they have a copy (separate accounts)

**Daily Insights & Generated Analysis:**
- Retained for the duration your account is active
- Deleted with your account

**Support Communications:**
- Retained for 2 years after resolution
- Longer if required for legal proceedings

**Payment & Billing Records:**
- Retained for 7 years (UK tax requirement)
- Not accessible to you after account deletion but retained for compliance

**Backup Copies:**
- We maintain encrypted backups for 30 days
- After account deletion, backup copies are purged within 30 days

### 5.2 Data Retention by Export Window (Premium Feature)

Your ability to **export** clinical summaries depends on your plan:

- **Free tier**: Can export clinical summaries covering the **last 3 days only**
- **Premium tier**: Can export clinical summaries covering **last 30, 90, or 365 days**

**Important Clarification:**
- These limits **only control what you can export**—they do not control what we store or retain
- Your actual data may be older than the export window
- This is a feature access control, not a data deletion mechanism
- All your data remains in your account; export windows are for user convenience

### 5.3 Account Deletion

When you delete your account:

**If you are a Family Owner:**
- Your entire family, all children, and all associated data are deleted
- All signal entries, sleep logs, wake windows, and insights are deleted
- All caregiver access is revoked
- Billing records retained for 7 years (cannot be deleted due to UK tax law)

**If you are a Caregiver in Someone Else's Family:**
- You are removed from that family
- Your access to their data is revoked
- Entries you previously logged **remain in the system** (owned by the family)
- Your own personal account data (email, password) is deleted

**Timeline:**
- Account deletion is **immediate** for user-facing data
- Background processing completes within 30 days
- You will not be able to log back in after deletion

### 5.4 Retention of Anonymized Data

We may retain **anonymized and aggregated data** indefinitely for:
- Research on child development (where data cannot identify individuals)
- Product analytics and improvement
- Trend analysis across our user base

---

## 6. DATA SECURITY

### 6.1 Security Measures

We implement industry-standard security practices to protect your information:

**In Transit:**
- HTTPS encryption for all data transmission
- TLS 1.2+ for all connections
- Secure WebSocket (WSS) for real-time features

**At Rest:**
- Database encryption for sensitive fields
- Encrypted backups
- Secure key management

**Access Control:**
- Role-based access control (RBAC)
- Family-based data isolation (users can only access their own family's data)
- Two-factor authentication available (optional for enhanced security)
- Session timeouts for inactive accounts

**Monitoring & Updates:**
- Regular security audits
- Automated vulnerability scanning
- Timely security patches
- Intrusion detection systems

### 6.2 No Absolute Security

**Important Disclaimer:** No method of transmission over the internet or electronic storage is 100% secure. While we use industry best practices, we cannot guarantee absolute security. You use the App at your own risk and are responsible for maintaining the confidentiality of your password and account credentials.

### 6.3 Your Security Responsibilities

You are responsible for:
- Keeping your password confidential
- Not sharing your account credentials with others
- Logging out after each session (especially on shared devices)
- Notifying us immediately of unauthorized access
- Using a secure device and network to access the App

---

## 7. YOUR RIGHTS & CHOICES

### 7.1 GDPR & UK Data Protection Rights

If you are in the UK or EU, you have rights under the UK GDPR:

**Right of Access:**
- Request a copy of your personal data we hold
- We will provide it in a structured, portable format
- Response time: within 30 days

**Right to Correction (Rectification):**
- Request correction of inaccurate information
- We will update your data promptly

**Right to Erasure ("Right to Be Forgotten"):**
- Request deletion of your data (subject to legal exceptions)
- We will delete within 30 days unless we have legal grounds to retain

**Right to Restrict Processing:**
- Request that we limit what we do with your data
- Useful if you dispute accuracy while we investigate

**Right to Data Portability:**
- Request your data in a portable, machine-readable format
- Allows you to transfer to another service

**Right to Object:**
- Object to processing for certain purposes (e.g., marketing)
- Object to automated decision-making

**Right to Lodge a Complaint:**
- If you believe your rights are violated, contact:
  - **UK Information Commissioner's Office (ICO)**
  - Website: ico.org.uk
  - Phone: +44 (0)303 123 1113

### 7.2 California Privacy Rights (CCPA)

If you are a California resident, you have rights under the California Consumer Privacy Act:
- Right to know what data we collect and how we use it
- Right to delete your personal information
- Right to opt-out of data sharing (we do not sell data, so this is limited)
- Right to non-discrimination for exercising your rights

**To Exercise Rights:**
- Email: info@theseahorseclub.com
- We will respond within 45 days

### 7.3 Other Jurisdictions

We comply with privacy laws in all jurisdictions where we operate. If you have rights under your local privacy law, please contact us to exercise them.

### 7.4 Marketing Communications

**Email Marketing:**
- You may opt-out of non-transactional emails (newsletters, feature announcements) by clicking "Unsubscribe" in any email or updating your preferences
- Transactional emails (account confirmations, billing notices) cannot be opted out of

**In-App Communications:**
- You can manage notification preferences in your account settings
- You can disable push notifications in your device settings

**Cookies & Tracking:**
- We use minimal cookies (session only)
- No third-party tracking cookies for advertising
- You can disable cookies in your browser settings

---

## 8. CHILD PRIVACY & SAFETY

### 8.1 Child Data Handling

Seahorse Club is designed for parents and caregivers to track children ages 0–3. We take child privacy very seriously:

**We Do NOT:**
- Directly collect information from children under 13
- Market to children
- Create separate accounts for children
- Collect precise location data without consent
- Use child data for targeted advertising

**We Do:**
- Require parent/caregiver consent to use the App
- Implement strong access controls (only authorized caregivers)
- Encrypt and protect all child data
- Maintain transparent audit logs of who accessed child data

### 8.2 Parental Responsibility

You represent and warrant that:
- You are the parent, guardian, or authorized caregiver of any child data you log
- You have the legal authority to manage this child's information
- You have disclosed the use of the App to other caregivers with access
- You will not use the App to log information about children you do not have authority to manage
- You understand that sharing your account credentials with others grants them access to all child data

### 8.3 Caregiver Permissions

If you invite other caregivers to access your child's data:
- You remain responsible for their actions
- You can revoke access at any time
- Their access ends immediately upon removal from the family
- You can audit which caregiver logged each entry

---

## 9. INTERNATIONAL DATA TRANSFERS

### 9.1 Cross-Border Processing

Your information may be processed and stored in multiple countries where we or our service providers operate:

**Primary Locations:**
- **United Kingdom** (Seahorse Club headquarters)
- **European Union** (Supabase EU servers)
- **United States** (Google Cloud for AI analysis, Stripe, RevenueCat)
- **Other regions** where our partners have infrastructure

### 9.2 Legal Basis for Transfers

**UK/EU Data Transfers:**
- Transfer relies on Standard Contractual Clauses (SCCs) with our processors
- We assess recipients' privacy standards before any transfer
- You can request details of transfer mechanisms by contacting us

**US Transfers:**
- Some service providers (Google, Stripe) are not under UK GDPR equivalent protection
- We enter into Data Processing Agreements (DPAs) with all processors
- We apply additional safeguards where necessary

### 9.3 Your Consent

By using the App, you consent to the transfer of your information to countries outside the UK/EU, including countries that may not have equivalent privacy protection. If you do not consent, do not use the App.

---

## 10. THIRD-PARTY LINKS & SERVICES

### 10.1 External Links

The App may link to third-party websites, educational content, or services:
- **Healthcare provider directories**
- **External educational resources**
- **Video hosting platforms** (Cloudflare Stream)
- **Social media** (if sharing is enabled)

### 10.2 Third-Party Privacy

We are **not responsible** for:
- Third-party privacy practices
- Data collected by linked sites
- Policies of external services

**Your Responsibility:**
- Review third-party privacy policies before sharing information
- We recommend reading the privacy policies of any external site before providing data

---

## 11. ANALYTICS & MONITORING

### 11.1 Usage Analytics

We may use:
- **Sentry** or similar error tracking (crash reports, performance logs)
- **Segment** or similar analytics (feature usage, user journeys)
- **Custom analytics** (built into our backend)

### 11.2 What We Track

- Which features are used most
- How long users spend in the App
- Which pages cause errors
- Device & OS statistics
- Geographic regions (aggregated)

### 11.3 Anonymization

Analytics data is **anonymized**:
- No personally identifiable information is included
- User IDs are hashed
- Individual data points cannot identify you

---

## 12. CONTACT & DATA REQUEST PROCEDURES

### 12.1 Contact Information

For privacy questions or to exercise your rights, contact:

**Email:** info@theseahorseclub.com  
**Address:** 797 Harrow Road, London NW10 5PA, United Kingdom  
**Phone:** +447543137777  
**Response Time:** Within 30 days of receipt (or as required by law)

### 12.2 Data Subject Access Request (DSAR)

To request a copy of your personal data:
1. Email info@theseahorseclub.com with subject "Data Subject Access Request"
2. Include your name, email, and account details
3. We will verify your identity and provide data within 30 days

### 12.3 Other Rights Requests

To exercise deletion, correction, or other rights:
1. Email info@theseahorseclub.com describing the right you wish to exercise
2. Include sufficient information for us to identify you
3. We will confirm receipt and timeline for response

### 12.4 Complaints

If you believe we have violated your privacy rights:
1. Contact us first: info@theseahorseclub.com
2. If unresolved, lodge a complaint with the **ICO**: ico.org.uk

---

## 13. CHANGES TO THIS PRIVACY POLICY

### 13.1 Updates & Amendments

We may update this Privacy Policy periodically to reflect:
- Changes in our practices
- New features or services
- Legal or regulatory updates
- Improved clarity

### 13.2 Notification

- We will update the "Last Updated" date at the top of this policy
- Material changes will be communicated via:
  - In-app notification
  - Email to your registered address
  - Website announcement
- We will obtain your consent for material changes before they take effect

### 13.3 Continued Use

Your continued use of the App after changes constitute acceptance of the updated Privacy Policy. If you do not agree with changes, you may delete your account.

---

## 14. ADDITIONAL INFORMATION

### 14.1 Your Legal Rights Are Important

This Privacy Policy is written in clear language. If any section is unclear, please contact us for clarification—we are committed to transparency.

### 14.2 Sensitive Data

We do **not** intentionally collect:
- Biometric data (fingerprints, facial recognition)
- Genetic information
- Health records (we note behavioral observations only, not medical diagnoses)
- Financial information (other than payment processor data)
- Racial or ethnic origin
- Political beliefs
- Religious beliefs
- Sexual orientation

### 14.3 Automated Decision-Making

We do **not** use automated decision-making or profiling that produces legal or similarly significant effects. Our AI analysis (sleep recommendations) is **advisory only** and does not result in automated decisions affecting your account or services.

### 14.4 Data Breach Notification

If we discover a data breach that compromises your personal information:
- We will investigate immediately
- We will notify you within **72 hours** (or as required by law)
- We will notify regulators if required
- We will provide guidance on protective steps

### 14.5 Retention Override

We may retain information longer than stated if:
- Required by law (tax, legal holds)
- Investigating a complaint or suspected breach
- Defending legal claims
- Fulfilling contractual obligations

---

## 15. DEFINITIONS

**Personal Data:** Any information that identifies you or could identify you (email, name, account info, device data, etc.)

**Child Data:** Information about children logged by you (signals, sleep logs, etc.)

**Sensitive Personal Data:** Data revealing racial/ethnic origin, political opinions, religious beliefs, genetic information, biometric data, health data, sexual orientation (not collected by us)

**Processing:** Any action on personal data (collection, storage, analysis, sharing, deletion, etc.)

**Data Controller:** Seahorse Club Ltd (we decide why and how to process your data)

**Data Processor:** Third parties acting on our instructions (Supabase, Stripe, Google, etc.)

**Data Subject:** You (the person whose data is being processed)

---

## 16. ACKNOWLEDGMENT

By using Seahorse Club, you acknowledge that you have read and understood this Privacy Policy and consent to our collection and use of your information as described. If you have any questions, please contact us at info@theseahorseclub.com.

---

**© 2026 Seahorse Club Ltd. All rights reserved.**

**This Privacy Policy is effective as of June 2026 and supersedes all prior privacy notices.**
