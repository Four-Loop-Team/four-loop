# Custom Domain Setup Instructions

After domain verification, update these values:

In `/src/app/api/contact/route.ts` - around line 120:

```typescript
const emailResult = await resend.emails.send({
  from: 'contact@fourloopdigital.com', // Your verified domain
  to: ['scott@fourloopdigital.com'], // Your custom email
  replyTo: email, // Still reply to form submitter
  subject: `Contact Form: ${subject}`, // Cleaner subject line
  html: generateEmailTemplate({
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
    ip: clientIP,
    userAgent,
  }),
});
```

Email template header can be simplified back to:

```html
<div class="header">
  <h1>🔥 New Contact Form Submission</h1>
  <p style="margin: 0; color: #666;">Four Loop Digital</p>
</div>
```
