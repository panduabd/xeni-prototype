import * as React from "react"
import {
  Search,
  Plus,
  MoreVertical,
  Save,
  Pencil,
  Trash2,
  Upload,
  Globe,
  Camera,
  Layers,
  Sparkles,
  FileText,
  Package,
  Brain,
  Share2,
  Info,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

interface BusinessDNA {
  id: string
  name: string
  category: string
  color: string
  updatedAt: string
  overview?: string
  guidance?: string
}

interface KnowledgeItem {
  id: string
  title: string
  content: string
}

interface ProductItem {
  id: string
  name: string
  category: string
  imageUrl?: string
}

interface ConnectedAccount {
  id: string
  handle: string
  platform: string
  icon: "instagram" | "tiktok" | "facebook"
  active: boolean
}

function SocialIcon({ icon }: { icon: "instagram" | "tiktok" | "facebook" }) {
  if (icon === "instagram") {
    return (
      <svg className="w-[17.5px] h-[17.5px] shrink-0" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ig-g-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#f9a825"/>
            <stop offset="20%" stopColor="#f77737"/>
            <stop offset="45%" stopColor="#e1306c"/>
            <stop offset="70%" stopColor="#c13584"/>
            <stop offset="100%" stopColor="#833ab4"/>
          </linearGradient>
        </defs>
        <path fill="url(#ig-g-b)" d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,72a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM176,20H80A60.07,60.07,0,0,0,20,80v96a60.07,60.07,0,0,0,60,60h96a60.07,60.07,0,0,0,60-60V80A60.07,60.07,0,0,0,176,20Zm36,156a36,36,0,0,1-36,36H80a36,36,0,0,1-36-36V80A36,36,0,0,1,80,44h96a36,36,0,0,1,36,36ZM196,76a16,16,0,1,1-16-16A16,16,0,0,1,196,76Z"/>
      </svg>
    )
  }
  if (icon === "facebook") {
    return (
      <svg className="w-[13.5px] h-[13.5px] shrink-0" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  }
  return (
    <svg className="w-[13.5px] h-[13.5px] shrink-0" viewBox="0 0 24 24" fill="#000000">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.043.87.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.48V8.71a8.28 8.28 0 0 0 4.9 1.57v-3.59h-1z"/>
    </svg>
  )
}

export default function BusinessDnaView() {
  // ── State: DNA List & Active Selection ──
  const [dnaList, setDnaList] = React.useState<BusinessDNA[]>([
    {
      id: "1",
      name: "Fresh Juice Co.",
      category: "Food & Beverage",
      color: "#34D399",
      updatedAt: "2h ago",
      overview: "Fresh Juice Co. is a healthy juice brand focused on organic ingredients and sustainable packaging.",
      guidance: "Clean and minimal layouts. Use ample white space. Avoid clutter. Prioritize readability and accessibility.",
    },
    {
      id: "2",
      name: "Acme Corp",
      category: "Technology",
      color: "#2563EB",
      updatedAt: "5h ago",
      overview: "Enterprise software solutions powering modern workflows.",
      guidance: "Bold technical aesthetic with crisp borders and high-contrast typography.",
    },
    {
      id: "3",
      name: "Luxe Beauty",
      category: "Beauty & Cosmetics",
      color: "#F472B6",
      updatedAt: "1d ago",
      overview: "High-end skincare and beauty products with natural essence.",
      guidance: "Soft pastel gradients, serif headlines, and elegant lifestyle imagery.",
    },
    {
      id: "4",
      name: "TechStart Inc",
      category: "Technology",
      color: "#8B5CF6",
      updatedAt: "2d ago",
      overview: "Incubator and acceleration platform for innovative tech startups.",
      guidance: "Futuristic, vibrant purple accents with clean UI components.",
    },
    {
      id: "5",
      name: "GreenLeaf Organics",
      category: "Retail",
      color: "#10B981",
      updatedAt: "3d ago",
      overview: "Direct-to-consumer organic farm produce and pantry essentials.",
      guidance: "Earthy tones, warm photography, and clear nutritional callouts.",
    },
  ])

  const [activeDnaId, setActiveDnaId] = React.useState<string>("1")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [activeTab, setActiveTab] = React.useState<string>("identity")
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState<boolean>(false)
  const [saveSuccessMsg, setSaveSuccessMsg] = React.useState<string | null>(null)
  const [bannerAlert, setBannerAlert] = React.useState<{
    title?: string
    message: string
    variant?: "default" | "destructive" | "warning" | "success" | "info"
  } | null>(null)

  const triggerAlert = (options: {
    title?: string
    message: string
    variant?: "default" | "destructive" | "warning" | "success" | "info"
  }) => {
    if (typeof window !== "undefined" && typeof (window as any).showAlert === "function") {
      (window as any).showAlert(options)
    } else {
      setBannerAlert(options)
    }
  }

  // Active DNA object
  const activeDna = React.useMemo(() => {
    return dnaList.find((d) => d.id === activeDnaId) || dnaList[0]
  }, [dnaList, activeDnaId])

  // Overview & guidance form state
  const [overviewText, setOverviewText] = React.useState(activeDna.overview || "")
  const [guidanceText, setGuidanceText] = React.useState(activeDna.guidance || "")

  React.useEffect(() => {
    setOverviewText(activeDna.overview || "")
    setGuidanceText(activeDna.guidance || "")
    setHasUnsavedChanges(false)
  }, [activeDnaId])

  // Filtered DNA list
  const filteredDnaList = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return dnaList
    return dnaList.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
    )
  }, [dnaList, searchQuery])

  // ── State: Knowledge Items ──
  const [knowledgeList, setKnowledgeList] = React.useState<KnowledgeItem[]>([
    {
      id: "k1",
      title: "Company History",
      content: "Founded in 2018 in Bali, started as a small artisan juice bar and expanded nationally.",
    },
    {
      id: "k2",
      title: "Product Lines",
      content: "Cold-pressed juices, smoothies, wellness shots, and immune booster cleanses.",
    },
    {
      id: "k3",
      title: "Competitors",
      content: "Pressed Juicery, Suja Juice, Blueprint Cleanse.",
    },
    {
      id: "k4",
      title: "Unique Selling Points",
      content: "100% organic raw ingredients, locally sourced from farmers, zero-waste compostable packaging.",
    },
  ])

  // ── State: Products ──
  const [products, setProducts] = React.useState<ProductItem[]>([
    { id: "p1", name: "Cold Pressed Juice Box", category: "Physical Product" },
    { id: "p2", name: "Ginger Wellness Shot", category: "Physical Product" },
    { id: "p3", name: "7-Day Detox Plan", category: "Digital Guide" },
  ])

  // ── State: Connected Accounts ──
  const [connectedAccounts, setConnectedAccounts] = React.useState<ConnectedAccount[]>([
    { id: "a1", handle: "@freshjuice.co", platform: "Instagram Business", icon: "instagram", active: true },
    { id: "a2", handle: "@freshjuice", platform: "TikTok", icon: "tiktok", active: true },
  ])

  // ── State: Modals / Dialogs ──
  const [openNewDna, setOpenNewDna] = React.useState(false)
  const [openExtractFile, setOpenExtractFile] = React.useState(false)
  const [openExtractLoading, setOpenExtractLoading] = React.useState(false)
  const [openAnalyzeWebsite, setOpenAnalyzeWebsite] = React.useState(false)
  const [openAnalyzeScanning, setOpenAnalyzeScanning] = React.useState(false)
  const [openAnalyzePreview, setOpenAnalyzePreview] = React.useState(false)
  const [openAddPhotography, setOpenAddPhotography] = React.useState(false)
  const [openAddMoodboard, setOpenAddMoodboard] = React.useState(false)
  const [openAddKnowledge, setOpenAddKnowledge] = React.useState(false)
  const [openAddProduct, setOpenAddProduct] = React.useState(false)
  const [openAddIntegration, setOpenAddIntegration] = React.useState(false)

  // Dialog Form States
  const [websiteUrl, setWebsiteUrl] = React.useState("")
  const [newKnowledgeTitle, setNewKnowledgeTitle] = React.useState("")
  const [newKnowledgeContent, setNewKnowledgeContent] = React.useState("")
  const [newProductName, setNewProductName] = React.useState("")
  const [newProductCat, setNewProductCat] = React.useState("physical")
  const [integrationSearch, setIntegrationSearch] = React.useState("")

  // Available integrations to link
  const availableIntegrations = [
    { handle: "@freshjuice.co", platform: "Instagram", icon: "instagram" },
    { handle: "Fresh Juice Co.", platform: "Facebook Page", icon: "facebook" },
    { handle: "@freshjuice", platform: "TikTok", icon: "tiktok" },
  ]

  // Handlers
  const handleSave = () => {
    setDnaList((prev) =>
      prev.map((item) =>
        item.id === activeDnaId
          ? { ...item, overview: overviewText, guidance: guidanceText }
          : item
      )
    )
    setHasUnsavedChanges(false)
    setSaveSuccessMsg("Changes saved successfully!")
    setTimeout(() => setSaveSuccessMsg(null), 3000)
  }

  const handleCreateNewDna = (name: string, category: string, color: string) => {
    const newId = String(Date.now())
    const newEntry: BusinessDNA = {
      id: newId,
      name,
      category,
      color,
      updatedAt: "Just now",
      overview: `${name} brand overview.`,
      guidance: "Clean and modern design guidelines.",
    }
    setDnaList([newEntry, ...dnaList])
    setActiveDnaId(newId)
    setSaveSuccessMsg(`Created Business DNA: ${name}`)
    setTimeout(() => setSaveSuccessMsg(null), 3000)
  }

  const handleExtractFileSubmit = () => {
    setOpenExtractFile(false)
    setOpenExtractLoading(true)
    setTimeout(() => {
      setOpenExtractLoading(false)
      handleCreateNewDna("Artisan Bakery Co.", "Food & Hospitality", "#F59E0B")
    }, 1500)
  }

  const handleAnalyzeWebsiteSubmit = () => {
    if (!websiteUrl) return
    setOpenAnalyzeWebsite(false)
    setOpenAnalyzeScanning(true)
    setTimeout(() => {
      setOpenAnalyzeScanning(false)
      setOpenAnalyzePreview(true)
    }, 1500)
  }

  const handleConfirmAnalyzePreview = () => {
    setOpenAnalyzePreview(false)
    handleCreateNewDna("Kopi Senja Roastery", "Food & Beverage", "#78350F")
  }

  const handleAddKnowledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKnowledgeTitle.trim() || !newKnowledgeContent.trim()) return
    const newItem: KnowledgeItem = {
      id: "k_" + Date.now(),
      title: newKnowledgeTitle.trim(),
      content: newKnowledgeContent.trim(),
    }
    setKnowledgeList([newItem, ...knowledgeList])
    setNewKnowledgeTitle("")
    setNewKnowledgeContent("")
    setOpenAddKnowledge(false)
    setHasUnsavedChanges(true)
  }

  const handleDeleteKnowledge = (id: string) => {
    setKnowledgeList(knowledgeList.filter((item) => item.id !== id))
    setHasUnsavedChanges(true)
  }

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProductName.trim()) return
    const newProd: ProductItem = {
      id: "p_" + Date.now(),
      name: newProductName.trim(),
      category: newProductCat === "physical" ? "Physical Product" : "Digital Asset",
    }
    setProducts([...products, newProd])
    setNewProductName("")
    setOpenAddProduct(false)
    setHasUnsavedChanges(true)
  }

  const handleLinkAccount = (handle: string, platform: string, icon: "instagram" | "tiktok" | "facebook") => {
    if (connectedAccounts.some((a) => a.handle === handle)) return
    setConnectedAccounts([
      ...connectedAccounts,
      { id: "acc_" + Date.now(), handle, platform, icon, active: true },
    ])
    setOpenAddIntegration(false)
    setHasUnsavedChanges(true)
  }

  const handleDisconnectAccount = (id: string) => {
    setConnectedAccounts(connectedAccounts.filter((a) => a.id !== id))
    setHasUnsavedChanges(true)
  }

  return (
    <div className="w-full min-h-full flex flex-col px-6 pb-8 -mt-10">
      {/* ═══════════ HEADER ROW ═══════════ */}
      <div className="w-full pt-1 pb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-foreground shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Business DNA</h1>
            <p className="text-xs text-muted-foreground">Manage your brand identity, knowledge, and AI grounding presets.</p>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium animate-in fade-in duration-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* ═══════════ BENTO GRID: 2 PANELS (30% / 70%) ═══════════ */}
      <div className="w-full flex-1 flex gap-4 min-h-0">
        {/* ═══ LEFT PANEL: DNA List (30%) ═══ */}
        <div className="w-[30%] min-w-[280px] max-w-[360px] flex flex-col gap-3 h-full overflow-hidden">
          {/* Sticky Top Controls: Search + New DNA */}
          <div className="shrink-0 flex flex-col gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search business DNA..."
                className="pl-9 h-9.5 text-xs bg-background"
              />
            </div>

            <Button
              onClick={() => setOpenNewDna(true)}
              variant="dark"
              size="default"
              className="w-full h-9.5 gap-2 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>New Business DNA</span>
            </Button>
          </div>

          {/* DNA Profile Cards List */}
          <div
            className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-0.5 custom-scrollbar"
            style={{ scrollbarWidth: "thin" }}
          >
            {filteredDnaList.map((dna) => {
              const isSelected = dna.id === activeDnaId
              return (
                <button
                  key={dna.id}
                  type="button"
                  onClick={() => setActiveDnaId(dna.id)}
                  className={`group w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer select-none text-card-foreground ${
                    isSelected
                      ? "border-foreground/80 bg-muted/40 shadow-xs ring-1 ring-foreground/20"
                      : "border-border/80 bg-card hover:bg-muted/30 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar with Color Accent */}
                    <div
                      className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm shadow-2xs"
                      style={{
                        backgroundColor: `${dna.color}18`,
                        color: dna.color,
                        border: `1px solid ${dna.color}35`,
                      }}
                    >
                      {dna.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-semibold text-foreground truncate">
                          {dna.name}
                        </h4>
                        <span className="text-[10.5px] text-muted-foreground shrink-0 font-normal">
                          {dna.updatedAt}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge variant="neutral" className="text-[10px] px-1.5 py-0 font-normal">
                          {dna.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}

            {filteredDnaList.length === 0 && (
              <div className="p-6 text-center text-xs text-muted-foreground border border-dashed border-border rounded-2xl">
                No profiles found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* ═══ RIGHT PANEL: DNA Detail & Studio (70%) ═══ */}
        <div className="flex-1 flex flex-col rounded-3xl border border-border/80 bg-card shadow-xs overflow-hidden min-h-0">
          {/* Panel Header */}
          <div className="px-6 pt-5 pb-4 flex items-center justify-between shrink-0 border-b border-border/40 bg-card">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: `${activeDna.color}20`,
                  color: activeDna.color,
                }}
              >
                {activeDna.name.charAt(0)}
              </div>
              <h2 className="text-base font-bold text-foreground">{activeDna.name}</h2>
              <Badge variant="success" className="text-[10.5px] ml-1">
                Active Profile
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                variant="dark"
                size="sm"
                className="h-8 gap-1.5 text-xs rounded-xl"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon-sm" className="rounded-xl">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => {
                      const newName = prompt("Rename Business DNA:", activeDna.name)
                      if (newName && newName.trim()) {
                        setDnaList((prev) =>
                          prev.map((d) =>
                            d.id === activeDnaId ? { ...d, name: newName.trim() } : d
                          )
                        )
                      }
                    }}
                  >
                    <Pencil className="w-3.5 h-3.5 mr-2" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleCreateNewDna(
                        `${activeDna.name} (Copy)`,
                        activeDna.category,
                        activeDna.color
                      )
                    }}
                  >
                    <Layers className="w-3.5 h-3.5 mr-2" />
                    <span>Duplicate</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => {
                      if (dnaList.length <= 1) {
                        triggerAlert({
                          variant: "warning",
                          title: "Warning",
                          message: "You must keep at least one Business DNA profile.",
                        })
                        return
                      }
                      if (confirm(`Delete Business DNA "${activeDna.name}"?`)) {
                        const remaining = dnaList.filter((d) => d.id !== activeDnaId)
                        setDnaList(remaining)
                        setActiveDnaId(remaining[0].id)
                      }
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* shadcn Alert Banner */}
          {bannerAlert && (
            <div className="px-6 pt-3 shrink-0">
              <Alert variant={bannerAlert.variant || "default"}>
                {bannerAlert.variant === "destructive" ? (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                ) : bannerAlert.variant === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                ) : (
                  <Info className="w-4 h-4 text-blue-600" />
                )}
                <div className="flex items-start justify-between w-full">
                  <div>
                    {bannerAlert.title && <AlertTitle>{bannerAlert.title}</AlertTitle>}
                    <AlertDescription>{bannerAlert.message}</AlertDescription>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBannerAlert(null)}
                    className="text-muted-foreground hover:text-foreground p-1 -mr-1 -mt-1 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Alert>
            </div>
          )}

          {/* shadcn Tabs Container */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            {/* Tabs List */}
            <div className="shrink-0 px-6 pt-3 pb-0 border-b border-border/60 bg-muted/20">
              <TabsList className="bg-transparent border-0 p-0 h-auto gap-2">
                <TabsTrigger
                  value="identity"
                  className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold"
                >
                  Identity
                </TabsTrigger>
                <TabsTrigger
                  value="product-references"
                  className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold"
                >
                  Product References
                </TabsTrigger>
                <TabsTrigger
                  value="knowledge"
                  className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold"
                >
                  Knowledge
                </TabsTrigger>
                <TabsTrigger
                  value="integration"
                  className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold"
                >
                  Integration
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-5">
              <div className="max-w-3xl space-y-6">
                {/* ═══════════ TAB 1: IDENTITY ═══════════ */}
                <TabsContent value="identity" className="space-y-6 mt-0">
                  {/* Brand Kit Quick Upload Banner */}
                  <Card className="border-border/80 bg-muted/20">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 shadow-2xs">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-foreground">
                            Build your Business DNA with one upload
                          </h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Auto-fill logos, colors, fonts, and more.{" "}
                            <a href="/studio" className="text-primary hover:underline font-medium">
                              Or generate in Studio
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setOpenExtractFile(true)}
                          className="text-xs h-8 rounded-xl gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Extract from file</span>
                        </Button>
                        <Button
                          type="button"
                          variant="dark"
                          size="sm"
                          onClick={() => setOpenAnalyzeWebsite(true)}
                          className="text-xs h-8 rounded-xl gap-1.5"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Analyze Website</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Logo Section */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold text-foreground">Logo</label>
                    <div className="grid grid-cols-4 gap-3">
                      <label className="aspect-square rounded-2xl border-2 border-dashed border-border/80 hover:border-foreground/40 bg-muted/20 hover:bg-muted/40 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer group">
                        <Plus className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                          Upload
                        </span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                      <div className="aspect-square rounded-2xl bg-muted/30 border border-border/80 flex items-center justify-center p-3 relative group">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                          style={{
                            backgroundColor: `${activeDna.color}20`,
                            color: activeDna.color,
                          }}
                        >
                          {activeDna.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">SVG, PNG, or JPG. Max 2MB.</p>
                  </div>

                  {/* Business Overview */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-foreground">
                      Business Overview
                    </label>
                    <Textarea
                      rows={3}
                      value={overviewText}
                      onChange={(e) => {
                        setOverviewText(e.target.value)
                        setHasUnsavedChanges(true)
                      }}
                      className="text-xs resize-none"
                      placeholder="Describe what your business does, key products, and target market..."
                    />
                  </div>

                  {/* Design Guidance */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-foreground">
                      Design Guidance
                    </label>
                    <Textarea
                      rows={3}
                      value={guidanceText}
                      onChange={(e) => {
                        setGuidanceText(e.target.value)
                        setHasUnsavedChanges(true)
                      }}
                      className="text-xs resize-none"
                      placeholder="Describe your brand's visual identity, layout style, and tone rules..."
                    />
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-foreground">Color Palette</label>
                      <span className="text-[11px] text-muted-foreground">5 theme tokens</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          triggerAlert({
                            variant: "info",
                            title: "Color Palette",
                            message: "Color picker integration coming soon.",
                          })
                        }
                        className="w-16 h-16 rounded-2xl border-2 border-dashed border-border/80 hover:border-foreground/40 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-[10px] mt-0.5">Add</span>
                      </button>

                      {[
                        { name: "Primary", hex: activeDna.color },
                        { name: "Secondary", hex: "#10B981" },
                        { name: "Neutral", hex: "#6B7280" },
                        { name: "Dark", hex: "#111827" },
                        { name: "Light", hex: "#F9FAFB" },
                      ].map((c) => (
                        <div key={c.name} className="flex flex-col items-center gap-1.5">
                          <div
                            className="w-16 h-16 rounded-2xl border border-border shadow-2xs transition-transform hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-[10px] font-mono text-muted-foreground font-medium">
                            {c.hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fonts */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold text-foreground">Fonts</label>
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          triggerAlert({
                            variant: "info",
                            title: "Typography",
                            message: "Custom font upload integration coming soon.",
                          })
                        }
                        className="w-16 h-16 rounded-2xl border-2 border-dashed border-border/80 hover:border-foreground/40 flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-[10px] mt-0.5">Add</span>
                      </button>

                      {[
                        { name: "Inter", role: "Primary Font", preview: "Aa" },
                        { name: "Playfair", role: "Accent Serif", preview: "Aa" },
                      ].map((f) => (
                        <div key={f.name} className="flex flex-col items-center gap-1">
                          <div className="w-16 h-16 rounded-2xl bg-muted/40 border border-border flex items-center justify-center text-foreground font-bold text-base shadow-2xs">
                            {f.preview}
                          </div>
                          <span className="text-[11px] font-medium text-foreground">{f.name}</span>
                          <span className="text-[9.5px] text-muted-foreground">{f.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Photography Reference */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-foreground">Photography</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setOpenAddPhotography(true)}
                        className="h-7 text-[11px] rounded-lg gap-1"
                      >
                        <Camera className="w-3 h-3" />
                        <span>Add Photos</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div
                        onClick={() => setOpenAddPhotography(true)}
                        className="aspect-square rounded-2xl border-2 border-dashed border-border/80 hover:border-foreground/40 bg-muted/20 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="text-[10px]">Add photo</span>
                      </div>
                      {[1, 2].map((n) => (
                        <div
                          key={n}
                          className="aspect-square rounded-2xl bg-muted/30 border border-border flex items-center justify-center relative group overflow-hidden"
                        >
                          <Camera className="w-6 h-6 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[11px] text-white font-medium">Preview</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Moodboard */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-foreground">Moodboard</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setOpenAddMoodboard(true)}
                        className="h-7 text-[11px] rounded-lg gap-1"
                      >
                        <Layers className="w-3 h-3" />
                        <span>Add Moodboard</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div
                        onClick={() => setOpenAddMoodboard(true)}
                        className="aspect-square rounded-2xl border-2 border-dashed border-border/80 hover:border-foreground/40 bg-muted/20 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="text-[10px]">Add asset</span>
                      </div>
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="aspect-square rounded-2xl bg-muted/30 border border-border flex items-center justify-center relative group overflow-hidden"
                        >
                          <Layers className="w-6 h-6 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[11px] text-white font-medium">View</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* ═══════════ TAB 2: PRODUCT REFERENCES ═══════════ */}
                <TabsContent value="product-references" className="space-y-6 mt-0">
                  <Card className="border-border/80 bg-muted/20">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 shadow-2xs">
                          <Package className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-foreground">
                            Product References
                          </h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Manage product assets for grounded AI generation and social carousels.
                          </p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="dark"
                        size="sm"
                        onClick={() => setOpenAddProduct(true)}
                        className="text-xs h-8 rounded-xl gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Product</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-3 gap-3">
                    {products.map((prod) => (
                      <Card
                        key={prod.id}
                        className="border-border/80 hover:border-foreground/30 transition-all p-4 flex flex-col justify-between group cursor-pointer"
                      >
                        <div className="aspect-video rounded-xl bg-muted/40 border border-border flex items-center justify-center mb-3 group-hover:bg-muted/60 transition-colors">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-foreground truncate">
                            {prod.name}
                          </h4>
                          <Badge variant="neutral" className="text-[10px] mt-1 font-normal">
                            {prod.category}
                          </Badge>
                        </div>
                      </Card>
                    ))}

                    <div
                      onClick={() => setOpenAddProduct(true)}
                      className="border-2 border-dashed border-border/80 hover:border-foreground/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-muted/20 hover:bg-muted/40 transition-all min-h-[140px]"
                    >
                      <Plus className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Add new product</span>
                    </div>
                  </div>
                </TabsContent>

                {/* ═══════════ TAB 3: KNOWLEDGE BASE ═══════════ */}
                <TabsContent value="knowledge" className="space-y-4 mt-0">
                  <Card className="border-border/80 bg-muted/20">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 shadow-2xs">
                          <Brain className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-foreground">Knowledge Base</h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Facts and business ground truth fed into the AI copywriter.
                          </p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="dark"
                        size="sm"
                        onClick={() => setOpenAddKnowledge(true)}
                        className="text-xs h-8 rounded-xl gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Knowledge</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-2.5">
                    {knowledgeList.map((item) => (
                      <Card
                        key={item.id}
                        className="border-border/80 hover:border-border transition-all p-4 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                              onClick={() => {
                                const newCont = prompt(`Edit "${item.title}":`, item.content)
                                if (newCont !== null) {
                                  setKnowledgeList((prev) =>
                                    prev.map((k) => (k.id === item.id ? { ...k, content: newCont } : k))
                                  )
                                  setHasUnsavedChanges(true)
                                }
                              }}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteKnowledge(item.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* ═══════════ TAB 4: INTEGRATION ═══════════ */}
                <TabsContent value="integration" className="space-y-4 mt-0">
                  <Card className="border-border/80 bg-muted/20">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 shadow-2xs">
                          <Share2 className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-foreground">
                            Connected Social Channels
                          </h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Publish and sync content directly with linked social accounts.
                          </p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="dark"
                        size="sm"
                        onClick={() => setOpenAddIntegration(true)}
                        className="text-xs h-8 rounded-xl gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Account</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-2.5">
                    {connectedAccounts.map((acc) => (
                      <Card
                        key={acc.id}
                        className="border-border/80 p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white border border-[#eaecf0] shadow-2xs">
                            <SocialIcon icon={acc.icon} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-foreground truncate">
                              {acc.handle}
                            </p>
                            <p className="text-[11px] text-muted-foreground">{acc.platform}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <Badge variant="success" className="text-[10px] py-0.5">
                            Active
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDisconnectAccount(acc.id)}
                            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Disconnect account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </Card>
                    ))}

                    <div className="flex items-center gap-2 p-3.5 rounded-2xl border border-dashed border-border bg-muted/20 text-xs text-muted-foreground">
                      <Info className="w-4 h-4 shrink-0 text-muted-foreground" />
                      <span>
                        Manage API tokens and platform permissions from the{" "}
                        <a href="/integrations" className="text-primary font-medium hover:underline">
                          Integrations Hub
                        </a>
                        .
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ═══════════ MODALS & DIALOGS (SHADCN / RADIX) ═══════════ */}
      {/* ═══════════════════════════════════════════════════════════ */}

      {/* 1. New Business DNA Dialog */}
      <Dialog open={openNewDna} onOpenChange={setOpenNewDna}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-2 shadow-2xs">
              <Sparkles className="w-5 h-5 text-foreground" />
            </div>
            <DialogTitle>New Business DNA</DialogTitle>
            <DialogDescription>
              Choose how you want to build your new brand profile.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2.5 my-2">
            <button
              type="button"
              onClick={() => {
                setOpenNewDna(false)
                setOpenExtractFile(true)
              }}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-border/80 hover:border-foreground/30 hover:bg-muted/30 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-muted/40 border border-border flex items-center justify-center shrink-0 group-hover:bg-background transition-colors">
                <Upload className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground">Extract from file</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Upload brand kit, guidelines PDF, or company deck
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpenNewDna(false)
                setOpenAnalyzeWebsite(true)
              }}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-border/80 hover:border-foreground/30 hover:bg-muted/30 transition-all text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-muted/40 border border-border flex items-center justify-center shrink-0 group-hover:bg-background transition-colors">
                <Globe className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground">Analyze Website</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  AI extracts branding, colors, and tone from your URL
                </p>
              </div>
            </button>
          </div>

          <div className="p-3 rounded-xl border border-dashed border-border bg-muted/20 flex items-start gap-2.5 text-xs text-muted-foreground">
            <Info className="w-4 h-4 shrink-0 text-muted-foreground mt-0.5" />
            <span>
              Don't have files ready?{" "}
              <a href="/studio" className="text-primary font-semibold hover:underline">
                Generate from scratch in Studio
              </a>{" "}
              using conversational AI prompts.
            </span>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Extract from File Dialog */}
      <Dialog open={openExtractFile} onOpenChange={setOpenExtractFile}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-2 shadow-2xs">
              <Upload className="w-5 h-5 text-foreground" />
            </div>
            <DialogTitle>Extract from File</DialogTitle>
            <DialogDescription>
              AI will automatically parse brand guidelines, colors, and typography from your document.
            </DialogDescription>
          </DialogHeader>

          <label className="block w-full cursor-pointer my-2">
            <div className="w-full border-2 border-dashed border-border/80 hover:border-foreground/40 rounded-2xl p-8 flex flex-col items-center justify-center gap-2.5 bg-muted/20 hover:bg-muted/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center shadow-2xs">
                <FileText className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-foreground">Drop PDF here or click to browse</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">PDF or presentation up to 15MB</p>
              </div>
            </div>
            <input type="file" accept=".pdf" className="hidden" />
          </label>

          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenExtractFile(false)}>
              Cancel
            </Button>
            <Button variant="dark" size="sm" onClick={handleExtractFileSubmit}>
              Extract Brand DNA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. Extract Loading Spinner Dialog */}
      <Dialog open={openExtractLoading} onOpenChange={setOpenExtractLoading}>
        <DialogContent className="max-w-xs text-center p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <h3 className="text-sm font-bold text-foreground">Extracting Brand DNA...</h3>
            <p className="text-xs text-muted-foreground">
              Parsing vector logos, dominant colors, and typography tokens.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 4. Analyze Website Dialog */}
      <Dialog open={openAnalyzeWebsite} onOpenChange={setOpenAnalyzeWebsite}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-2 shadow-2xs">
              <Globe className="w-5 h-5 text-foreground" />
            </div>
            <DialogTitle>Analyze Website</DialogTitle>
            <DialogDescription>
              Enter your live website URL to scan colors, fonts, and copywriting style.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-2">
            <label className="block text-xs font-bold text-foreground">Website URL</label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                className="pl-9 h-9.5 text-xs"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Ensure the URL is publicly reachable. Our crawler will inspect metadata, CSS variables, and layout aesthetics.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenAnalyzeWebsite(false)}>
              Cancel
            </Button>
            <Button variant="dark" size="sm" onClick={handleAnalyzeWebsiteSubmit}>
              Analyze URL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 5. Scanning Progress Dialog */}
      <Dialog open={openAnalyzeScanning} onOpenChange={setOpenAnalyzeScanning}>
        <DialogContent className="max-w-xs text-center p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <h3 className="text-sm font-bold text-foreground">Scanning Website...</h3>
            <p className="text-xs text-muted-foreground">
              Extracting CSS styles, fonts, and color palettes from {websiteUrl || "target"}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 6. Brand Preview Confirmation Dialog */}
      <Dialog open={openAnalyzePreview} onOpenChange={setOpenAnalyzePreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Website Analysis Results</DialogTitle>
            <DialogDescription>
              We successfully extracted brand parameters from your website.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Extracted Palette
              </span>
              <div className="flex gap-2">
                {["#78350F", "#D97706", "#FDE68A", "#1C1917", "#FAFAF9"].map((hex) => (
                  <div
                    key={hex}
                    className="w-10 h-10 rounded-xl border border-border shadow-2xs"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1 text-xs">
              <p className="font-semibold text-foreground">Detected Brand Name:</p>
              <p className="text-muted-foreground">Kopi Senja Roastery (Food & Beverage)</p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenAnalyzePreview(false)}>
              Discard
            </Button>
            <Button variant="dark" size="sm" onClick={handleConfirmAnalyzePreview}>
              Apply to Business DNA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 7. Add Photography Dialog */}
      <Dialog open={openAddPhotography} onOpenChange={setOpenAddPhotography}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Photography Reference</DialogTitle>
            <DialogDescription>
              Upload lifestyle or product photos to establish photographic aesthetic for generation.
            </DialogDescription>
          </DialogHeader>

          <label className="block w-full cursor-pointer my-2">
            <div className="w-full border-2 border-dashed border-border/80 hover:border-foreground/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-muted/20 hover:bg-muted/40 transition-all">
              <Camera className="w-6 h-6 text-muted-foreground" />
              <p className="text-xs font-semibold text-foreground">Upload photo references</p>
              <p className="text-[11px] text-muted-foreground">PNG, JPG, or WEBP up to 10MB</p>
            </div>
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>

          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenAddPhotography(false)}>
              Cancel
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => {
                setOpenAddPhotography(false)
                setHasUnsavedChanges(true)
              }}
            >
              Add Photos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 8. Add Moodboard Dialog */}
      <Dialog open={openAddMoodboard} onOpenChange={setOpenAddMoodboard}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Moodboard</DialogTitle>
            <DialogDescription>
              Upload visual references, competitor ads, or texture inspirations.
            </DialogDescription>
          </DialogHeader>

          <label className="block w-full cursor-pointer my-2">
            <div className="w-full border-2 border-dashed border-border/80 hover:border-foreground/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-muted/20 hover:bg-muted/40 transition-all">
              <Layers className="w-6 h-6 text-muted-foreground" />
              <p className="text-xs font-semibold text-foreground">Upload moodboard imagery</p>
              <p className="text-[11px] text-muted-foreground">PNG, JPG, or SVG up to 10MB</p>
            </div>
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>

          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenAddMoodboard(false)}>
              Cancel
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => {
                setOpenAddMoodboard(false)
                setHasUnsavedChanges(true)
              }}
            >
              Save to Moodboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 9. Add Knowledge Dialog */}
      <Dialog open={openAddKnowledge} onOpenChange={setOpenAddKnowledge}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleAddKnowledgeSubmit}>
            <DialogHeader>
              <div className="w-10 h-10 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-2 shadow-2xs">
                <Brain className="w-5 h-5 text-foreground" />
              </div>
              <DialogTitle>Add Knowledge Item</DialogTitle>
              <DialogDescription>
                Provide concise ground truth facts about your brand, services, or product offerings.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 my-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">Fact Title</label>
                <Input
                  required
                  value={newKnowledgeTitle}
                  onChange={(e) => setNewKnowledgeTitle(e.target.value)}
                  placeholder="e.g. Return Policy, Sourcing Standards"
                  className="h-9.5 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">Details / Content</label>
                <Textarea
                  required
                  rows={3}
                  value={newKnowledgeContent}
                  onChange={(e) => setNewKnowledgeContent(e.target.value)}
                  placeholder="e.g. 100% money back guarantee within 14 days of delivery..."
                  className="text-xs resize-none"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpenAddKnowledge(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="dark" size="sm">
                Save Fact
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 10. Add Product Dialog */}
      <Dialog open={openAddProduct} onOpenChange={setOpenAddProduct}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleAddProductSubmit}>
            <DialogHeader>
              <div className="w-10 h-10 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-2 shadow-2xs">
                <Package className="w-5 h-5 text-foreground" />
              </div>
              <DialogTitle>Add Product Reference</DialogTitle>
              <DialogDescription>
                Register product dimensions and photo assets for realistic 3D placement and ad generation.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 my-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">Product Name</label>
                <Input
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Organic Cold Pressed Juice 500ml"
                  className="h-9.5 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">Product Type</label>
                <select
                  value={newProductCat}
                  onChange={(e) => setNewProductCat(e.target.value)}
                  className="w-full h-9.5 rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="physical">Physical Product (Bottles, Apparel, Box)</option>
                  <option value="digital">Digital Asset / Service / Software</option>
                </select>
              </div>

              {newProductCat === "physical" && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">Width (cm)</label>
                    <Input type="number" defaultValue={7} className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">Height (cm)</label>
                    <Input type="number" defaultValue={22} className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">Weight (g)</label>
                    <Input type="number" defaultValue={520} className="h-8 text-xs" />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpenAddProduct(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="dark" size="sm">
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 11. Add Social Integration Dialog */}
      <Dialog open={openAddIntegration} onOpenChange={setOpenAddIntegration}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-10 h-10 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-2 shadow-2xs">
              <Share2 className="w-5 h-5 text-foreground" />
            </div>
            <DialogTitle>Link Social Account</DialogTitle>
            <DialogDescription>
              Connect an account from your Integrations Hub to this Business DNA profile.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={integrationSearch}
                onChange={(e) => setIntegrationSearch(e.target.value)}
                placeholder="Search connected accounts..."
                className="pl-9 h-9.5 text-xs"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {availableIntegrations
                .filter(
                  (acc) =>
                    !connectedAccounts.some((c) => c.handle === acc.handle) &&
                    acc.handle.toLowerCase().includes(integrationSearch.toLowerCase())
                )
                .map((acc) => (
                  <div
                    key={acc.handle}
                    onClick={() =>
                      handleLinkAccount(
                        acc.handle,
                        acc.platform,
                        acc.icon as "instagram" | "tiktok" | "facebook"
                      )
                    }
                    className="flex items-center justify-between p-3 rounded-2xl border border-border hover:border-foreground/40 hover:bg-muted/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#eaecf0] shadow-2xs flex items-center justify-center">
                        <SocialIcon icon={acc.icon as "instagram" | "tiktok" | "facebook"} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{acc.handle}</p>
                        <p className="text-[11px] text-muted-foreground">{acc.platform}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                      Link
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOpenAddIntegration(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
