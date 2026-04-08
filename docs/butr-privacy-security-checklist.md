# Butr Privacy and Security Checklist

This is a practical launch checklist for Butr. It is not legal advice.

## Data you will likely process

- Email address
- Name or display name
- Trading 212 API key and secret
- Account metadata from Trading 212
- Positions, orders, and execution history
- Trade intents, previews, approvals, and audit logs
- IP address, device info, and basic usage logs
- Support messages and signup data

## Data you should avoid collecting unless necessary

- Full card data
- Extra identity documents
- Bank account details
- Chat transcripts that do not help with support or audit
- Free-form notes that duplicate structured trade data

## Core GDPR/UK GDPR actions

- Publish a clear privacy notice
- State your lawful basis for each processing purpose
- Document where data is stored and who can access it
- Set retention periods for credentials, logs, and support data
- Support deletion and access requests
- Put processor agreements in place with any third parties
- Run a DPIA before launch if trade profiling or risk scoring is used
- Keep consent separate from contract acceptance

## Security controls to implement first

- Encrypt broker credentials at rest
- Never log secrets
- Restrict access to production secrets
- Separate user data from system logs
- Rotate credentials when users reconnect or revoke access
- Require approval before execution
- Add an audit trail for setup, preview, approval, and execution
- Alert on suspicious access or repeated failures

## Website and signup requirements

- Add a privacy notice page
- Add terms of use
- Make the signup form explain what data is collected
- Keep marketing consent optional
- Make platform-use consent required only where it is genuinely necessary
- Link to privacy and terms from every signup form

## Launch gate

Before launch, confirm:

- The user can delete their connection
- The user can revoke broker access
- The user can see what data Butr stores
- The user can request a copy of their data
- The user can understand when Butr is acting and why
- The user can tell the difference between marketing, consent, and execution approval
