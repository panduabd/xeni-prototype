import sys

filepath = '/Users/mba/Documents/Code/xeni-prototype/src/pages/content-automation.astro'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace modal wrapper
old1 = '''  <!-- ═══════════════════════════════════════ -->
  <!-- SLIDE-OVER: PREVIEW GENERATED CONTENT -->
  <!-- ═══════════════════════════════════════ -->
  <div id="modal-preview" class="hidden fixed inset-0 z-100">
    <!-- Backdrop -->
    <div
      id="preview-backdrop"
      class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-0"
    >
    </div>

    <!-- Panel -->
    <div
      id="preview-panel"
      class="absolute top-0 right-0 h-full w-full sm:max-w-105 lg:max-w-115 bg-white shadow-2xl flex flex-col overflow-hidden transform translate-x-full transition-transform duration-300 ease-out"
    >'''
new1 = '''  <!-- ═══════════════════════════════════════ -->
  <!-- MODAL: PREVIEW GENERATED CONTENT (2-col) -->
  <!-- ═══════════════════════════════════════ -->
  <div
    id="modal-preview"
    class="hidden fixed inset-0 z-100 items-center justify-center bg-black/40 backdrop-blur-sm p-4"
  >
    <div
      id="preview-panel"
      class="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
    >'''
content = content.replace(old1, new1)

# 2. Replace header + start two-column layout
old2 = '''      <!-- Header -->
      <div
        class="flex items-center justify-between px-5 py-3 border-b border-[#eaecf0] shrink-0"
      >
        <div class="flex items-center gap-2">
          <button
            id="preview-prev"
            class="w-8 h-8 rounded-lg border border-[#eaecf0] bg-white flex items-center justify-center text-[#667085] hover:bg-[#F9FAFB] transition-all cursor-pointer"
          >
            <i class="ti ti-chevron-left text-[14px]"></i>
          </button>
          <button
            id="preview-next"
            class="w-8 h-8 rounded-lg border border-[#eaecf0] bg-white flex items-center justify-center text-[#667085] hover:bg-[#F9FAFB] transition-all cursor-pointer"
          >
            <i class="ti ti-chevron-right text-[14px]"></i>
          </button>
        </div>
        <button
          id="close-preview-modal"
          class="w-8 h-8 rounded-lg border border-[#eaecf0] bg-white flex items-center justify-center hover:bg-[#F9FAFB] transition-colors text-[#667085] cursor-pointer"
        >
          <i class="ti ti-x text-[16px]"></i>
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto">'''
new2 = '''      <!-- Header -->
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-[#eaecf0] shrink-0"
      >
        <div class="flex items-center gap-3">
          <h3
            id="preview-title-header"
            class="text-[18px] font-bold text-[#111827]"
          >
          </h3>
          <span
            id="preview-status-badge"
            class="inline-flex items-center px-2.5 h-6 rounded-full text-[11px] font-bold"
          ></span>
        </div>
        <button
          id="close-preview-modal"
          class="w-8 h-8 rounded-lg border border-[#eaecf0] bg-white flex items-center justify-center hover:bg-[#F9FAFB] transition-colors text-[#667085] cursor-pointer"
        >
          <i class="ti ti-x text-[16px]"></i>
        </button>
      </div>

      <!-- Two-column body -->
      <div class="flex flex-1 overflow-hidden">
        <!-- LEFT: Image + Caption -->
        <div class="flex-1 flex flex-col overflow-y-auto border-r border-[#eaecf0]">
          <!-- Image Area -->
          <div class="p-6">
            <div
              class="relative rounded-2xl overflow-hidden bg-[#F3F4F6] aspect-4/3 max-h-80"
            >
              <div
                id="preview-image-container"
                class="w-full h-full flex items-center justify-center"
              >
                <!-- Image or placeholder injected via JS -->
              </div>
              <!-- Image Counter Badge -->
              <div
                id="preview-image-counter"
                class="absolute top-3 right-3 px-2.5 h-6 rounded-full bg-black/50 text-white text-[11px] font-medium items-center justify-center hidden"
              >
                1/1
              </div>
              <!-- Carousel Nav Arrows (only for carousel) -->
              <button
                id="carousel-prev"
                class="hidden absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center text-[#667085] hover:bg-white transition-all cursor-pointer shadow-sm"
              >
                <i class="ti ti-chevron-left text-[14px]"></i>
              </button>
              <button
                id="carousel-next"
                class="hidden absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center text-[#667085] hover:bg-white transition-all cursor-pointer shadow-sm"
              >
                <i class="ti ti-chevron-right text-[14px]"></i>
              </button>
            </div>
          </div>

          <!-- Caption -->
          <div class="px-6 pb-6 space-y-4">
            <!-- Meta Row -->
            <div
              class="flex items-center gap-2 text-[12px] text-[#667085]"
            >
              <i
                id="preview-platform-icon-header"
                class="ti text-[14px] text-[#E1306C]"></i>
              <span
                id="preview-platform-header"
                class="font-medium text-[#111827]"
              ></span>
              <span class="text-[#98a2b3]">·</span>
              <span id="preview-brand-header"></span>
              <span class="text-[#98a2b3]">·</span>
              <span id="preview-date-header"></span>
            </div>

            <div class="space-y-2">
              <h4 class="text-[13px] font-bold text-[#111827]">Caption</h4>
              <div
                id="preview-caption"
                class="text-[13px] text-[#667085] leading-relaxed whitespace-pre-line"
              >
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Actions + Details -->
        <div class="w-96 flex flex-col overflow-y-auto bg-[#FAFBFC]">'''
content = content.replace(old2, new2)

# 3. Close the two extra divs at the end
old3 = '''      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════ -->
  <!-- MODAL: SCHEDULE PUBLISH -->'''
new3 = '''        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════ -->
  <!-- MODAL: SCHEDULE PUBLISH -->'''
content = content.replace(old3, new3)

# 4. Fix closePreviewModal
old4 = '''  function closePreviewModal() {
    els.previewBackdrop.classList.add("opacity-0");
    els.previewPanel.classList.add("translate-x-full");
    setTimeout(() => {
      els.modalPreview.classList.add("hidden");
      els.modalPreview.classList.remove("flex");
      previewingContentId = null;
    }, 300);
  }'''
new4 = '''  function closePreviewModal() {
    els.previewBackdrop.classList.add("opacity-0");
    setTimeout(() => {
      els.modalPreview.classList.add("hidden");
      els.modalPreview.classList.remove("flex");
      previewingContentId = null;
    }, 300);
  }'''
content = content.replace(old4, new4)

# 5. Fix body content in openPreviewModal
old5 = '''    // Body content
    els.previewTitle.textContent = item.title;
    els.previewBrand.textContent = item.brand;
    els.previewCaption.textContent = item.caption;'''
new5 = '''    // Body content
    els.previewCaption.textContent = item.caption;
    const captionRight = document.getElementById("preview-caption-right");
    if (captionRight) captionRight.textContent = item.caption;'''
content = content.replace(old5, new5)

# 6. Fix open animation
old6 = '''    // Open slide-over
    els.modalPreview.classList.remove("hidden");
    els.modalPreview.classList.add("flex");
    requestAnimationFrame(() => {
      els.previewBackdrop.classList.remove("opacity-0");
      els.previewPanel.classList.remove("translate-x-full");
    });'''
new6 = '''    // Open modal
    els.modalPreview.classList.remove("hidden");
    els.modalPreview.classList.add("flex");
    requestAnimationFrame(() => {
      els.previewBackdrop.classList.remove("opacity-0");
    });'''
content = content.replace(old6, new6)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
