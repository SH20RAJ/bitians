# 🎓 BITians.org - The Ultimate Social Hub for BIT Mesra

A comprehensive, feature-rich social media platform designed exclusively for BIT Mesra students. Connect, share, learn, and grow with your campus community through an immersive, modern web experience.

![BITians.org Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop&crop=center)

> **"Connecting BITians, Building Community, Creating Memories"**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4+-06B6D4)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features Overview

### 🏠 **Smart Feed System**
- **Multi-Media Posts**: Share text, photos, videos, and audio content
- **K-Batch System**: Smart batch identification (K24, K23, K22, etc.) based on admission year
- **Hashtags & Mentions**: Tag content and mention fellow students with @username
- **Interactive Engagement**: Like, comment, share, and bookmark posts
- **Smart Filtering**: Filter content by academic year, branch, or interests

### 🔥 **Hot or Not** 
- **Student Rating System**: Rate and discover the most popular students
- **Leaderboard Rankings**: See who's trending on campus
- **Anonymous Voting**: Private rating system with public leaderboards
- **Statistics Tracking**: Personal voting history and hot streaks

### 👥 **Campus Communities**

#### **🎯 Circles**
- **Interest-Based Groups**: Join communities based on hobbies, academics, or projects
- **Real-time Chat**: Group messaging within circles
- **Event Organization**: Plan and coordinate circle activities
- **Content Sharing**: Share posts exclusively within your circles

#### **📚 Study Groups**
- **Subject-wise Groups**: Find study partners for specific courses
- **Session Scheduling**: Organize group study sessions
- **Resource Sharing**: Share notes, assignments, and study materials
- **Progress Tracking**: Monitor group learning goals

### 🛒 **BitMart - Campus Marketplace**
- **Buy & Sell**: Trade textbooks, electronics, furniture, and more
- **Service Exchange**: Offer tutoring, project help, or other services
- **Safe Transactions**: Built-in rating and review system
- **Category Browsing**: Easy discovery through organized categories

### 🎉 **Campus Life Features**

#### **📅 Events Hub**
- **Event Discovery**: Find workshops, fests, competitions, and social events
- **Quick Registration**: One-click event registration and reminders
- **Event Creation**: Organize your own campus events
- **Calendar Integration**: Track your event schedule

#### **💭 Anonymous Confessions**
- **Safe Expression**: Share thoughts anonymously
- **Topic Categories**: Love, academics, mental health, career advice
- **Community Support**: Supportive responses from fellow students
- **Trending Discussions**: Discover popular confession topics

#### **🔍 Lost & Found**
- **Item Recovery**: Report lost items and help others find theirs
- **Photo Uploads**: Visual identification for lost items
- **Location Tracking**: Mark where items were lost or found
- **Reward System**: Offer incentives for item return

#### **📝 Notes Sharing**
- **Academic Resources**: Share and download study materials
- **Quality Ratings**: Rate notes for accuracy and usefulness
- **Subject Organization**: Categorized by semester, branch, and subject
- **Search & Filter**: Find exactly what you need quickly

## 🎨 Design Philosophy

### **Modern Aesthetics**
- **Glass Morphism**: Translucent design with backdrop blur effects
- **Gradient Accents**: Beautiful color transitions throughout the platform
- **Micro-Interactions**: Smooth animations and hover effects
- **Responsive Design**: Seamless experience across all devices

### **User Experience**
- **Intuitive Navigation**: Easy-to-use interface designed for students
- **Dark/Light Mode**: Automatic theme switching with manual override
- **Accessibility First**: WCAG compliant design for all users
- **Performance Optimized**: Fast loading times and smooth interactions

## 🚀 Technology Stack

```javascript
const techStack = {
  frontend: {
    framework: "Next.js 15.3.3",
    styling: "Tailwind CSS",
    icons: "Lucide React",
    animations: "CSS Transitions + Custom Effects"
  },
  architecture: {
    patterns: "Component-based Architecture",
    stateManagement: "React Hooks & Context",
    routing: "Next.js App Router",
    themes: "Custom Theme Provider"
  },
  performance: {
    bundler: "Turbopack",
    optimization: "Code Splitting & Lazy Loading",
    caching: "Browser & Local Storage"
  }
}
```

## 📱 Platform Structure

```
BITians.org/
├── 🏠 Homepage              # Social feed and quick actions
├── 📰 Feeds                 # Filtered content streams
├── ✍️  Create               # Multi-media post creation
├── 🔥 Hot or Not           # Student rating system
├── 👤 Profile              # Personal dashboard
├── 🎯 Circles              # Interest-based communities
├── 📚 Study Groups         # Academic collaboration
├── 🛒 BitMart              # Campus marketplace
├── 🎉 Events               # Campus activities
├── 💭 Confessions          # Anonymous sharing
├── 🔍 Lost & Found         # Item recovery system
└── 📝 Notes Share          # Academic resources
```

## 🎓 K-Batch System

The platform features an intelligent batch identification system:

