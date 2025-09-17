# CRM Integration Setup Guide

## Overview
The form has been updated with the following improvements:
1. ✅ Fixed dropdown background color (now black in dark theme)
2. ✅ Added Lithuanian +370 phone prefix selector
3. ✅ Integrated with CRM system for lead management

## Features Added

### 1. Dark Theme Dropdown Fix
- Dropdown options now have black background in dark theme
- Consistent styling with the rest of the form

### 2. Phone Number Input
- Separate +370 prefix selector on the left
- Clean 8-digit phone number input on the right
- Automatic validation for Lithuanian phone numbers

### 3. CRM Integration
- Webhook-based integration (recommended)
- Email fallback system
- UTM parameter tracking
- Multiple CRM platform support

## Setup Instructions

### Option 1: Webhook Integration (Recommended)
1. Set up a webhook in your CRM system (Zapier, Make.com, etc.)
2. Update the webhook URL in `form.html`:
   ```javascript
   const webhookUrl = 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/';
   ```

### Option 2: Direct CRM Integration
Uncomment and configure one of the provided integrations:

#### HubSpot
```javascript
// Uncomment the HubSpot section and add your credentials
const hubspotFormId = 'YOUR_HUBSPOT_FORM_ID';
const hubspotPortalId = 'YOUR_HUBSPOT_PORTAL_ID';
```

#### Salesforce
```javascript
// Uncomment the Salesforce section and add your org ID
formData.append('oid', 'YOUR_SALESFORCE_ORG_ID');
```

#### Pipedrive
```javascript
// Uncomment the Pipedrive section and add your API key
const pipedriveApiKey = 'YOUR_PIPEDRIVE_API_KEY';
```

### Option 3: Email Fallback
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   export EMAIL_USER="your-email@gmail.com"
   export EMAIL_PASS="your-app-password"
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Data Structure Sent to CRM

The form sends the following data structure:
```json
{
  "name": "Vardas Pavardė",
  "email": "email@example.com",
  "phone": "+37061234567",
  "company": "Įmonės pavadinimas",
  "position": "Pareigos",
  "investment_amount": "€10,000 - €50,000",
  "experience": "Pradedantysis",
  "goals": "Investavimo tikslai",
  "message": "Papildoma informacija",
  "newsletter": "Yes/No",
  "privacy_accepted": "Yes/No",
  "source": "Website Form",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "consultation_form"
}
```

## Testing

1. Open the form in your browser
2. Fill out the form with test data
3. Check your CRM system for the new lead
4. Verify email fallback if webhook fails

## Troubleshooting

### Dropdown Still Shows White Background
- Clear browser cache
- Check if `.form-dark` class is applied to the body
- Verify CSS is loading correctly

### Phone Input Issues
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify phone number format (8 digits)

### CRM Integration Not Working
- Check webhook URL is correct
- Verify CORS settings
- Check browser network tab for errors
- Test with email fallback

## Security Notes

- Never commit API keys or credentials to version control
- Use environment variables for sensitive data
- Implement rate limiting for production use
- Add CSRF protection for production deployment

## Support

For technical support or customization requests, contact your development team.
