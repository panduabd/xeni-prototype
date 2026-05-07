import sys

filepath = '/Users/mba/Documents/Code/xeni-prototype/src/pages/content-automation.astro'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start and end of the modal block
start_marker = '''  <!-- ═══════════════════════════════════════ -->
  <!-- MODAL: PREVIEW GENERATED CONTENT (2-col) -->
  <!-- ═══════════════════════════════════════ -->'''

end_marker = '''  <!-- ═══════════════════════════════════════ -->
  <!-- MODAL: SCHEDULE PUBLISH -->'''

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f"ERROR: Could not find markers. start={start_idx}, end={end_idx}")
    sys.exit(1)

old_block = content[start_idx:end_idx]

new_block = '''  <!-- ═══════════════════════════════════════ -->
  <!-- MODAL: PREVIEW GENERATED CONTENT (2-col) -->
  <!-- ═══════════════════════════════════════ -->
  <div
    id="modal-preview"
    class="hidden fixed inset-0 z-100 items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
  >
    <div
      id="preview-panel"
      class="bg-white w-full max-w-5xl max-h-[90vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative"
    >
      <!-- Floating Close Button -->
      <button
        id="close-preview-modal"
        class="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-[#667085] z-30 cursor-pointer"
      >
        <i class="ti ti-x text-[20px]"></i>
      </button>

      <!-- Header (No Border) -->
      <div class="px-7 pt-7 pb-3 shrink-0">
        <div class="flex items-center gap-3">
          <h3
            id="preview-title-header"
            class="text-[20px] font-bold text-[#111827] tracking-tight"
          >
          </h3>
          <span
            id="preview-status-badge"
            class="inline-flex items-center px-2.5 h-6 rounded-full text-[11px] font-bold"
          ></span>
        </div>
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
              <!-- Carousel Nav Arrows -->
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
            <div class="flex items-center gap-2 text-[12px] text-[#667085]">
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
        <div class="w-96 flex flex-col overflow-y-auto bg-[#FAFBFC]">
          <!-- Tabs -->
          <div class="px-5 border-b border-[#eaecf0]">
            <div class="flex items-center gap-1">
              <button
                class="preview-tab-btn px-3 py-2.5 text-[13px] font-semibold text-[#2563EB] border-b-2 border-[#2563EB] transition-colors cursor-pointer"
                data-tab="preview"
                >Preview</button
              >
              <button
                class="preview-tab-btn px-3 py-2.5 text-[13px] font-medium text-[#667085] hover:text-[#111827] transition-colors cursor-pointer"
                data-tab="content"
                >Content</button
              >
              <button
                class="preview-tab-btn px-3 py-2.5 text-[13px] font-medium text-[#667085] hover:text-[#111827] transition-colors cursor-pointer"
                data-tab="performance"
                >Performance</button
              >
              <button
                class="preview-tab-btn px-3 py-2.5 text-[13px] font-medium text-[#667085] hover:text-[#111827] transition-colors cursor-pointer"
                data-tab="automation"
                >Automation</button
              >
            </div>
          </div>

          <!-- Tab Content: Preview (Compact) -->
          <div
            id="tab-panel-preview"
            class="preview-tab-panel px-5 py-4 space-y-4"
          >
            <div class="space-y-3">
              <h4 class="text-[13px] font-bold text-[#111827]">Post Preview</h4>

              <!-- Thumbnail + Image Info Row -->
              <div
                class="flex items-center justify-between py-2 border-t border-[#eaecf0]"
              >
                <div class="flex items-center gap-2">
                  <span class="text-[12px] font-medium text-[#344054]"
                    >Image</span
                  >
                  <span
                    id="preview-image-dims"
                    class="text-[12px] text-[#667085]"
                    >1080 × 1080</span
                  >
                </div>
                <div
                  id="preview-thumb"
                  class="w-10 h-10 rounded-lg bg-[#F3F4F6] border border-[#eaecf0] flex items-center justify-center overflow-hidden"
                >
                  <!-- Thumbnail injected via JS -->
                </div>
              </div>

              <!-- Engagement Row -->
              <div
                class="flex items-center justify-between py-2 border-t border-[#eaecf0]"
              >
                <span class="text-[12px] font-medium text-[#344054]"
                  >Engagement</span
                >
                <div class="flex items-center gap-4">
                  <div
                    class="flex items-center gap-1 text-[12px] text-[#667085]"
                  >
                    <i class="ti ti-eye text-[14px]"></i>
                    <span id="preview-views">0</span>
                  </div>
                  <div
                    class="flex items-center gap-1 text-[12px] text-[#667085]"
                  >
                    <i class="ti ti-heart text-[14px]"></i>
                    <span id="preview-likes">0</span>
                  </div>
                  <div
                    class="flex items-center gap-1 text-[12px] text-[#667085]"
                  >
                    <i class="ti ti-message text-[14px]"></i>
                    <span id="preview-comments">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Content: Content -->
          <div
            id="tab-panel-content"
            class="preview-tab-panel hidden px-5 py-4 space-y-4"
          >
            <div class="space-y-1.5">
              <label
                class="text-[12px] font-semibold text-[#344054] uppercase tracking-wider"
                >Content Type</label
              >
              <div class="flex items-center gap-2">
                <i
                  id="preview-type-icon"
                  class="ti text-[16px] text-[#667085]"
                ></i>
                <span
                  id="preview-type"
                  class="text-[13px] text-[#667085]"
                ></span>
              </div>
            </div>
            <div class="space-y-1.5">
              <label
                class="text-[12px] font-semibold text-[#344054] uppercase tracking-wider"
                >Platform</label
              >
              <div class="flex items-center gap-2">
                <i
                  id="preview-platform-icon"
                  class="ti text-[16px] text-[#667085]"
                ></i>
                <span
                  id="preview-platform"
                  class="text-[13px] text-[#667085]"
                ></span>
              </div>
            </div>
            <div class="space-y-1.5">
              <label
                class="text-[12px] font-semibold text-[#344054] uppercase tracking-wider"
                >Automation</label
              >
              <p
                id="preview-automation"
                class="text-[13px] text-[#667085]"
              ></p>
            </div>
          </div>

          <!-- Tab Content: Performance -->
          <div
            id="tab-panel-performance"
            class="preview-tab-panel hidden px-5 py-4 space-y-4"
          >
            <div id="preview-stats-section" class="space-y-3">
              <div class="grid grid-cols-3 gap-3">
                <div
                  class="p-4 rounded-xl bg-[#F9FAFB] border border-[#eaecf0] text-center"
                >
                  <div class="flex items-center justify-center gap-1 mb-1">
                    <i class="ti ti-eye text-[16px] text-[#667085]"></i>
                  </div>
                  <div
                    id="preview-views-big"
                    class="text-[18px] font-bold text-[#111827]"
                  >
                    0
                  </div>
                  <div class="text-[11px] text-[#667085]">Views</div>
                </div>
                <div
                  class="p-4 rounded-xl bg-[#F9FAFB] border border-[#eaecf0] text-center"
                >
                  <div class="flex items-center justify-center gap-1 mb-1">
                    <i class="ti ti-heart text-[16px] text-[#667085]"></i>
                  </div>
                  <div
                    id="preview-likes-big"
                    class="text-[18px] font-bold text-[#111827]"
                  >
                    0
                  </div>
                  <div class="text-[11px] text-[#667085]">Likes</div>
                </div>
                <div
                  class="p-4 rounded-xl bg-[#F9FAFB] border border-[#eaecf0] text-center"
                >
                  <div class="flex items-center justify-center gap-1 mb-1">
                    <i class="ti ti-message text-[16px] text-[#667085]"></i>
                  </div>
                  <div
                    id="preview-comments-big"
                    class="text-[18px] font-bold text-[#111827]"
                  >
                    0
                  </div>
                  <div class="text-[11px] text-[#667085]">Comments</div>
                </div>
              </div>
            </div>
            <div id="preview-no-stats" class="hidden py-8 text-center">
              <i class="ti ti-chart-bar text-[32px] text-[#eaecf0] mb-2"></i>
              <p class="text-[13px] text-[#667085]">
                No performance data yet
              </p>
            </div>
          </div>

          <!-- Tab Content: Automation -->
          <div
            id="tab-panel-automation"
            class="preview-tab-panel hidden px-5 py-4 space-y-4"
          >
            <div class="space-y-1.5">
              <label
                class="text-[12px] font-semibold text-[#344054] uppercase tracking-wider"
                >Automation Name</label
              >
              <p
                id="preview-automation-name"
                class="text-[13px] text-[#667085]"
              ></p>
            </div>
            <div class="space-y-1.5">
              <label
                class="text-[12px] font-semibold text-[#344054] uppercase tracking-wider"
                >Status</label
              >
              <div class="flex items-center gap-2">
                <span
                  id="preview-automation-status-dot"
                  class="w-2 h-2 rounded-full bg-[#22C55E]"
                ></span>
                <span
                  id="preview-automation-status"
                  class="text-[13px] text-[#667085]"
                  >Active</span
                >
              </div>
            </div>
            <div class="space-y-1.5">
              <label
                class="text-[12px] font-semibold text-[#344054] uppercase tracking-wider"
                >Created</label
              >
              <p
                id="preview-created-at"
                class="text-[13px] text-[#667085]"
              ></p>
            </div>
          </div>

          <!-- Fail Reason (failed only) -->
          <div id="preview-fail-section" class="hidden px-5 pb-4">
            <div
              class="p-3 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[13px] text-[#B42318]"
            >
              <i class="ti ti-alert-circle text-[14px] mr-1"></i>
              <span id="preview-fail-reason"></span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="px-5 pb-3">
            <div class="flex items-center gap-2">
              <button
                id="btn-edit-approved"
                class="flex-1 h-10 rounded-xl border border-[#eaecf0] bg-white text-[13px] font-bold text-[#344054] hover:bg-[#F9FAFB] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <i class="ti ti-pencil text-[14px]"></i>
                Edit Content
              </button>
              <button
                id="btn-duplicate"
                class="flex-1 h-10 rounded-xl border border-[#eaecf0] bg-white text-[13px] font-bold text-[#344054] hover:bg-[#F9FAFB] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <i class="ti ti-copy text-[14px]"></i>
                Duplicate
              </button>
              <button
                class="w-10 h-10 rounded-xl border border-[#eaecf0] bg-white flex items-center justify-center text-[#667085] hover:bg-[#F9FAFB] transition-all cursor-pointer"
              >
                <i class="ti ti-dots text-[14px]"></i>
              </button>
            </div>
          </div>

          <!-- Variations -->
          <div id="preview-variations-section" class="px-5 pb-4 hidden">
            <div class="flex items-center gap-2">
              <span class="text-[12px] font-medium text-[#344054]"
                >Variations</span
              >
              <div
                id="preview-variation-btns"
                class="flex items-center gap-1"
              >
                <!-- Injected via JS -->
              </div>
            </div>
          </div>

          <!-- Engagement CTA -->
          <div class="px-5 pb-6">
            <button
              id="btn-auto-engagement-from-preview"
              class="w-full h-11 rounded-xl bg-[#2563EB] text-white text-[13px] font-bold hover:bg-[#1D4ED8] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <i class="ti ti-message-circle text-[16px]"></i>
              Open Engagement Settings
            </button>
            <p class="text-center text-[11px] text-[#667085] mt-2">
              Set up auto reply, like, DM, and more
            </p>
          </div>

          <!-- Status-based Actions (hidden by default, shown via JS) -->
          <div
            id="preview-actions"
            class="hidden px-5 pb-4 items-center gap-2"
          >
            <button
              id="btn-reject"
              class="flex-1 h-10 rounded-xl border border-[#eaecf0] bg-white text-[13px] font-bold text-[#344054] hover:bg-[#F9FAFB] transition-all cursor-pointer"
              >Reject</button
            >
            <button
              id="btn-approve"
              class="flex-1 h-10 rounded-xl bg-[#111827] text-white text-[13px] font-bold hover:bg-black transition-all cursor-pointer"
              >Approve</button
            >
          </div>
          <div
            id="preview-approved-actions"
            class="hidden px-5 pb-4 items-center gap-2"
          >
            <button
              id="btn-schedule"
              class="flex-1 h-10 rounded-xl bg-[#111827] text-white text-[13px] font-bold hover:bg-black transition-all cursor-pointer"
              >Schedule</button
            >
          </div>
          <div
            id="preview-scheduled-actions"
            class="hidden px-5 pb-4 flex-col gap-2"
          >
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[11px] text-[#667085]">Scheduled for</span>
              <span
                id="preview-scheduled-time"
                class="text-[11px] font-bold text-[#111827]"
                >-</span
              >
            </div>
            <div class="flex items-center gap-2">
              <button
                id="btn-edit-scheduled"
                class="flex-1 h-10 rounded-xl border border-[#eaecf0] bg-white text-[13px] font-bold text-[#344054] hover:bg-[#F9FAFB] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <i class="ti ti-pencil text-[14px]"></i>
                Edit
              </button>
              <button
                id="btn-cancel-schedule"
                class="flex-1 h-10 rounded-xl border border-[#eaecf0] bg-white text-[13px] font-bold text-[#344054] hover:bg-[#FEF3F2] hover:text-[#D92D20] hover:border-[#FECDCA] transition-all cursor-pointer"
                >Cancel</button
              >
              <button
                id="btn-reschedule"
                class="flex-1 h-10 rounded-xl border border-[#eaecf0] bg-white text-[13px] font-bold text-[#344054] hover:bg-[#F9FAFB] transition-all cursor-pointer"
                >Reschedule</button
              >
            </div>
            <button
              id="btn-auto-engagement-scheduled"
              class="w-full h-10 rounded-xl border border-[#dbeafe] bg-[#EFF6FF] text-[13px] font-bold text-[#2563EB] hover:bg-[#DBEAFE] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <i class="ti ti-message-share text-[14px]"></i>
              Engagement
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

'''

content = content[:start_idx] + new_block + content[end_idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Modal HTML replaced successfully')
