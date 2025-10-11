import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function AnimatedRoutes() {
  const location = useLocation()

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    }
  }

  const pageTransition = {
    duration: 0.4,
    ease: "easeInOut"
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              style={{
                position: 'absolute',
                width: '100%',
                minHeight: '100vh'
              }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/progetti"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              style={{
                position: 'absolute',
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#ffffff'
              }}
            >
              <Projects />
            </motion.div>
          }
        />
        <Route
          path="/progetti/:id"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              style={{
                position: 'absolute',
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#ffffff'
              }}
            >
              <ProjectDetail />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              style={{
                position: 'absolute',
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#ffffff'
              }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              style={{
                position: 'absolute',
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#ffffff'
              }}
            >
              <Contact />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  )
}

export default App

