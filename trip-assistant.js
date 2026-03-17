(function() {
  // ===== TRIP CONTEXT =====
  const TRIP_CONTEXT = `You are a friendly, knowledgeable travel assistant for the Burton family's Japan trip. Answer questions helpfully and concisely. Use the trip details below to give personalised advice.

TRIP OVERVIEW:
- Dates: 20 June – 10 July 2026 (21 days)
- Travellers: Matt, SQ (partner), Bronte (child ~10), Mum & Dad (Matt's parents)
- Budget: ~$10,930 AUD already booked for accommodation/flights/car. Estimating $8,000–12,000 AUD more for daily spending.

ITINERARY:
1. OSAKA (3 nights, 20–23 Jun) — Holiday Inn Osaka Namba (2 rooms)
   - Day 1 (Sat 20 Jun): Arrive Kansai Airport evening, Rapi:t express to Namba
   - Day 2 (Sun 21 Jun): Osaka Castle, Dotonbori, street food (takoyaki, okonomiyaki)
   - Day 3 (Mon 22 Jun): Day trip to Nara (deer park, Todai-ji), Shinsekai evening
   
2. HIROSHIMA (2 nights, 23–25 Jun) — Sheraton Grand Hiroshima (2 rooms)
   - Day 4 (Tue 23 Jun): Shinkansen to Hiroshima, Peace Memorial Park & Museum
   - Day 5 (Wed 24 Jun): Ferry to Miyajima Island, Itsukushima Shrine, hike Mt Misen

3. KYOTO & NARA (4 nights, 25–29 Jun) — Airbnb Townhouse Kyoto (has kitchen)
   - Day 6 (Thu 25 Jun): Train to Kyoto, Fushimi Inari (thousand torii gates)
   - Day 7 (Fri 26 Jun): Arashiyama bamboo grove, monkey park, Togetsukyo Bridge
   - Day 8 (Sat 27 Jun): Kinkaku-ji (Golden Pavilion), Nijo Castle, Nishiki Market
   - Day 9 (Sun 28 Jun): Gion district walking, tea ceremony experience

4. TAKAYAMA (3 nights, 29 Jun–2 Jul) — Ouan Ryokan (2 rooms, meals included!)
   - Day 10 (Mon 29 Jun): Train Kyoto→Nagoya→Takayama, explore old town
   - Day 11 (Tue 30 Jun): Morning markets, Hida Folk Village, Hida beef lunch
   - Day 12 (Wed 1 Jul): Shirakawa-go day trip (UNESCO thatched-roof village)

5. HOKKAIDO (4 nights, 2–6 Jul) — Airbnb House Furano (has kitchen), rental car (Toyota Alphard)
   - Day 13 (Thu 2 Jul): Fly Nagoya→Sapporo, pick up car, drive to Furano
   - Day 14 (Fri 3 Jul): Furano lavender fields, Farm Tomita, cheese factory
   - Day 15 (Sat 4 Jul): Biei blue pond, patchwork hills, melon farm
   - Day 16 (Sun 5 Jul): Asahiyama Zoo, drive to Sapporo via Otaru canal town

6. SAPPORO (4 nights, 6–10 Jul) — Bespoke Hotel Sapporo (2 rooms)
   - Day 17 (Mon 6 Jul): Return car. Odori Park, TV Tower, Tanuki Koji shopping
   - Day 18 (Tue 7 Jul): Sapporo Beer Museum & Garden, Susukino evening
   - Day 19 (Wed 8 Jul): Shiroi Koibito Park (chocolate factory), Mt Moiwa ropeway
   - Day 20 (Thu 9 Jul): Moerenuma Park (Isamu Noguchi), last shopping
   - Day 21 (Fri 10 Jul): Fly Sapporo→Osaka→Home

TRANSPORT:
- JR Kansai-Hiroshima Area Pass recommended for Osaka↔Hiroshima↔Kyoto legs
- Smart-EX app for Kyoto→Nagoya Shinkansen (book early for Hayatoku discount)
- Internal flights: Nagoya→Sapporo, Sapporo→Osaka (already booked)
- Rental car in Hokkaido only (Toyota Alphard, 4 days). Ask for Hokkaido Expressway Pass.
- IC cards (Suica/ICOCA) for local trains & buses everywhere else

MONEY:
- Wise card recommended (mid-market rate, 0.4-0.6% fee). Parents should get one too.
- Cash still needed for temples, markets, small shops, rural Hokkaido
- 7-Eleven ATMs (Seven Bank) accept international cards
- Always choose JPY at card terminals (never AUD — avoids DCC markup)
- Tax-free shopping on purchases over ¥5,000 — carry passports

FOOD TIPS:
- Konbini (convenience store) breakfasts are great and cheap ($4-6 AUD/person)
- Lunch sets (teishoku) are 30-50% cheaper than dinner for same quality
- Supermarkets discount after 7:30pm — great for Kyoto & Furano kitchens
- Takayama: ryokan meals included (huge saving)
- Must-try: takoyaki (Osaka), okonomiyaki (Hiroshima-style), ramen (Sapporo miso), Hida beef (Takayama)

IMPORTANT RULES:
- Be concise but warm. Use short paragraphs, not bullet points unless asked.
- If asked about a specific day, reference the itinerary above.
- If asked about costs, use AUD as the primary currency with JPY equivalents.
- If you don't know something specific, say so and suggest where to look.
- You can suggest nearby restaurants, activities, or practical tips.
- Remember Bronte is a child — factor that into activity and food suggestions.
- The trip is in summer (June-July) so weather will be hot and humid in most places, cooler in Hokkaido.`;

  // ===== STYLES =====
  const style = document.createElement('style');
  style.textContent = `
    .chat-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 64px; height: 64px; border-radius: 50%;
      background: linear-gradient(135deg, #FFB6C1, #FF8FAB);
      border: 3px solid #fff; cursor: pointer;
      box-shadow: 0 4px 20px rgba(255,143,171,0.4);
      display: flex; align-items: center; justify-content: center;
      padding: 0; transition: all 0.3s;
      overflow: hidden;
    }
    .chat-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(255,143,171,0.5); }
    .chat-fab.open { border-radius: 50%; background: linear-gradient(135deg, #1a1a2e, #0f3460); border-color: #0f3460; }
    .chat-fab svg { width: 44px; height: 44px; }
    .chat-fab.open svg { display: none; }
    .chat-fab .close-x { display: none; color: #fff; font-size: 22px; font-weight: bold; }
    .chat-fab.open .close-x { display: block; }

    .chat-panel {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 400px; max-height: 520px; border-radius: 20px;
      background: #fff; box-shadow: 0 8px 40px rgba(0,0,0,0.15);
      display: none; flex-direction: column; overflow: hidden;
      font-family: 'DM Sans', -apple-system, sans-serif;
    }
    .chat-panel.open { display: flex; }

    .chat-header {
      background: linear-gradient(135deg, #1a1a2e, #0f3460);
      color: #fff; padding: 18px 20px; flex-shrink: 0;
    }
    .chat-header h3 { font-size: 16px; font-weight: 700; margin: 0 0 2px; }
    .chat-header p { font-size: 12px; opacity: 0.6; margin: 0; }

    .chat-messages {
      flex: 1; overflow-y: auto; padding: 16px; min-height: 200px; max-height: 340px;
      background: #faf8f5;
    }
    .chat-msg { margin-bottom: 12px; max-width: 88%; line-height: 1.5; }
    .chat-msg.assistant { 
      background: #fff; padding: 12px 16px; border-radius: 16px 16px 16px 4px;
      font-size: 14px; color: #2D2D2D; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .chat-msg.user {
      background: #1a1a2e; color: #fff; padding: 10px 16px;
      border-radius: 16px 16px 4px 16px; margin-left: auto; font-size: 14px;
    }
    .chat-msg.typing { opacity: 0.6; font-style: italic; }
    .chat-msg p { margin: 0 0 8px; }
    .chat-msg p:last-child { margin-bottom: 0; }

    .chat-input-row {
      display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid #eee;
      background: #fff; flex-shrink: 0;
    }
    .chat-input {
      flex: 1; border: 1px solid #e0dbd4; border-radius: 12px;
      padding: 10px 14px; font-size: 14px; font-family: inherit;
      outline: none; resize: none; max-height: 80px;
    }
    .chat-input:focus { border-color: #1a1a2e; }
    .chat-send {
      width: 40px; height: 40px; border-radius: 12px; border: none;
      background: #1a1a2e; color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s; flex-shrink: 0;
    }
    .chat-send:hover { background: #0f3460; }
    .chat-send:disabled { opacity: 0.4; cursor: default; }

    @media (max-width: 480px) {
      .chat-panel { width: calc(100vw - 24px); right: 12px; bottom: 88px; }
    }
  `;
  document.head.appendChild(style);

  // ===== HTML =====
  const fab = document.createElement('button');
  fab.className = 'chat-fab';
  fab.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- body -->
    <ellipse cx="50" cy="58" rx="32" ry="30" fill="#fff"/>
    <!-- ears -->
    <ellipse cx="28" cy="28" rx="12" ry="16" fill="#fff" transform="rotate(-15 28 28)"/>
    <ellipse cx="28" cy="28" rx="7" ry="11" fill="#FFB6C1" transform="rotate(-15 28 28)"/>
    <ellipse cx="72" cy="28" rx="12" ry="16" fill="#fff" transform="rotate(15 72 28)"/>
    <ellipse cx="72" cy="28" rx="7" ry="11" fill="#FFB6C1" transform="rotate(15 72 28)"/>
    <!-- face -->
    <circle cx="50" cy="55" r="26" fill="#fff"/>
    <!-- eyes -->
    <ellipse cx="40" cy="52" rx="5" ry="5.5" fill="#2D2D2D"/>
    <ellipse cx="60" cy="52" rx="5" ry="5.5" fill="#2D2D2D"/>
    <circle cx="38" cy="50" r="2" fill="#fff"/>
    <circle cx="58" cy="50" r="2" fill="#fff"/>
    <!-- blush -->
    <ellipse cx="32" cy="60" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
    <ellipse cx="68" cy="60" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
    <!-- mouth -->
    <path d="M46 63 Q50 67 54 63" stroke="#2D2D2D" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- nose -->
    <ellipse cx="50" cy="58" rx="2" ry="1.5" fill="#FFB6C1"/>
  </svg><span class="close-x">✕</span>`;
  fab.title = 'Trip Assistant';
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.innerHTML = `
    <div class="chat-header">
      <h3>Trip Assistant</h3>
      <p>Ask anything about your Japan trip</p>
    </div>
    <div class="chat-messages" id="chat-messages">
      <div class="chat-msg assistant">Hi! I'm your Japan trip assistant. Ask me anything — restaurants near your hotels, how to get between cities, what to pack, budget tips, or activity ideas for any day of your trip.</div>
    </div>
    <div class="chat-input-row" id="chat-input-row">
      <textarea class="chat-input" id="chat-input" placeholder="Ask about your trip..." rows="1"></textarea>
      <button class="chat-send" id="chat-send">▶</button>
    </div>
  `;
  document.body.appendChild(panel);

  // ===== CONFIG =====
  // Replace with your Supabase Edge Function URL after deploying
  const CHAT_ENDPOINT = 'https://mpofqqwlcvqwgbuyxfpl.supabase.co/functions/v1/chat';

  // ===== STATE =====
  let messages = [];
  let isOpen = false;
  let isSending = false;

  const messagesEl = document.getElementById('chat-messages');
  const inputEl = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  // ===== TOGGLE =====
  fab.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    fab.classList.toggle('open', isOpen);
    if (isOpen) inputEl.focus();
  });

  // ===== MESSAGING =====
  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    // Simple markdown: **bold**, paragraphs
    const html = text
      .split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    div.innerHTML = html;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isSending) return;

    isSending = true;
    sendBtn.disabled = true;
    inputEl.value = '';
    inputEl.style.height = 'auto';

    addMessage('user', text);
    messages.push({ role: 'user', content: text });

    const typingDiv = addMessage('assistant', 'Thinking...');
    typingDiv.classList.add('typing');

    try {
      const resp = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: TRIP_CONTEXT,
          messages: messages.slice(-10)
        })
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error?.message || `API error ${resp.status}`);
      }

      const data = await resp.json();
      const reply = data.content[0].text;

      typingDiv.remove();
      addMessage('assistant', reply);
      messages.push({ role: 'assistant', content: reply });

    } catch (e) {
      typingDiv.remove();
      addMessage('assistant', `Sorry, something went wrong: ${e.message}\n\nIf your API key is incorrect, refresh the page and try again.`);
    }

    isSending = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + 'px';
  });

})();
