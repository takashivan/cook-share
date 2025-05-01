"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion"
import { Phone, User, ChevronDown, ArrowRight, Star } from "lucide-react"

export default function ChefLandingPage() {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  // Enhanced scroll-based animations
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  // Parallax effects
  const parallax1 = useTransform(scrollY, [0, 1000], [0, -150])
  const parallax2 = useTransform(scrollY, [0, 1000], [0, -100])
  const parallax3 = useTransform(scrollY, [0, 1000], [0, -50])

  // Rotation effects
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 10])
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -5])

  // InView detection for sections
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 })
  const isFeaturesInView = useInView(featuresRef, { once: false, amount: 0.3 })
  const isAboutInView = useInView(aboutRef, { once: false, amount: 0.3 })
  const isBenefitsInView = useInView(benefitsRef, { once: false, amount: 0.3 })
  const isStepsInView = useInView(stepsRef, { once: false, amount: 0.3 })
  const isTestimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 })

  // Animation controls
  const featureControls = useAnimation()
  const aboutControls = useAnimation()
  const benefitsControls = useAnimation()
  const stepsControls = useAnimation()
  const testimonialsControls = useAnimation()

  // Update active section based on scroll position
  useEffect(() => {
    const sections = [
      { ref: heroRef, id: "hero" },
      { ref: featuresRef, id: "features" },
      { ref: aboutRef, id: "about" },
      { ref: benefitsRef, id: "benefits" },
      { ref: stepsRef, id: "steps" },
      { ref: testimonialsRef, id: "testimonials" },
    ]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        if (!section.ref.current) continue

        const offsetTop = section.ref.current.offsetTop
        const offsetHeight = section.ref.current.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Trigger animations when sections come into view
  useEffect(() => {
    if (isFeaturesInView) featureControls.start("visible")
    if (isAboutInView) aboutControls.start("visible")
    if (isBenefitsInView) benefitsControls.start("visible")
    if (isStepsInView) stepsControls.start("visible")
    if (isTestimonialsInView) testimonialsControls.start("visible")
  }, [
    isFeaturesInView,
    isAboutInView,
    isBenefitsInView,
    isStepsInView,
    isTestimonialsInView,
    featureControls,
    aboutControls,
    benefitsControls,
    stepsControls,
    testimonialsControls,
  ])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Testimonials data
  const testimonials = [
    {
      name: "田中 健太",
      role: "フレンチシェフ",
      text: "CHEFDOMのおかげで、様々なレストランで経験を積むことができました。自分のスキルを高めながら、柔軟な働き方ができるのが最高です。",
      rating: 5,
    },
    {
      name: "佐藤 美咲",
      role: "パティシエ",
      text: "自分のペースで働けるのが魅力です。様々な店舗のデザートメニュー開発に携わる機会が増え、クリエイティビティを発揮できています。",
      rating: 5,
    },
    {
      name: "鈴木 大輔",
      role: "和食料理人",
      text: "伝統的な和食の技術を様々な場所で活かせるようになりました。収入も安定し、キャリアの幅も広がっています。",
      rating: 4,
    },
  ]

  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ナビゲーションドット */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          {["hero", "features", "about", "benefits", "steps", "testimonials"].map((section) => (
            <motion.div
              key={section}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                activeSection === section ? "bg-red-500" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                const element = document.getElementById(section)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* ヘッダー */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                  <Image
                    src="/placeholder.svg?height=32&width=32&text=CHEF"
                    alt="CHEFDOM"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                </motion.div>
                <span className="font-bold text-lg">CHEFDOM</span>
              </Link>
              <div className="hidden md:block ml-10">
                <span className="text-xs text-gray-600">料理人と飲食店の出会いを創る、最適なマッチングサービス</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="#contact"
                className="hidden md:flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone className="h-4 w-4 mr-1" />
                <span>お問い合わせ</span>
              </Link>
              <Link
                href="#login"
                className="hidden md:flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <User className="h-4 w-4 mr-1" />
                <span>ログイン</span>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#register"
                  className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  新規登録
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ヒーローセクション */}
      <motion.section
        id="hero"
        ref={heroRef}
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      >
        {/* 背景の装飾要素 */}
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60 z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 z-0"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                働く場所も時間も、
                <br />
                <span className="text-red-500">もっと自由に。</span>
              </motion.h1>
              <motion.p
                className="mt-6 text-xl text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                料理で、あなたらしいキャリアを
                <br />
                デザインしよう。
              </motion.p>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden inline-block"
                >
                  <Link
                    href="#register"
                    className="inline-flex items-center bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <span className="mr-2">シェフ新規登録はこちら</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
                <p className="mt-4 text-sm text-gray-500 flex items-center">
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="inline-block mr-2"
                  >
                    ✨
                  </motion.span>
                  登録後は最短即日で働けます
                </p>
              </motion.div>
            </motion.div>

            <div className="relative h-80 md:h-[500px] lg:h-[600px]">
              {/* 3D効果のあるイメージグリッド */}
              <motion.div
                className="grid grid-cols-3 gap-2 h-full perspective-1000"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  style={{ y: parallax1, rotateY: rotate1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=300&text=Chef1"
                    alt="Chef cooking"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>

                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-lg translate-y-6"
                  style={{ y: parallax2, rotateY: rotate2 }}
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=300&text=Chef2"
                    alt="Chef plating"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>

                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  style={{ y: parallax3, rotateY: rotate1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=300&text=Chef3"
                    alt="Chef working"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </motion.div>

              {/* 装飾要素 */}
              <motion.div
                className="absolute -bottom-5 -right-5 w-20 h-20 bg-red-500 rounded-full z-10 flex items-center justify-center text-white font-bold"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.6, type: "spring" }}
              >
                即日勤務
              </motion.div>
            </div>
          </div>

          {/* スクロールダウン指示 */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-sm text-gray-500 mb-2">詳しく見る</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="h-6 w-6 text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 特徴セクション */}
      <section id="features" ref={featuresRef} className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featureControls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              CHEFDOMなら！
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-500"
                initial={{ width: 0 }}
                animate={featureControls}
                variants={{
                  hidden: { width: 0 },
                  visible: { width: "100%", transition: { duration: 0.8, delay: 0.3 } },
                }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              custom={0}
              initial="hidden"
              animate={featureControls}
              variants={staggerVariants}
              className="text-center p-8 border rounded-lg hover:shadow-lg transition-shadow relative overflow-hidden group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block mb-6"
              >
                <Image
                  src="/placeholder.svg?height=80&width=80&text=シェフ帽子"
                  alt="無料アイコン"
                  width={80}
                  height={80}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">
                登録費用
                <br />
                <span className="text-red-500 text-3xl">無料</span>
              </h3>
              <p className="text-gray-600">完全無料でご利用いただけます</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate={featureControls}
              variants={staggerVariants}
              className="text-center p-8 border rounded-lg hover:shadow-lg transition-shadow relative overflow-hidden group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block mb-6"
              >
                <Image
                  src="/placeholder.svg?height=80&width=80&text=キャリア"
                  alt="キャリアアイコン"
                  width={80}
                  height={80}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">
                新しい
                <br />
                <span className="text-red-500 text-3xl">キャリア</span>
                <span className="text-xl">形成</span>
              </h3>
              <p className="text-gray-600">あなたのスキルを活かせる場所</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              animate={featureControls}
              variants={staggerVariants}
              className="text-center p-8 border rounded-lg hover:shadow-lg transition-shadow relative overflow-hidden group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block mb-6"
              >
                <Image
                  src="/placeholder.svg?height=80&width=80&text=エプロン"
                  alt="即日アイコン"
                  width={80}
                  height={80}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">
                <span className="text-red-500 text-3xl">最短即日</span>
                <br />
                <span>から働ける</span>
              </h3>
              <p className="text-gray-600">すぐに仕事が見つかります</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* サービス説明セクション */}
      <section id="about" ref={aboutRef} className="py-20 md:py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* 装飾要素 */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30 z-0"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <motion.div
            initial="hidden"
            animate={aboutControls}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight" variants={fadeInUp}>
              CHEFDOMは
              <br />
              <span className="text-black">必要な時に、必要なだけ</span>働ける
              <br />
              シェフと飲食店のマッチングサービスです。
            </motion.h2>

            <motion.p className="text-gray-600 mb-12 text-lg" variants={fadeInUp}>
              飲食業界に特化したマッチングで、シェフのスキルと飲食店のニーズを最適につなげます。
              <br />
              一つひとつの出会いが、あなたのキャリアにしっかりとつながっていきます。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={aboutControls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
              }}
              className="relative h-60 md:h-80"
            >
              <div className="relative z-10 h-full">
                <Image
                  src="/placeholder.svg?height=320&width=800&text=シェフのイラスト"
                  alt="シェフのイラスト"
                  fill
                  className="object-contain"
                />
              </div>

              {/* 装飾的な背景要素 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl -z-10"
                animate={{
                  scale: [1, 1.03, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            <motion.div className="mt-12" variants={scaleIn}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden inline-block"
              >
                <Link
                  href="#register"
                  className="inline-flex items-center bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <span className="mr-2">シェフ新規登録はこちら</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 特徴詳細セクション */}
      <section id="benefits" ref={benefitsRef} className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate={benefitsControls} variants={fadeInUp} className="text-center mb-20">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="inline-block mb-4 bg-red-50 p-3 rounded-full"
            >
              <Image src="/placeholder.svg?height=60&width=60&text=CHEF" alt="CHEFDOM" width={60} height={60} />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              CHEFDOMの特徴
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-500"
                initial={{ width: 0 }}
                animate={benefitsControls}
                variants={{
                  hidden: { width: 0 },
                  visible: { width: "100%", transition: { duration: 0.8, delay: 0.3 } },
                }}
              />
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            animate={benefitsControls}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="text-center">
              <motion.div
                className="relative h-48 mb-8 overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/placeholder.svg?height=200&width=300&text=自由な働き方"
                  alt="自由な働き方"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-red-500">自由な働き方</h3>
              <p className="text-gray-600">
                働きたいときに、働きたい場所で。フレックスな働き方で、あなたのライフスタイルに合わせた働き方ができます。
                プライベートとの両立も可能です。
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="text-center">
              <motion.div
                className="relative h-48 mb-8 overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/placeholder.svg?height=200&width=300&text=キャリア形成"
                  alt="キャリア形成"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-red-500">キャリア形成</h3>
              <p className="text-gray-600">
                様々な店舗でのプロフェッショナルな経験を積むことで、あなたのスキルと経験値を高めることができます。
                多様な料理スタイルに触れる機会も増えます。
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="text-center">
              <motion.div
                className="relative h-48 mb-8 overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/placeholder.svg?height=200&width=300&text=収入最適化"
                  alt="収入最適化"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-red-500">収入最適化</h3>
              <p className="text-gray-600">
                あなたのスキルに見合った報酬を得られます。時給制で明確な収入計画が立てられ、収入を最大化できます。
                繁忙期には集中して働くことも可能です。
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4ステップセクション */}
      <section id="steps" ref={stepsRef} className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate={stepsControls} variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              働くまでの<span className="text-red-500">4</span>ステップ
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-500"
                initial={{ width: 0 }}
                animate={stepsControls}
                variants={{
                  hidden: { width: 0 },
                  visible: { width: "100%", transition: { duration: 0.8, delay: 0.3 } },
                }}
              />
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" animate={stepsControls} variants={staggerContainer} className="relative">
              {/* 接続線 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block" />

              {/* ステップ1 */}
              <motion.div variants={staggerItem} className="flex flex-col md:flex-row items-center mb-20 relative">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                  <div className="text-red-500 text-5xl font-bold mb-4">01.</div>
                  <h3 className="text-2xl font-bold mb-4">プロフィール作成</h3>
                  <p className="text-gray-600">これまでの経験やスキルなどを登録。簡単な入力で完了します！</p>
                </div>
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded-full z-10 hidden md:flex items-center justify-center text-white font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  1
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="md:w-1/2 relative h-60 md:h-80 overflow-hidden rounded-xl shadow-xl"
                >
                  <Image
                    src="/chef_illust/chef_profile_image.png"
                    alt="プロフィール作成"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </motion.div>

              {/* ステップ2 */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col md:flex-row-reverse items-center mb-20 relative"
              >
                <div className="md:w-1/2 mb-6 md:mb-0 md:pl-12">
                  <div className="text-red-500 text-5xl font-bold mb-4">02.</div>
                  <h3 className="text-2xl font-bold mb-4">お仕事を探す</h3>
                  <p className="text-gray-600">あなたのスキルや条件に合った求人を探してみましょう！</p>
                </div>
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded-full z-10 hidden md:flex items-center justify-center text-white font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  2
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="md:w-1/2 relative h-60 md:h-80 overflow-hidden rounded-xl shadow-xl"
                >
                  <Image
                    src="/chef_illust/chef_search_image.png"
                    alt="お仕事を探す"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </motion.div>

              {/* ステップ3 */}
              <motion.div variants={staggerItem} className="flex flex-col md:flex-row items-center mb-20 relative">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                  <div className="text-red-500 text-5xl font-bold mb-4">03.</div>
                  <h3 className="text-2xl font-bold mb-4">チャットで確認</h3>
                  <p className="text-gray-600">店舗とのチャットで詳細を確認。お互いの条件について確認できます。</p>
                </div>
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded-full z-10 hidden md:flex items-center justify-center text-white font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  3
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="md:w-1/2 relative h-60 md:h-80 overflow-hidden rounded-xl shadow-xl"
                >
                  <Image
                    src="/placeholder.svg?height=320&width=400&text=チャットで確認"
                    alt="チャットで確認"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </motion.div>

              {/* ステップ4 */}
              <motion.div variants={staggerItem} className="flex flex-col md:flex-row-reverse items-center relative">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pl-12">
                  <div className="text-red-500 text-5xl font-bold mb-4">04.</div>
                  <h3 className="text-2xl font-bold mb-4">出勤して働く</h3>
                  <p className="text-gray-600">お店に出勤してお仕事スタート！あなたのスキルを活かしましょう。</p>
                </div>
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded-full z-10 hidden md:flex items-center justify-center text-white font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  4
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="md:w-1/2 relative h-60 md:h-80 overflow-hidden rounded-xl shadow-xl"
                >
                  <Image
                    src="/placeholder.svg?height=320&width=400&text=出勤して働く"
                    alt="出勤して働く"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsControls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.2 } },
            }}
            className="text-center mt-20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden inline-block"
            >
              <Link
                href="#register"
                className="inline-flex items-center bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
              >
                <span className="mr-2">シェフ新規登録はこちら</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 口コミセクション */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate={testimonialsControls} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              シェフの声
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-500"
                initial={{ width: 0 }}
                animate={testimonialsControls}
                variants={{
                  hidden: { width: 0 },
                  visible: { width: "100%", transition: { duration: 0.8, delay: 0.3 } },
                }}
              />
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={testimonialsControls}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Image
                  src="/placeholder.svg?height=40&width=40&text=CHEF"
                  alt="CHEFDOM"
                  width={40}
                  height={40}
                  className="mr-3 invert"
                />
                <span className="font-bold text-2xl">CHEFDOM</span>
              </div>
              <p className="text-gray-400 mb-6">料理人と飲食店の出会いを創る、最適なマッチングサービス</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">サービス</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    シェフ向けサービス
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    飲食店向けサービス
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    料金プラン
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    よくある質問
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">会社情報</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    会社概要
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    ニュース
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    採用情報
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">法的情報</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="https://corp.cookbiz.co.jp/privacy-policy/" className="text-gray-400 hover:text-white transition-colors">
                    プライバシーポリシー
                  </a>
                </li>
                
                <li>
                  <a href="https://corp.cookbiz.co.jp/privacy-policy-treatment/" className="text-gray-400 hover:text-white transition-colors">
                    個人情報の取扱いについて
                  </a>
                </li>
                <li>
                  <a href="https://corp.cookbiz.co.jp/privacy-policy-publication/" className="text-gray-400 hover:text-white transition-colors">
                    個人情報に関する公表文
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© cookchef Co.,Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
