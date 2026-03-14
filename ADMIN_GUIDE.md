# Admin Panel Access Guide

## Overview
The RSGRT Institute website includes a secure admin panel for managing courses, news articles, and user messages. Access is restricted to authorized administrators only.

---

## How to Access the Admin Panel

### Step 1: Authentication
1. **Navigate to any page** on the RSGRT Institute website
2. **Click the "Login" button** in the top-right corner of the navbar
3. **Sign in with Google** using your registered email address
   - A popup will appear prompting you to authenticate with Google
   - Use the email that matches your admin credentials

### Step 2: Check Admin Privileges
- After logging in, **your profile avatar will appear** in the navbar (top-right)
- If you are an authorized admin, you will see an **"Admin" link** appear in the navigation menu
  - **Desktop view**: Text "Admin" with a shield icon
  - **Mobile view**: "Admin Panel" option in the hamburger menu

### Step 3: Access the Admin Dashboard
1. **Click the "Admin" link** in the navbar (only visible to admins)
2. Or **navigate directly** to: `https://rsgrt-institute.vercel.app/admin`
3. You will land on the **Admin Dashboard** with:
   - Summary statistics (total courses, news articles, messages)
   - List of recent messages received

---

## Admin Panel Features

### 📊 Dashboard (`/admin`)
- View overall statistics:
  - Total number of courses
  - Total number of news articles
  - Total messages received
- See the **5 most recent messages** with:
  - User name
  - Message content
  - Timestamp

---

### 📚 Courses Management (`/admin/courses`)
**Full CRUD Operations:**
- ✅ **Create** new courses
  - Enter course title
  - Add course description
  - Upload course image/thumbnail
  - Set course category
- ✅ **Read** all courses (view list)
- ✅ **Update** existing courses
  - Edit course details
  - Update course image
  - Change course description
- ✅ **Delete** courses (permanently remove)

**Features:**
- Search and filter courses
- Edit any course directly from the list
- Immediate updates reflect on the public site

---

### 📰 News Management (`/admin/news`)
**Full CRUD Operations:**
- ✅ **Create** new news articles
  - Add article title
  - Write article content
  - Add featured image
  - Set publish date
- ✅ **Read** all news articles (view list)
- ✅ **Update** existing articles
  - Edit title and content
  - Update featured image
  - Change publication date
- ✅ **Delete** articles (permanently remove)

**Features:**
- Add rich content to articles
- Set publication dates
- View all articles in chronological order

---

### 💬 Messages (`/admin/messages`)
**Read-only Interface:**
- View all messages submitted through the **Contact Form**
- See message details:
  - **Sender name**
  - **Message content**
  - **Timestamp** (when message was sent)
- **Sort and filter** messages by date

---

## Admin Sidebar Navigation

When logged in as an admin, the left sidebar displays quick navigation links:
1. **Dashboard** - Main overview and statistics
2. **Courses** - Manage course offerings
3. **News** - Manage news articles
4. **Messages** - View submitted messages
5. **Back to Site** - Return to public website

---

## Authorization & Security

### Who Can Access?
- Only email addresses listed in the `NEXT_PUBLIC_ADMIN_EMAILS` environment variable can access the admin panel
- Current authorized admin email: `contact.rsgrt@gmail.com`

### How It Works:
1. **Client-side check**: Admin link only appears in navbar for authorized users
2. **Server-side verification**: 
   - JWT token is verified on each admin page
   - Email address is confirmed to be in the admin list
   - Non-admins are automatically redirected to the home page
3. **API-level protection**:
   - All admin API endpoints (`/api/admin/*`) require:
     - Valid JWT token in Authorization header
     - Email must be in ADMIN_EMAILS list
   - Only then can server-side database operations proceed

### Security Features:
- ✅ OAuth 2.0 authentication via Google
- ✅ JWT token-based session management
- ✅ Row-Level Security (RLS) policies on database
- ✅ Service role key isolated to server-side only
- ✅ Email-based authorization checks
- ✅ All sensitive operations verified twice (client + server)

---

## Logout

### To Logout:
1. **Click your profile avatar** in the top-right corner
2. A dropdown menu will appear
3. **Click "Logout"** to sign out
4. You will be redirected to the home page
5. The "Admin" link will disappear from the navbar

---

## Troubleshooting

### Problem: "Admin" link doesn't appear after login
- **Cause**: Your email is not in the authorized admin list
- **Solution**: Contact the site administrator to add your email to `NEXT_PUBLIC_ADMIN_EMAILS`

### Problem: Getting redirected from `/admin` page
- **Cause**: Your session expired or you're not logged in
- **Solution**: Log in again using the "Login" button in the navbar

### Problem: Can't see messages I submitted via contact form
- **Cause**: You might need to refresh the page or re-authenticate
- **Solution**: 
  1. Log out completely
  2. Clear browser cookies (optional)
  3. Log back in as admin
  4. Navigate to Messages page

### Problem: Changes aren't saving
- **Cause**: Network error or database connectivity issue
- **Solution**: 
  1. Check your internet connection
  2. Try again
  3. Check browser console for error messages (F12)
  4. Contact support if issue persists

---

## Database Schema Reference

### Tables You Can Manage:

**courses**
- `id`: Unique identifier
- `syllabus_slug`: URL-friendly course identifier
- `title`: Course name
- `description`: Course details
- `image_url`: Course thumbnail/image
- `created_at`: When course was added

**news**
- `id`: Unique identifier
- `title`: Article headline
- `content`: Article body text
- `image_url`: Featured image
- `created_at`: Publication date

**messages**
- `id`: Unique identifier
- `sender_id`: Profile of sender (from contact form)
- `content`: Message text
- `created_at`: When message was received

---

## Environment Variables

For the admin panel to work correctly, these must be set:

```env
# Public (safe to expose):
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_ADMIN_EMAILS=contact.rsgrt@gmail.com

# Server-only (keep secret):
NEXT_SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

---

## Adding More Admins

To add another admin user:

1. **Contact the site administrator**
2. **Provide the authorized email address** to add
3. **Update** `NEXT_PUBLIC_ADMIN_EMAILS` environment variable:
   ```
   NEXT_PUBLIC_ADMIN_EMAILS=contact.rsgrt@gmail.com,newemail@example.com
   ```
4. **Redeploy** the application for changes to take effect

---

## Support

For questions or issues with the admin panel:
- 📧 Email: `contact.rsgrt@gmail.com`
- 📞 Phone: `+977-9702629297`
- 💬 WhatsApp: `+977 9702629297`

---

**Last Updated**: March 2026
**Version**: 1.0.0
