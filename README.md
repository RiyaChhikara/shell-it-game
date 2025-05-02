# 🐚 Shell It – Educational Game 

This is a fun and educational game built with **Next.js**, **TypeScript**, and **Tailwind CSS** that helps students learn key concepts of absolute and relative paths through interactive gameplay.


## 📚 Has anybody used it before?

This game was featured in **DS105: Data for Data Science** at the **London School of Economics and Political Science (LSE)**.

- 📝 **Course**: DS105 – Data for Data Science
- 🎓 **Instructor**: [Dr Jonathan Cardoso-Silva](https://github.com/jonjoncardoso)
- 🎮 **Shell It Game Author**: [Riya Chhikara](https://github.com/RiyaChhikara)  
- 📁 **Exercise Title**: [*W03 Formative Exercise: Paths, Files, and APIs in the Terminal*](https://lse-dsi.github.io/DS105/2024/winter-term/practice/week03.html) 


**🎯 Learning Goals of the Exercise:**
1. Master file system concepts through an interactive London-based game.  
2. Navigate directories confidently using essential Terminal commands.  
3. Explore JSON structures by fetching and manipulating API data.  
4. Practice professional file documentation and organisation techniques.  
5. Create a comprehensive learning notebook consolidating Terminal, Python, and file handling skills.

This game was used as an engaging entry point to help students understand how relative and absolute file paths work, with a real-world metaphor inspired by exploring London landmarks.

---

## 🧾 Project Structure

```bash
├── app/               # App router (Next.js 13+)
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── public/            # Static assets (images, icons, etc.)
├── styles/            # Tailwind/global CSS
├── .gitignore         # Files ignored by Git
├── package.json       # Project metadata and scripts
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
```

---

## 🚀 Getting Started

Run the project locally in a few simple steps:

### 1. ✅ Prerequisites

Make sure you have **Node.js** and **npm** installed.

#### Install Node.js & npm

- Download from [nodejs.org](https://nodejs.org) (LTS version recommended)
- Or use a version manager:

```bash
# macOS/Linux
brew install nvm
nvm install --lts
```

Check your setup:

```bash
node -v
npm -v
```

---

### 2. 📦 Clone the Repository

```bash
git clone https://github.com/RiyaChhikara/shell-it-game.git
cd shell-it-game
```

---

### 3. 📥 Install Dependencies

```bash
npm install
```

---

### 4. 💻 Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Common Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint (if configured)
```