- **K24**: First-year students (Admitted July 2024 - Current)
- **K23**: Second-year students (Admitted July 2023)
- **K22**: Third-year students (Admitted July 2022)
- **K21**: Fourth-year students (Admitted July 2021)

Each user automatically receives their K-badge based on admission year, helping students connect with their batch-mates and seniors/juniors.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/bitians.git
cd bitians

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_NAME=BITians.org
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
```

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and design system
│   ├── layout.js          # Root layout with providers
│   ├── page.js            # Homepage component
│   ├── feeds/             # Social feed pages
│   ├── create/            # Content creation
│   ├── hot-or-not/        # Rating system
│   ├── profile/           # User profiles
│   └── ...                # Other feature pages
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components
│   ├── BottomNavigation.js # Mobile navigation
│   ├── ThemeProvider.js   # Theme management
│   └── Toast.js           # Notification system
└── lib/                   # Utility functions
    └── utils.js           # Helper functions
```

## 🎯 Key Features Deep Dive

### **Multi-Media Content Support**
- 📸 **Photos**: High-quality image sharing with filters
- 🎥 **Videos**: Video posts with thumbnail previews
- 🎵 **Audio**: Voice notes and audio content sharing
- 📝 **Text**: Rich text posts with hashtags and mentions

### **Social Engagement**
- ❤️ **Reactions**: Like, love, and other emoji reactions
- 💬 **Comments**: Threaded discussions on posts
- 🔗 **Sharing**: Cross-platform content sharing
- 🔖 **Bookmarks**: Save posts for later viewing

### **Smart Discovery**
- 🏷️ **Hashtags**: Trending topics and content discovery
- @️⃣ **Mentions**: Tag and notify other students
- 🔍 **Search**: Intelligent search across all content
- 📊 **Trending**: Algorithm-driven content promotion

## 🌟 User Experience Highlights

### **Onboarding**
- Smooth registration process with batch year detection
- Interactive tutorial for new users
- Profile setup with interests and academic details
- Automatic circle and study group recommendations

### **Daily Usage**
- Personalized feed based on interests and connections
- Real-time notifications for important updates
- Quick access to frequently used features
- Seamless mobile and desktop experience

### **Community Building**
- Easy group creation and management
- Event planning and coordination tools
- Anonymous feedback and confession systems
- Academic collaboration features

## 📊 Platform Statistics

- **12 Core Features**: Comprehensive campus platform
- **100+ UI Components**: Modern, reusable component library
- **Mobile-First Design**: Optimized for smartphone usage
- **Real-Time Features**: Live chat and instant notifications
- **K-Batch Integration**: Smart student identification system

## 🚀 Future Roadmap

### **Phase 1: Enhanced Social Features**
- [ ] Advanced post editing and formatting
- [ ] Story/Status updates (24-hour posts)
- [ ] Direct messaging system
- [ ] Group video calls integration

### **Phase 2: Academic Integration**
- [ ] Course schedule integration
- [ ] Assignment tracking and reminders
- [ ] Grade sharing and comparison
- [ ] Professor rating system

### **Phase 3: Advanced Features**
- [ ] AI-powered content recommendations
- [ ] Campus map integration
- [ ] Ride sharing for outstation students
- [ ] Job and internship board

### **Phase 4: Platform Expansion**
- [ ] Mobile app development (React Native)
- [ ] Push notifications
- [ ] Offline content access
- [ ] Advanced analytics dashboard

## 🏆 Why BITians.org?

### **For Students**
- **Stay Connected**: Never miss out on campus happenings
- **Academic Success**: Access to study resources and groups
- **Social Growth**: Build meaningful friendships and networks
- **Convenience**: All campus needs in one platform

### **For Campus Community**
- **Information Hub**: Centralized campus communication
- **Event Promotion**: Reach more students effectively
- **Resource Sharing**: Collaborative learning environment
- **Anonymous Feedback**: Safe space for honest opinions

## 🤝 Contributing

We welcome contributions from the BIT Mesra community! Here's how you can help:

### **For Developers**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and commit (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **For Students**
- Report bugs and issues
- Suggest new features
- Share feedback and ideas
- Help with testing and QA

## 📞 Support & Community

- **🐛 Report Issues**: [GitHub Issues](https://github.com/your-username/bitians/issues)
- **💡 Feature Requests**: [Discussions](https://github.com/your-username/bitians/discussions)
- **📧 Contact**: support@bitians.org
- **📱 Social**: Follow us on campus social media

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BIT Mesra Community**: For inspiration and feedback
- **Open Source Contributors**: For amazing tools and libraries
- **Design Community**: For UI/UX inspiration
- **Beta Testers**: Early adopters who helped shape the platform

---

<div align="center">

**Built with ❤️ for BIT Mesra Students**

*Creating connections, fostering community, and enhancing the college experience through technology.*

[🌐 Visit Website](https://bitians.org) • [📱 Download App](https://app.bitians.org) • [📧 Contact Us](mailto:support@bitians.org)

</div>
