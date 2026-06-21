
    // --- Global Filter Elements ---
    const searchInput = document.getElementById('integration-search');
    const accountRows = document.querySelectorAll('.account-row');

    // Filter Dropdown Toggles
    function setupFilterDropdown(btnId, dropdownId, optionClass, labelId, onSelect) {
      const btn = document.getElementById(btnId);
      const dropdown = document.getElementById(dropdownId);
      const label = document.getElementById(labelId);
      if (!btn || !dropdown) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      const bizSearchInput = dropdown.querySelector('.biz-search-input');
      if (bizSearchInput) {
        bizSearchInput.addEventListener('click', (e) => e.stopPropagation());
        bizSearchInput.addEventListener('input', (e) => {
          const term = e.target.value.toLowerCase();
          dropdown.querySelectorAll('.' + optionClass).forEach(opt => {
            const text = opt.textContent.toLowerCase();
            opt.style.display = text.includes(term) ? 'block' : 'none';
          });
        });
      }

      dropdown.querySelectorAll('.' + optionClass).forEach((opt) => {
        opt.addEventListener('click', () => {
          const value = opt.dataset.value;
          const text = opt.textContent.trim();
          label.textContent = text;
          dropdown.querySelectorAll('.' + optionClass).forEach((o) => o.classList.remove('bg-[#F9FAFB]', 'text-[#111827]'));
          opt.classList.add('bg-[#F9FAFB]', 'text-[#111827]');
          dropdown.classList.add('hidden');
          onSelect(value);
        });
      });
    }

    let activePlatform = 'all';
    let activeDNA = 'all';
    let activeStatus = 'all';
    let searchQuery = '';

    function applyFilters() {
      accountRows.forEach((row) => {
        const platform = row.dataset.platform;
        const dna = row.dataset.dna;
        const status = row.dataset.status;
        const handle = row.dataset.handle || '';

        const matchPlatform = activePlatform === 'all' || platform === activePlatform;
        const matchDNA = activeDNA === 'all' || dna === activeDNA;
        const matchStatus = activeStatus === 'all' || status === activeStatus;
        const matchSearch = !searchQuery || handle.includes(searchQuery);

        row.style.display = matchPlatform && matchDNA && matchStatus && matchSearch ? '' : 'none';
      });
    }

    setupFilterDropdown('btn-platform-filter', 'platform-filter-dropdown', 'platform-option', 'platform-filter-label', (val) => {
      activePlatform = val;
      applyFilters();
    });

    setupFilterDropdown('btn-dna-filter', 'dna-filter-dropdown', 'dna-option', 'dna-filter-label', (val) => {
      activeDNA = val;
      applyFilters();
    });

    // Status tabs
    document.querySelectorAll('.status-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.status-tab').forEach((t) => {
          t.classList.remove('active', 'bg-[#F9FAFB]', 'text-[#111827]', 'font-semibold');
          t.classList.add('text-[#667085]', 'font-medium');
        });
        tab.classList.add('active', 'bg-[#F9FAFB]', 'text-[#111827]', 'font-semibold');
        tab.classList.remove('text-[#667085]', 'font-medium');
        activeStatus = tab.dataset.status;
        applyFilters();
      });
    });

    // Search
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });

    // Add Account Modal Functions
    const addAccountModal = document.getElementById('add-account-modal');
    const btnConnect = document.getElementById('btn-connect');
    const selectedPlatformLabel = document.getElementById('selected-platform-label');
    let selectedPlatform = null;
    let selectedDNA = null;

    window.openModal = function() {
      if (!addAccountModal) return;
      addAccountModal.hidden = false;
      selectedPlatform = null;
      selectedDNA = null;
      window.showStep('platform');
      window.updateConnectButton();
    };

    window.closeModal = function() {
      if (!addAccountModal) return;
      addAccountModal.hidden = true;
    };

    window.showStep = function(step) {
      const stepPlatform = document.getElementById('modal-step-platform');
      const stepDNA = document.getElementById('modal-step-dna');
      const backBtn = document.getElementById('modal-back-btn');
      if (step === 'platform') {
        stepPlatform?.classList.remove('hidden');
        stepDNA?.classList.add('hidden');
        backBtn?.classList.add('hidden');
        backBtn?.classList.remove('flex');
      } else {
        stepPlatform?.classList.add('hidden');
        stepDNA?.classList.remove('hidden');
        backBtn?.classList.remove('hidden');
        backBtn?.classList.add('flex');
      }
    };

    window.updateConnectButton = function() {
      if (!btnConnect) return;
      if (selectedPlatform && selectedDNA) {
        btnConnect.classList.remove('opacity-50', 'cursor-not-allowed');
        btnConnect.disabled = false;
      } else {
        btnConnect.classList.add('opacity-50', 'cursor-not-allowed');
        btnConnect.disabled = true;
      }
    };

    window.selectPlatform = function(item) {
      selectedPlatform = item.dataset.platform;
      const platformName = item.dataset.name;
      if (selectedPlatformLabel) selectedPlatformLabel.textContent = platformName || '-';
      window.showStep('dna');
    };

    window.selectDNA = function(item) {
      selectedDNA = item.dataset.dna;
      document.querySelectorAll('.modal-dna-item').forEach((i) => i.classList.remove('border-[#2563EB]', 'bg-blue-50'));
      item.classList.add('border-[#2563EB]', 'bg-blue-50');
      window.updateConnectButton();
    };

    window.connectAccount = function() {
      if (selectedPlatform && selectedDNA) {
        window.closeModal();
      }
    };


    // --- Three-Dots Action Dropdown Handling ---
    document.querySelectorAll('.btn-action-dropdown').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wrapper = btn.closest('.action-dropdown-wrapper');
        const dropdown = wrapper?.querySelector('.action-dropdown');
        
        // Close all other dropdowns
        document.querySelectorAll('.action-dropdown').forEach((d) => {
          if (d !== dropdown) d.classList.add('hidden');
        });
        
        dropdown?.classList.toggle('hidden');
      });
    });

    // Close all filter and action dropdowns on click outside
    document.addEventListener('click', () => {
      document.getElementById('platform-filter-dropdown')?.classList.add('hidden');
      document.getElementById('dna-filter-dropdown')?.classList.add('hidden');
      document.querySelectorAll('.action-dropdown').forEach((d) => d.classList.add('hidden'));
    });


    // --- Automation Settings Modal Logic ---
    let activeEditingAccountId = null;

    function getSettingsModal() {
      return document.getElementById('automation-settings-modal');
    }
    function getSettingsModalCard() {
      return getSettingsModal()?.querySelector('.modal-card');
    }

    // Toggle switch helper
    function setToggleState(toggle, isActive) {
      const handle = toggle.querySelector('.toggle-handle');
      if (!handle) return;
      toggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
      if (isActive) {
        toggle.classList.remove('bg-gray-200');
        toggle.classList.add('bg-[#111827]');
        handle.classList.add('translate-x-[18px]');
      } else {
        toggle.classList.remove('bg-[#111827]');
        toggle.classList.add('bg-gray-200');
        handle.classList.remove('translate-x-[18px]');
      }
    }

    function setSubToggleState(toggle, isActive) {
      if (!toggle) return;
      const handle = toggle.querySelector('.toggle-handle');
      if (!handle) return;
      toggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
      if (isActive) {
        toggle.classList.remove('bg-gray-200');
        toggle.classList.add('bg-[#111827]');
        handle.classList.add('translate-x-[14px]');
      } else {
        toggle.classList.remove('bg-[#111827]');
        toggle.classList.add('bg-gray-200');
        handle.classList.remove('translate-x-[14px]');
      }
    }

    // Modal Expand/Collapse Animation Handler
    function expandSection(section) {
      section.classList.remove('hidden');
      // Force repaint
      section.offsetHeight;
      section.style.maxHeight = section.scrollHeight + 'px';
      section.style.opacity = '1';
      
      const onEnd = () => {
        if (section.style.maxHeight !== '0px') {
          section.style.maxHeight = 'none';
        }
        section.removeEventListener('transitionend', onEnd);
      };
      section.addEventListener('transitionend', onEnd);
    }

    function collapseSection(section) {
      section.style.maxHeight = section.scrollHeight + 'px';
      section.offsetHeight; // Force repaint
      section.style.maxHeight = '0px';
      section.style.opacity = '0';
      // Wait for transition to end before hiding
      const onTransitionEnd = () => {
        section.classList.add('hidden');
        section.removeEventListener('transitionend', onTransitionEnd);
      };
      section.addEventListener('transitionend', onTransitionEnd);
    }

    // Keywords/Tags render helper
    function renderTags(container, tagsList) {
      if (!container) return;
      const input = container.querySelector('.tag-input');
      // Clear existing tags
      container.querySelectorAll('.tag-chip').forEach(chip => chip.remove());
      
      tagsList.forEach(tag => {
        const chip = document.createElement('div');
        chip.className = 'tag-chip tag-badge bg-[#F2F4F7] text-[#344054] text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1';
        chip.innerHTML = `
          <span>${tag}</span>
          <button type="button" class="remove-tag text-[#98a2b3] hover:text-[#344054] font-bold cursor-pointer">×</button>
        `;
        chip.querySelector('.remove-tag').addEventListener('click', () => {
          chip.remove();
        });
        container.insertBefore(chip, input);
      });
    }

    function getTags(container) {
      const tags = [];
      if (!container) return tags;
      container.querySelectorAll('.tag-chip span').forEach(span => {
        tags.push(span.textContent.trim());
      });
      return tags;
    }

    // Set active pill helper
    function setPillActive(pillsContainer, activeValue) {
      if (!pillsContainer) return;
      pillsContainer.querySelectorAll('button').forEach(btn => {
        if (btn.dataset.value === activeValue) {
          btn.classList.remove('text-[#667085]', 'hover:text-[#111827]');
          btn.classList.add('text-white', 'bg-[#111827]');
        } else {
          btn.classList.remove('text-white', 'bg-[#111827]');
          btn.classList.add('text-[#667085]', 'hover:text-[#111827]');
        }
      });
    }

    function getPillValue(pillsContainer) {
      if (!pillsContainer) return null;
      const activeBtn = Array.from(pillsContainer.querySelectorAll('button')).find(btn => btn.classList.contains('text-white'));
      return activeBtn ? activeBtn.dataset.value : null;
    }

    // DM mode switcher active tab helper
    function setDmTabActive(pillsContainer, activeValue) {
      if (!pillsContainer) return;
      pillsContainer.querySelectorAll('button').forEach(btn => {
        if (btn.dataset.value === activeValue) {
          btn.classList.remove('text-[#667085]', 'hover:text-[#111827]');
          btn.classList.add('text-white', 'bg-[#111827]');
        } else {
          btn.classList.remove('text-white', 'bg-[#111827]');
          btn.classList.add('text-[#667085]', 'hover:text-[#111827]');
        }
      });
      const subsettings = pillsContainer.closest('.subsettings');
      if (subsettings) {
        subsettings.querySelectorAll('.dm-view-section').forEach(section => {
          if (section.classList.contains(`dm-view-${activeValue}`)) {
            section.classList.remove('hidden');
          } else {
            section.classList.add('hidden');
          }
        });
      }
    }

    // Dynamic keyword row creator
    function createKeywordRow(keywordVal = '', replyVal = '') {
      const div = document.createElement('div');
      div.className = 'dm-keyword-item bg-[#F9FAFB] border border-[#eaecf0] rounded-xl p-3.5 space-y-3 relative';
      div.innerHTML = `
        <div class="flex items-center justify-between">
          <label class="block text-[12px] font-bold text-[#344054]">Keyword</label>
          <button type="button" class="btn-remove-keyword w-7 h-7 rounded-lg border border-[#eaecf0] bg-white hover:bg-red-50 hover:text-[#D92D20] text-[#98a2b3] flex items-center justify-center shrink-0 cursor-pointer transition-all">
            <i class="ti ti-trash text-[13px]"></i>
          </button>
        </div>
        <input type="text" class="keyword-input w-full h-9 rounded-xl border border-[#D0D5DD] bg-white px-3 text-[13px] font-semibold text-[#344054] placeholder:text-[#98a2b3] outline-none focus:border-[#111827]" placeholder="Masukan keyword" value="${keywordVal}">
        
        <label class="block text-[12px] font-bold text-[#344054] mt-1">Balasan</label>
        <textarea class="reply-input w-full rounded-xl border border-[#D0D5DD] p-3 text-[13px] text-[#344054] outline-none focus:border-[#111827] placeholder:text-[#98a2b3] min-h-[60px] resize-y" placeholder="Masukan balasan">${replyVal}</textarea>
        
        <div class="p-2.5 bg-white border border-[#eaecf0] rounded-xl text-[10px] text-[#667085] space-y-0.5 font-medium">
          <div>• Gunakan format <b>{name}</b> untuk menambahkan nama</div>
          <div>• Gunakan format <b>{Hi|Hola|Hello}</b> untuk menghasilkan kata acak</div>
        </div>
      `;
      div.querySelector('.btn-remove-keyword').addEventListener('click', () => {
        div.remove();
      });
      return div;
    }

    // Dynamic opening button row creator
    function createOpeningButtonRow(labelVal = '', urlVal = '') {
      const div = document.createElement('div');
      div.className = 'flex gap-2 items-center button-row';
      div.innerHTML = `
        <input type="text" class="btn-label-input flex-1 h-9 rounded-xl border border-[#D0D5DD] bg-white px-3 text-[13px] font-semibold text-[#344054] outline-none focus:border-[#111827] placeholder:text-[#98a2b3]" placeholder="Teks button" value="${labelVal}">
        <input type="text" class="btn-url-input flex-1 h-9 rounded-xl border border-[#D0D5DD] bg-white px-3 text-[13px] font-semibold text-[#344054] outline-none focus:border-[#111827] placeholder:text-[#98a2b3]" placeholder="URL website" value="${urlVal}">
        <button type="button" class="btn-remove-button w-9 h-9 rounded-xl border border-[#eaecf0] hover:bg-red-50 hover:text-[#D92D20] text-[#98a2b3] flex items-center justify-center shrink-0 cursor-pointer transition-all">
          <i class="ti ti-trash text-[14px]"></i>
        </button>
      `;
      div.querySelector('.btn-remove-button').addEventListener('click', () => {
        div.remove();
      });
      return div;
    }

    // Open/Close modal
    window.openSettingsModal = function(accountId) {
      const modal = getSettingsModal();
      const card = getSettingsModalCard();
      if (!modal || !card) return;

      activeEditingAccountId = accountId;
      const row = document.querySelector(`.account-row[data-id="${accountId}"]`);
      if (!row) return;

      const automations = JSON.parse(row.dataset.automations || '{}');

      // Populate all cards
      modal.querySelectorAll('.automation-row').forEach((cardEl) => {
        const key = cardEl.dataset.automation;
        const config = automations[key] || { enabled: false };
        const isActive = config.enabled === true;

        const toggle = cardEl.querySelector('.toggle-switch');
        const subsettings = cardEl.querySelector('.subsettings');

        setToggleState(toggle, isActive);

        if (isActive) {
          subsettings.classList.remove('hidden');
          subsettings.style.maxHeight = 'none';
          subsettings.style.opacity = '1';
        } else {
          subsettings.classList.add('hidden');
          subsettings.style.maxHeight = '0px';
          subsettings.style.opacity = '0';
        }

        // Restore values based on automation type
        if (key === 'delete_comment') {
          const filterMode = config.filterMode || 'keyword';
          const pills = cardEl.querySelector('.filter-mode-pills');
          setPillActive(pills, filterMode);

          const wrapper = cardEl.querySelector('.keywords-wrapper');
          const aiWrapper = cardEl.querySelector('.ai-detection-wrapper');
          if (filterMode === 'keyword') {
            wrapper.classList.remove('hidden');
            aiWrapper.classList.add('hidden');
          } else {
            wrapper.classList.add('hidden');
            aiWrapper.classList.remove('hidden');
          }

          const keywords = config.keywords || [];
          renderTags(cardEl.querySelector('.tag-input-container'), keywords);

          const aiPromptInput = cardEl.querySelector('.ai-prompt-input');
          if (aiPromptInput) {
            aiPromptInput.value = config.aiPrompt || '';
          }

        } else if (key === 'reply_comment') {
          cardEl.querySelector('.select-input').value = config.tone || 'friendly';
          cardEl.querySelector('.delay-input').value = config.delay || 'instant';
          
          const maxLengthPills = cardEl.querySelector('.max-length-pills');
          setPillActive(maxLengthPills, config.maxLength || 'short');

          const excludeKeywords = config.excludeKeywords || [];
          renderTags(cardEl.querySelector('.tag-input-container'), excludeKeywords);

        } else if (key === 'like_comment') {
          const modePills = cardEl.querySelector('.like-mode-pills');
          setPillActive(modePills, config.mode || 'all');
          cardEl.querySelector('.delay-input').value = config.delay || 'instant';

          const spamToggle = cardEl.querySelector('.sub-toggle-switch');
          setSubToggleState(spamToggle, config.excludeSpam !== false);

        } else if (key === 'dm_comment' || key === 'reply_story' || key === 'reply_dm') {
          let mode = config.mode || 'text';
          
          // For reply_dm, if somehow saved as 'opening', default back to text since it doesn't have opening
          if (key === 'reply_dm' && mode === 'opening') mode = 'text';

          const switcher = cardEl.querySelector('.dm-mode-switcher-pills');
          setDmTabActive(switcher, mode);

          // Restore Text View
          const textView = cardEl.querySelector('.dm-view-text');
          const isTextKeywordMatching = config.keywordMatching === true;
          const isTextDelayEnabled = config.delayEnabled === true;
          textView.querySelector('.dm-text-input').value = config.text || (mode === 'text' ? config.template : '') || '';
          setSubToggleState(textView.querySelector('[data-field="keywordMatching"]'), isTextKeywordMatching);
          setSubToggleState(textView.querySelector('[data-field="delayEnabled"]'), isTextDelayEnabled);
          const textSelect = textView.querySelector('.dm-delay-select');
          textSelect.value = config.delay || '5min';
          if (isTextDelayEnabled) {
            textSelect.classList.remove('hidden');
          } else {
            textSelect.classList.add('hidden');
          }

          // Restore Keyword View
          const keywordView = cardEl.querySelector('.dm-view-keyword');
          const keywordsContainer = keywordView.querySelector('.dm-keywords-list');
          keywordsContainer.innerHTML = '';
          const savedKeywords = config.keywords || [];
          if (savedKeywords.length > 0) {
            savedKeywords.forEach(item => {
              keywordsContainer.appendChild(createKeywordRow(item.keyword, item.reply));
            });
          } else {
            keywordsContainer.appendChild(createKeywordRow('', ''));
          }

          // Restore AI View
          const aiView = cardEl.querySelector('.dm-view-ai');
          const isAiKeywordMatching = config.keywordMatching === true;
          const isAiDelayEnabled = config.delayEnabled === true;
          aiView.querySelector('.dm-ai-prompt-input').value = config.aiPrompt || '';
          setSubToggleState(aiView.querySelector('[data-field="keywordMatching"]'), isAiKeywordMatching);
          setSubToggleState(aiView.querySelector('[data-field="delayEnabled"]'), isAiDelayEnabled);
          const aiSelect = aiView.querySelector('.dm-delay-select');
          aiSelect.value = config.delay || '5min';
          if (isAiDelayEnabled) {
            aiSelect.classList.remove('hidden');
          } else {
            aiSelect.classList.add('hidden');
          }

          // Restore Opening View
          const openingView = cardEl.querySelector('.dm-view-opening');
          if (openingView) {
            // Pesan Pertama
            const p1 = config.pesanPertama || { enabled: false, text: '', buttonText: '' };
            const p1Section = openingView.querySelector('[data-section="pesanPertama"]');
            setSubToggleState(p1Section.querySelector('[data-field="enabled"]'), p1.enabled);
            p1Section.querySelector('.section-text').value = p1.text || '';
            p1Section.querySelector('.section-btn-text').value = p1.buttonText || '';
            if (p1.enabled) {
              p1Section.querySelector('.section-content').classList.remove('hidden');
            } else {
              p1Section.querySelector('.section-content').classList.add('hidden');
            }

            // Pesan Tambahan
            const p2 = config.pesanTambahan || { enabled: false };
            const p2Section = openingView.querySelector('[data-section="pesanTambahan"]');
            setSubToggleState(p2Section.querySelector('[data-field="enabled"]'), p2.enabled);

            // Cegah Sebelum Mengikuti
            const p3 = config.cegahSebelumMengikuti || { enabled: false, text: '', buttonText: '' };
            const p3Section = openingView.querySelector('[data-section="cegahSebelumMengikuti"]');
            setSubToggleState(p3Section.querySelector('[data-field="enabled"]'), p3.enabled);
            p3Section.querySelector('.section-text').value = p3.text || '';
            p3Section.querySelector('.section-btn-text').value = p3.buttonText || '';
            if (p3.enabled) {
              p3Section.querySelector('.section-content').classList.remove('hidden');
            } else {
              p3Section.querySelector('.section-content').classList.add('hidden');
            }

            // Pesan Follow-up
            const p4 = config.pesanFollowUp || { imageEnabled: false, imageUrl: '', text: '', buttons: [] };
            const p4Section = openingView.querySelector('[data-section="pesanFollowUp"]');
            
            const btnTambahGambar = p4Section.querySelector('.btn-tambah-gambar');
            const gambarPreview = p4Section.querySelector('.gambar-preview');
            if (p4.imageEnabled) {
              btnTambahGambar.classList.add('hidden');
              gambarPreview.classList.remove('hidden');
              if (p4.imageUrl) {
                gambarPreview.querySelector('img').src = p4.imageUrl;
              }
            } else {
              btnTambahGambar.classList.remove('hidden');
              gambarPreview.classList.add('hidden');
            }
            
            p4Section.querySelector('.section-text').value = p4.text || '';
            
            const buttonsContainer = p4Section.querySelector('.opening-buttons-list');
            buttonsContainer.innerHTML = '';
            const savedButtons = p4.buttons || [];
            if (savedButtons.length > 0) {
              savedButtons.forEach(btn => {
                buttonsContainer.appendChild(createOpeningButtonRow(btn.label, btn.url));
              });
            } else {
              buttonsContainer.appendChild(createOpeningButtonRow('', ''));
            }
          }
        }
      });

      // Show modal
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
      }, 20);
    };

    window.closeSettingsModal = function() {
      const modal = getSettingsModal();
      const card = getSettingsModalCard();
      if (!modal || !card) return;

      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0');
      card.classList.remove('scale-100', 'opacity-100');
      card.classList.add('scale-95', 'opacity-0');

      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    };


    // --- Setup Event Listeners on DOM Loaded ---
    document.addEventListener('DOMContentLoaded', () => {
      
      // Expand/Collapse click on Card Header toggle
      document.querySelectorAll('#automation-settings-modal .automation-row').forEach((card) => {
        const toggle = card.querySelector('.toggle-switch');
        const subsettings = card.querySelector('.subsettings');
        const header = card.querySelector('.card-header');

        const handleToggle = (e) => {
          e.stopPropagation();
          const isChecked = toggle.getAttribute('aria-checked') === 'true';
          const nextState = !isChecked;
          
          setToggleState(toggle, nextState);
          if (nextState) {
            expandSection(subsettings);
          } else {
            collapseSection(subsettings);
          }
        };

        toggle.addEventListener('click', handleToggle);
        
        // Also clicking card title/header toggles expansion (except when clicking switch directly)
        header.addEventListener('click', (e) => {
          if (e.target !== toggle && !toggle.contains(e.target)) {
            handleToggle(e);
          }
        });

        // Pill switches within subsettings
        card.querySelectorAll('.filter-mode-pills button, .max-length-pills button, .like-mode-pills button, .trigger-pills button, .response-mode-pills button').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const container = btn.closest('.filter-mode-pills, .max-length-pills, .like-mode-pills, .trigger-pills, .response-mode-pills');
            setPillActive(container, btn.dataset.value);

            // Conditional view handling based on pill switch
            if (container.classList.contains('filter-mode-pills')) {
              const kwWrapper = card.querySelector('.keywords-wrapper');
              const aiWrapper = card.querySelector('.ai-detection-wrapper');
              if (btn.dataset.value === 'keyword') {
                kwWrapper.classList.remove('hidden');
                aiWrapper.classList.add('hidden');
              } else {
                kwWrapper.classList.add('hidden');
                aiWrapper.classList.remove('hidden');
              }
            } else if (container.classList.contains('trigger-pills')) {
              const kwWrapper = card.querySelector('.trigger-keywords-wrapper');
              if (btn.dataset.value === 'keyword') {
                kwWrapper.classList.remove('hidden');
              } else {
                kwWrapper.classList.add('hidden');
              }
            } else if (container.classList.contains('response-mode-pills')) {
              const toneWrapper = card.querySelector('.tone-wrapper');
              const repliesWrapper = card.querySelector('.quick-replies-wrapper');
              if (btn.dataset.value === 'ai') {
                toneWrapper.classList.remove('hidden');
                repliesWrapper.classList.add('hidden');
              } else {
                toneWrapper.classList.add('hidden');
                repliesWrapper.classList.remove('hidden');
              }
            }
          });
        });

        // DM mode switcher pills
        card.querySelectorAll('.dm-mode-switcher-pills button').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const container = btn.closest('.dm-mode-switcher-pills');
            setDmTabActive(container, btn.dataset.value);
          });
        });

        // Sub toggle switches
        card.querySelectorAll('.sub-toggle-switch').forEach(subToggle => {
          subToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isChecked = subToggle.getAttribute('aria-checked') === 'true';
            const nextState = !isChecked;
            setSubToggleState(subToggle, nextState);
            
            // Special handling for delayEnabled
            if (subToggle.dataset.field === 'delayEnabled') {
              const select = subToggle.closest('.flex').querySelector('.dm-delay-select');
              if (select) {
                if (nextState) {
                  select.classList.remove('hidden');
                } else {
                  select.classList.add('hidden');
                }
              }
            }
            // Special handling for Opening sections
            if (subToggle.dataset.field === 'enabled') {
              const section = subToggle.closest('.opening-section');
              const content = section?.querySelector('.section-content');
              if (content) {
                if (nextState) {
                  content.classList.remove('hidden');
                } else {
                  content.classList.add('hidden');
                }
              }
            }
          });
        });

        // Dynamic lists for DM Comment Keyword view
        const addKeywordBtn = card.querySelector('.btn-add-dm-keyword');
        const keywordsList = card.querySelector('.dm-keywords-list');
        if (addKeywordBtn && keywordsList) {
          addKeywordBtn.addEventListener('click', () => {
            keywordsList.appendChild(createKeywordRow('', ''));
          });
        }

        // Dynamic lists for DM Comment Opening view (tombol follow-up)
        const addOpeningBtn = card.querySelector('.btn-add-opening-button');
        const openingButtonsList = card.querySelector('.opening-buttons-list');
        if (addOpeningBtn && openingButtonsList) {
          addOpeningBtn.addEventListener('click', () => {
            openingButtonsList.appendChild(createOpeningButtonRow('', ''));
          });
        }

        // Image picker mockup handler
        const btnTambahGambar = card.querySelector('.btn-tambah-gambar');
        const gambarPreview = card.querySelector('.gambar-preview');
        if (btnTambahGambar && gambarPreview) {
          btnTambahGambar.addEventListener('click', () => {
            btnTambahGambar.classList.add('hidden');
            gambarPreview.classList.remove('hidden');
          });
          gambarPreview.querySelector('.btn-remove-gambar')?.addEventListener('click', () => {
            gambarPreview.classList.add('hidden');
            btnTambahGambar.classList.remove('hidden');
          });
        }

        // Local AI Prompt Save Feedback
        const saveAiPromptBtn = card.querySelector('.btn-save-ai-prompt');
        if (saveAiPromptBtn) {
          saveAiPromptBtn.addEventListener('click', () => {
            const originalHtml = saveAiPromptBtn.innerHTML;
            saveAiPromptBtn.innerHTML = `<i class="ti ti-check text-[14px] text-[#12B76A]"></i> <span class="text-[#12B76A]">Saved!</span>`;
            saveAiPromptBtn.disabled = true;
            setTimeout(() => {
              saveAiPromptBtn.innerHTML = originalHtml;
              saveAiPromptBtn.disabled = false;
            }, 1500);
          });
        }

        // Tag inputs keyword logic
        const tagContainer = card.querySelector('.tag-input-container');
        if (tagContainer) {
          const input = tagContainer.querySelector('.tag-input');
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const val = input.value.trim();
              if (val) {
                // Add chip
                const chip = document.createElement('div');
                chip.className = 'tag-chip tag-badge bg-[#F2F4F7] text-[#344054] text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1';
                chip.innerHTML = `
                  <span>${val}</span>
                  <button type="button" class="remove-tag text-[#98a2b3] hover:text-[#344054] font-bold cursor-pointer">×</button>
                `;
                chip.querySelector('.remove-tag').addEventListener('click', () => {
                  chip.remove();
                });
                tagContainer.insertBefore(chip, input);
                input.value = '';
              }
            }
          });

          // Clicking container focuses input
          tagContainer.addEventListener('click', (e) => {
            if (e.target === tagContainer) input.focus();
          });
        }
      });

      // --- Save Button Click Handler ---
      const saveBtn = document.getElementById('btn-save-automation-settings');
      saveBtn?.addEventListener('click', () => {
        if (!activeEditingAccountId) return;

        const row = document.querySelector(`.account-row[data-id="${activeEditingAccountId}"]`);
        if (!row) return;

        const modal = getSettingsModal();
        const automations = {};

        modal.querySelectorAll('.automation-row').forEach((cardEl) => {
          const key = cardEl.dataset.automation;
          const toggle = cardEl.querySelector('.toggle-switch');
          const isEnabled = toggle.getAttribute('aria-checked') === 'true';

          if (isEnabled) {
            const config = { enabled: true };

            if (key === 'delete_comment') {
              config.filterMode = getPillValue(cardEl.querySelector('.filter-mode-pills')) || 'keyword';
              config.keywords = getTags(cardEl.querySelector('.tag-input-container'));
              config.aiPrompt = cardEl.querySelector('.ai-prompt-input')?.value || '';

            } else if (key === 'reply_comment') {
              config.tone = cardEl.querySelector('.select-input').value;
              config.delay = cardEl.querySelector('.delay-input').value;
              config.excludeKeywords = getTags(cardEl.querySelector('.tag-input-container'));

            } else if (key === 'like_comment') {
              config.delay = cardEl.querySelector('.delay-input').value;
              config.excludeSpam = cardEl.querySelector('[data-field="excludeSpam"]').getAttribute('aria-checked') === 'true';

            } else if (key === 'dm_comment' || key === 'reply_story' || key === 'reply_dm') {
              const activeMode = getPillValue(cardEl.querySelector('.dm-mode-switcher-pills')) || 'text';
              config.mode = activeMode;

              if (activeMode === 'text') {
                config.text = cardEl.querySelector('.dm-view-text .dm-text-input').value;
                config.keywordMatching = cardEl.querySelector('.dm-view-text [data-field="keywordMatching"]').getAttribute('aria-checked') === 'true';
                config.delayEnabled = cardEl.querySelector('.dm-view-text [data-field="delayEnabled"]').getAttribute('aria-checked') === 'true';
                config.delay = cardEl.querySelector('.dm-view-text .dm-delay-select').value;
              } else if (activeMode === 'keyword') {
                const keywords = [];
                cardEl.querySelectorAll('.dm-keywords-list .dm-keyword-item').forEach(item => {
                  const kw = item.querySelector('.keyword-input').value.trim();
                  const rep = item.querySelector('.reply-input').value.trim();
                  keywords.push({ keyword: kw, reply: rep });
                });
                config.keywords = keywords;
              } else if (activeMode === 'ai') {
                config.aiPrompt = cardEl.querySelector('.dm-view-ai .dm-ai-prompt-input').value;
                config.keywordMatching = cardEl.querySelector('.dm-view-ai [data-field="keywordMatching"]').getAttribute('aria-checked') === 'true';
                config.delayEnabled = cardEl.querySelector('.dm-view-ai [data-field="delayEnabled"]').getAttribute('aria-checked') === 'true';
                config.delay = cardEl.querySelector('.dm-view-ai .dm-delay-select').value;
              } else if (activeMode === 'opening') {
                if (cardEl.querySelector('.dm-view-opening')) {
                  // Pesan Pertama
                  const pesanPertama = cardEl.querySelector('[data-section="pesanPertama"]');
                  config.pesanPertama = {
                    enabled: pesanPertama.querySelector('[data-field="enabled"]').getAttribute('aria-checked') === 'true',
                    text: pesanPertama.querySelector('.section-text').value,
                    buttonText: pesanPertama.querySelector('.section-btn-text').value
                  };
                  
                  // Pesan Tambahan
                  const pesanTambahan = cardEl.querySelector('[data-section="pesanTambahan"]');
                  config.pesanTambahan = {
                    enabled: pesanTambahan.querySelector('[data-field="enabled"]').getAttribute('aria-checked') === 'true'
                  };
                  
                  // Cegah Sebelum Mengikuti
                  const cegahSebelumMengikuti = cardEl.querySelector('[data-section="cegahSebelumMengikuti"]');
                  config.cegahSebelumMengikuti = {
                    enabled: cegahSebelumMengikuti.querySelector('[data-field="enabled"]').getAttribute('aria-checked') === 'true',
                    text: cegahSebelumMengikuti.querySelector('.section-text').value,
                    buttonText: cegahSebelumMengikuti.querySelector('.section-btn-text').value
                  };
                  
                  // Pesan Follow-up
                  const pesanFollowUp = cardEl.querySelector('[data-section="pesanFollowUp"]');
                  const imageEnabled = !pesanFollowUp.querySelector('.gambar-preview').classList.contains('hidden');
                  
                  const buttons = [];
                  pesanFollowUp.querySelectorAll('.opening-buttons-list .button-row').forEach(row => {
                    const label = row.querySelector('.btn-label-input').value.trim();
                    const url = row.querySelector('.btn-url-input').value.trim();
                    if (label || url) {
                      buttons.push({ label, url });
                    }
                  });
                  
                  config.pesanFollowUp = {
                    imageEnabled: imageEnabled,
                    imageUrl: imageEnabled ? pesanFollowUp.querySelector('.gambar-preview img').src : '',
                    text: pesanFollowUp.querySelector('.section-text').value,
                    buttons: buttons
                  };
                }
              }
            }

            automations[key] = config;
          }
        });

        // Save serialized JSON string back to row
        row.dataset.automations = JSON.stringify(automations);

        // Dynamically update the row's badges in column 5
        const badgesContainer = row.querySelector('.automations-badges');
        if (badgesContainer) {
          badgesContainer.innerHTML = '';
          const activeKeys = Object.keys(automations).filter(k => automations[k]?.enabled);

          const iconMap = {
            delete_comment: { label: "Delete Comment", icon: "ti-trash" },
            reply_comment: { label: "Reply Comment", icon: "ti-message-dots" },
            like_comment: { label: "Like Comment", icon: "ti-thumb-up" },
            dm_comment: { label: "DM Comment", icon: "ti-message-share" },
            reply_story: { label: "Reply Story", icon: "ti-history" },
            reply_dm: { label: "Reply DM", icon: "ti-messages" },
          };

          if (activeKeys.length > 0) {
            activeKeys.forEach((key) => {
              const iconConfig = iconMap[key];
              if (iconConfig) {
                const badgeEl = document.createElement('div');
                badgeEl.className = 'relative group flex items-center';
                badgeEl.innerHTML = `
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center border border-[#eaecf0] bg-[#F9FAFB] text-[#475467] transition-all hover:bg-[#F2F4F7] cursor-help">
                    <i class="ti ${iconConfig.icon} text-[14px]"></i>
                  </div>
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                    <div class="bg-gray-900 text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                      ${iconConfig.label}
                    </div>
                    <div class="w-1.5 h-1.5 bg-gray-900 rotate-45 -mt-0.75"></div>
                  </div>
                `;
                badgesContainer.appendChild(badgeEl);
              }
            });
          } else {
            badgesContainer.innerHTML = '<span class="text-[12px] text-[#98a2b3] italic font-medium">None active</span>';
          }
        }

        window.closeSettingsModal();
      });

    });
  