import type { Topic } from './types'
import { Formula, Story, Tex } from '../components/Lesson/Formula'
import { BigIdea, Owl, WordBox, Pic, Recipe, Grownup, TryIt } from '../components/Lesson/Kid'
import { SecantToTangent, SlopeTracer, CarSpeedometer, PowerRuleMachine, ChainGears } from '../components/viz/widgets1'
import { ImplicitCircle, UnitCircleTrig } from '../components/viz/widgets2'
import { StairsSlope, HillWalker, PowerJump } from '../components/viz/widgets3'

export const differential: Topic[] = [
  /* ───────────────────────── 1 ───────────────────────── */
  {
    id: 't1', n: 1, icon: '🌱', section: 'diff', si: 'කලනය යනු කුමක්ද?', en: 'What is Calculus?',
    steps: [
      {
        title: '🎬 නිමල්ගේ බයිසිකල් ගමන',
        body: (<>
          <Pic e="🚲💨🏁" />
          <p>නිමල් බයිසිකලයෙන් පාසලට යනවා. ඔහුට ප්‍රශ්න දෙකක් තියෙනවා:</p>
          <p>❓ <b>“දැන් මම කොච්චර වේගෙන්ද යන්නේ?”</b></p>
          <p>❓ <b>“මම මුළු ගමනම කොච්චර දුරක් ආවද?”</b></p>
          <BigIdea>මේ වගේ <b>වෙනස් වෙන දේවල්</b> ගැන ප්‍රශ්න වලට උත්තර දෙන ගණිතයට <b>කලනය (Calculus)</b> කියනවා.</BigIdea>
        </>),
      },
      {
        title: '🦸 කලනයේ සුපිරි බලවේග දෙක',
        body: (<>
          <div className="row" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ flex: '1 1 240px', margin: 0 }}>
              <Pic e="🔍" caption="විශාලන කණ්ණාඩිය" />
              <p>එක <b>මොහොතක්</b> ළඟින් බලලා “දැන් කොච්චර වේගෙන් වෙනස් වෙනවද?” කියලා හොයනවා.</p>
            </div>
            <div className="card" style={{ flex: '1 1 240px', margin: 0 }}>
              <Pic e="🧺" caption="එකතු කරන කූඩය" />
              <p>පොඩි පොඩි කෑලි <b>ඔක්කොම එකතු කරලා</b> “මුළු ගණන කීයද?” කියලා හොයනවා.</p>
            </div>
          </div>
          <WordBox simple="🔍 එක මොහොතක වේගය හොයන එක" maths="අවකලනය" en="Differentiation" />
          <WordBox simple="🧺 කෑලි එකතු කරලා මුළු එක හොයන එක" maths="අනුකලනය" en="Integration" />
          <TryIt q="ඔයාගේ උස අවුරුද්දකට කොච්චර වැඩි වෙනවද කියලා හොයන්න ඕනේ. මොන බලයද?" options={['🔍 අවකලනය', '🧺 අනුකලනය']} answer={0} why="“කොච්චර වේගෙන් වෙනස් වෙනවද” = 🔍 අවකලනය." />
          <TryIt q="කැටයට දවසින් දවස දාපු සල්ලි ඔක්කොම කීයද කියලා හොයන්න ඕනේ. මොන බලයද?" options={['🔍 අවකලනය', '🧺 අනුකලනය']} answer={1} why="“ඔක්කොම එකතු කරලා මුළු ගණන” = 🧺 අනුකලනය." />
        </>),
      },
      {
        title: '🌍 කලනය හැම තැනම!',
        body: (<>
          <div className="map">
            <div className="card"><Pic e="🎮" /><p>Game එකේ චරිතය කොච්චර වේගෙන් දුවනවද</p></div>
            <div className="card"><Pic e="🔋" /><p>Phone එක කොච්චර ඉක්මනට charge වෙනවද</p></div>
            <div className="card"><Pic e="🌱" /><p>ගහක් දවසකට කොච්චර ලොකු වෙනවද</p></div>
            <div className="card"><Pic e="🌡️" /><p>තේ එක කොච්චර ඉක්මනට නිවෙනවද</p></div>
            <div className="card"><Pic e="🤖" /><p>AI (ChatGPT වගේ) ඉගෙන ගන්නේත් කලනයෙන්!</p></div>
            <div className="card"><Pic e="🚀" /><p>රොකට් එකක් යන පාර ගණනය කරන්න</p></div>
          </div>
          <Owl>ඔයා Computer Science ඉගෙන ගන්න නිසා මේක ගොඩක් වැදගත්. පරිගණක “ඉගෙන ගන්න” කලනය පාවිච්චි කරනවා! 💻</Owl>
        </>),
      },
      {
        title: '🚗 කාර් එක සහ ප්‍රස්තාරය',
        body: (<>
          <p>▶ බටන් එක ඔබන්න. කාර් එක යද්දී ප්‍රස්තාරය බලන්න.</p>
          <CarSpeedometer />
          <Owl>ප්‍රස්තාරය <b>බෑවුම් වැඩි</b> තැන = කාර් එක <b>වේගෙන්</b> යනවා. ප්‍රස්තාරය <b>සමතලා</b> තැන = කාර් එක <b>හෙමින්</b>. මේ “බෑවුම” තමයි අපේ ඊළඟ පාඩම! ⛰️</Owl>
        </>),
      },
      {
        title: '🍎 මේක හොයාගත්තේ කවුද?',
        body: (<>
          <div className="row" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ flex: '1 1 240px', margin: 0 }}>
              <Pic e="🍎👨‍🔬" caption="අයිසැක් නිව්ටන් (1665)" />
              <p>ග්‍රහලෝක අහසේ යන හැටි තේරුම් ගන්න කලනය හැදුවා.</p>
            </div>
            <div className="card" style={{ flex: '1 1 240px', margin: 0 }}>
              <Pic e="✍️👨‍🏫" caption="ලයිබ්නිට්ස් (1675)" />
              <p>අපි අද ලියන <Tex t="dx" /> සහ <Tex t="\int" /> වගේ ලකුණු හැදුවා.</p>
            </div>
          </div>
          <Owl>දෙන්නාම වෙන වෙනම, එකම දේ හොයාගත්තා! 🤯</Owl>
        </>),
      },
    ],
    remember: ['කලනය = වෙනස් වෙන දේවල් ගැන ගණිතය.', '🔍 අවකලනය (Differentiation) = එක මොහොතක වේගය.', '🧺 අනුකලනය (Integration) = ඔක්කොම එකතු කරලා මුළු ගණන.', 'ප්‍රස්තාරය බෑවුම් වැඩි නම් = වේගය වැඩියි.'],
    mistakes: ['අවකලනය සහ අනුකලනය පටලවා ගැනීම. මතක තියාගන්න: 🔍 = වේගය, 🧺 = මුළු එකතුව.'],
    quiz: [
      { q: 'කලනයේ සුපිරි බලවේග දෙක මොනවාද?', options: ['අවකලනය 🔍 සහ අනුකලනය 🧺', 'එකතු කිරීම සහ අඩු කිරීම', 'ගුණ කිරීම සහ බෙදීම'], answer: 0, why: 'කලනයේ කොටස් දෙක: අවකලනය (Differentiation) සහ අනුකලනය (Integration).' },
      { q: 'කාර් එකක් “දැන් කොච්චර වේගෙන්ද” කියලා හොයන්නේ මොකෙන්ද?', options: ['🔍 අවකලනය', '🧺 අනුකලනය', 'වගු ගණන්'], answer: 0, why: 'එක මොහොතක වේගය = 🔍 අවකලනය.' },
      { q: 'ගමනේ මුළු දුර එකතු කරලා හොයන්නේ මොකෙන්ද?', options: ['🔍 අවකලනය', '🧺 අනුකලනය', 'ප්‍රතිශත'], answer: 1, why: 'කෑලි එකතු කරලා මුළු එක = 🧺 අනුකලනය.' },
      { q: 'dx සහ ∫ ලකුණු හැදුවේ කවුද?', options: ['නිව්ටන්', 'ලයිබ්නිට්ස්', 'ඇයින්ස්ටයින්'], answer: 1, why: 'ලයිබ්නිට්ස් (1675) මේ ලකුණු හැදුවා.' },
      { q: 'AI එකක් ඉගෙන ගන්න පාවිච්චි කරන්නේ?', options: ['කලනය (gradient)', 'චිත්‍ර ඇඳීම', 'සංගීතය'], answer: 0, why: 'AI ඉගෙන ගන්නේ “gradient” කියන අවකලන ක්‍රමයෙන්.' },
      { q: 'දුර ප්‍රස්තාරය හරිම බෑවුම් නම්, කාර් එක යන්නේ?', options: ['ගොඩක් වේගෙන් 🏎️', 'හෙමින් 🐢', 'නවත්තලා'], answer: 0, why: 'බෑවුම වැඩි = වේගය වැඩි.' },
    ],
  },

  /* ───────────────────────── 2 ───────────────────────── */
  {
    id: 't2', n: 2, icon: '⛰️', section: 'diff', si: 'බෑවුම සහ ව්‍යුත්පන්නය', en: 'Slope & Definition of Derivative',
    steps: [
      {
        title: '🪜 පඩිපෙළක් නගිමු',
        body: (<>
          <p>සමහර පඩිපෙළවල් නගින්න ලේසියි. සමහර ඒවා හරිම අමාරුයි! ඒ “කොච්චර අමාරුද” කියන එක අංකයකින් කියන්න පුළුවන්.</p>
          <BigIdea><b>බෑවුම (Slope)</b> = <span className="hl1">උඩට කොච්චර</span> ÷ <span className="hl2">ඉදිරියට කොච්චර</span></BigIdea>
          <StairsSlope />
          <TryIt q="එක පඩියක් උඩට 3යි, ඉදිරියට 3යි. බෑවුම කීයද?" options={['1', '3', '6']} answer={0} why="3 ÷ 3 = 1." />
          <TryIt q="උඩට 0යි (උස නෑ). බෑවුම කීයද?" options={['0', '1', 'ගොඩක්']} answer={0} why="0 ÷ ඕනෑම දෙයක් = 0. ඒ කියන්නේ සමතලා පාරක්! 🛣️" />
        </>),
      },
      {
        title: '⛰️ වංගු කන්දක බෑවුම',
        body: (<>
          <p>පඩිපෙළේ හැම තැනම බෑවුම සමානයි. ඒත් ඇත්ත කන්දක? 🤔 ඇවිදලා බලන්න 👇</p>
          <HillWalker />
          <Owl>කන්දේ <b>හැම තැනකම බෑවුම වෙනස්</b>! ඉතින් අපිට ඕනේ <b>එක තැනක</b> බෑවුම හොයන්න. ඒ කොහොමද? ඊළඟ පියවරේ බලමු.</Owl>
        </>),
      },
      {
        title: '🔍 ලකුණු දෙක ළං කරමු',
        body: (<>
          <p>උපක්‍රමය: කන්දේ <span className="hl3">කොළ ලකුණ</span> සහ <span style={{ color: '#f59e0b', fontWeight: 800 }}>කහ ලකුණ</span> අතර බෑවුම හොයනවා. ඊට පස්සේ කහ ලකුණ <b>ළං කරනවා, ළං කරනවා...</b></p>
          <p>පහළ <b>h</b> slider එක වමට (කුඩා අගයට) ඇදලා බලන්න 👇</p>
          <SecantToTangent />
          <Owl>ලකුණු දෙක හරිම ළං වුණාම, රතු රේඛාව කන්දේ <b>එක තැනක්</b> විතරක් අල්ලනවා. ඒ රේඛාවේ බෑවුම = ඒ තැනේ බෑවුම! 🎯</Owl>
          <WordBox simple="එක තැනක බෑවුම" maths="ව්‍යුත්පන්නය" en="Derivative  —  f′(x)" />
        </>),
      },
      {
        title: '🕵️ රහස් රටාවක්: y = x²',
        body: (<>
          <p>y = x² වක්‍රයේ තැන් කීපයක බෑවුම මැන්නොත් මෙහෙමයි:</p>
          <table className="t"><thead><tr><th>x (තැන)</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
            <tr><td>බෑවුම</td><td>2</td><td>4</td><td>6</td><td>8</td></tr>
          </tbody></table>
          <BigIdea>රටාව පේනවද? බෑවුම හැම වෙලාවෙම <b>x වගේ දෙගුණයක්</b>! ඒ නිසා x² හි බෑවුම = <b>2x</b></BigIdea>
          <TryIt q="y = x² හි x = 5 තැන බෑවුම කීයද?" options={['5', '10', '25']} answer={1} why="2 × 5 = 10." />
          <Grownup>
            <p>විභාගයේදී ලියන “නිර්වචනය” (definition):</p>
            <Formula tex="f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}" say="x හි සිට පුංචි h දුරක් ගිහින් බෑවුම හොයලා, h බිංදුවට ළං කරනවා." />
            <Formula tex="\frac{(x+h)^2-x^2}{h}=\frac{2xh+h^2}{h}=2x+h\;\to\;2x" />
          </Grownup>
        </>),
      },
      {
        title: '🕵️ තවත් රටාවක්: y = x³',
        body: (<>
          <table className="t"><thead><tr><th>x</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody>
            <tr><td>බෑවුම</td><td>3</td><td>12</td><td>27</td></tr>
          </tbody></table>
          <p>මේක <b>3 × x × x</b> = <b>3x²</b>. (x = 2 ⟹ 3 × 2 × 2 = 12 ✔)</p>
          <Owl>x² → 2x, x³ → 3x²... රටාවක් පේනවද? 🔮 ඊළඟ පාඩමේ මේක කෙටි ක්‍රමයක් කරමු!</Owl>
          <Grownup>
            <Formula tex="\frac{(x+h)^3-x^3}{h}=3x^2+3xh+h^2\;\to\;3x^2" />
          </Grownup>
        </>),
      },
    ],
    remember: ['බෑවුම = උඩට ÷ ඉදිරියට.', 'වංගු වක්‍රයක හැම තැනම බෑවුම වෙනස්.', 'එක තැනක බෑවුම = ව්‍යුත්පන්නය (Derivative).', 'x² → 2x,  x³ → 3x².', 'විභාගයට: f′(x) = lim (f(x+h) − f(x)) / h.'],
    mistakes: ['බෑවුම = ඉදිරියට ÷ උඩට කියලා පෙරළලා ගැනීම. (හරි: උඩට ÷ ඉදිරියට)', '(x+h)² = x² + h² කියලා ලිවීම. (හරි: x² + 2xh + h²)'],
    quiz: [
      { q: 'පඩියක් උඩට 4යි, ඉදිරියට 2යි. බෑවුම කීයද?', answer: 2, why: 'උඩට ÷ ඉදිරියට = 4 ÷ 2 = 2.' },
      { q: '“ව්‍යුත්පන්නය” කියන්නේ සරලව?', options: ['එක තැනක බෑවුම', 'වක්‍රය යට ඉඩ', 'වක්‍රයේ දිග'], answer: 0, why: 'ව්‍යුත්පන්නය = එක තැනක බෑවුම (ස්පර්ශකයේ බෑවුම).' },
      { q: 'y = x² හි බෑවුම මොකක්ද?', options: ['x', '2x', 'x²'], answer: 1, why: 'රටාව: 1→2, 2→4, 3→6. ඒ කියන්නේ 2x.' },
      { q: 'y = x² හි x = 3 තැන බෑවුම කීයද?', answer: 6, why: '2 × 3 = 6.' },
      { q: 'y = x³ හි x = 2 තැන බෑවුම කීයද?', answer: 12, why: '3x² = 3 × 2 × 2 = 12.' },
      { q: 'ලකුණු දෙක ළං කරන්නේ ඇයි?', options: ['එක තැනක බෑවුම හොයන්න', 'ප්‍රස්තාරය ලස්සන කරන්න', 'වර්ගඵලය හොයන්න'], answer: 0, why: 'ලකුණු දෙක හරිම ළං වුණාම එක තැනක බෑවුම ලැබෙනවා.' },
      { q: 'සමතලා පාරක බෑවුම කීයද?', answer: 0, why: 'උඩට 0 නිසා බෑවුම 0.' },
      { q: 'y = x³ හි බෑවුම මොකක්ද?', options: ['3x²', 'x²', '3x'], answer: 0, why: 'රටාව: x³ → 3x².' },
    ],
  },

  /* ───────────────────────── 3 ───────────────────────── */
  {
    id: 't3', n: 3, icon: '⚙️', section: 'diff', si: 'අවකලන කෙටි ක්‍රම', en: 'Differentiation Rules',
    steps: [
      {
        title: '🛣️ නීතිය 1: තනි අංකය → 0',
        body: (<>
          <Owl>හැම වෙලාවෙම අර දිග ක්‍රමය කරන්න බෑ. 😩 ඉතින් <b>කෙටි ක්‍රම (shortcuts)</b> 4ක් ඉගෙන ගමු!</Owl>
          <Pic e="🛣️" caption="y = 7 කියන්නේ සමතලා පාරක්" />
          <p>තනි අංකයක් (7, 100, 3...) <b>කවදාවත් වෙනස් වෙන්නේ නෑ</b>. වෙනස් නොවෙන දෙයක වේගය = <b>0</b>.</p>
          <BigIdea>තනි අංකයක් → <b>0</b></BigIdea>
          <TryIt q="y = 7 නම් බෑවුම?" options={['0', '7', '1']} answer={0} why="තනි අංකයක් → 0. 🛣️" />
        </>),
      },
      {
        title: '🦘 නීතිය 2: බලය පනිනවා!',
        body: (<>
          <p>x³ වල උඩ තියෙන පොඩි <b>3</b> කැංගරුවෙක් වගේ. ඌ <b>ඉස්සරහට පනිනවා</b>. ඊට පස්සේ උඩ අංකය <b>එකකින් අඩු</b> වෙනවා.</p>
          <PowerJump />
          <Recipe steps={[<>උඩ අංකය <span className="hl1">ඉස්සරහට</span> ගේන්න 🦘</>, <>උඩ අංකයෙන් <span className="hl3">1ක් අඩු</span> කරන්න ➖</>, <>ඉවරයි! 🎉</>]} />
          <TryIt q="x⁴ → ?" options={['4x³', 'x³', '4x⁴']} answer={0} why="4 ඉස්සරහට, 4 − 1 = 3 ⟹ 4x³." />
          <TryIt q="x² → ?" options={['2x', 'x²', '2']} answer={0} why="2 ඉස්සරහට, 2 − 1 = 1 ⟹ 2x¹ = 2x." />
        </>),
      },
      {
        title: '✖️ නීතිය 3: ඉස්සරහ අංකය ගුණ වෙනවා',
        body: (<>
          <p>5x³ වගේ ඉස්සරහින් අංකයක් තියෙනවා නම්, පනින කැංගරුවා ඒ අංකයත් එක්ක <b>ගුණ වෙනවා</b>.</p>
          <p style={{ fontSize: '1.3em', textAlign: 'center' }}>5x³ → <span className="hl1">5 × 3</span> x² = <b>15x²</b></p>
          <PowerRuleMachine />
          <TryIt q="2x³ → ?" options={['6x²', '2x²', '6x³']} answer={0} why="2 × 3 = 6, බලය 3 − 1 = 2 ⟹ 6x²." />
        </>),
      },
      {
        title: '🧸 නීතිය 4: කෑලි වෙන වෙනම',
        body: (<>
          <p>සෙල්ලම් බඩු පෙට්ටි වලට වෙන් කරනවා වගේ, <b>+</b> සහ <b>−</b> වලින් වෙන් වෙලා තියෙන හැම කෑල්ලක්ම <b>වෙන වෙනම</b> කරන්න.</p>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t="y = 3x^2 + 5x - 7" /></p>
          <Recipe steps={[<>3x² → 3 × 2 = <b>6x</b></>, <>5x → <b>5</b> (x¹ → 1 × x⁰ = 1)</>, <>−7 → <b>0</b> (තනි අංකය!)</>, <>එකතු කරන්න: <b>6x + 5</b> 🎉</>]} />
          <Story emoji="🛒">කඩේ x ගණනක් බඩු ගන්නවා. බඩු එකක් වැඩි වෙද්දී මුදල කොච්චර ඉක්මනට වැඩි වෙනවද කියන්නේ 6x + 5 !</Story>
          <TryIt q="x² + 4x → ?" options={['2x + 4', '2x + 4x', 'x + 4']} answer={0} why="x² → 2x, 4x → 4. ⟹ 2x + 4." />
          <Grownup>
            <table className="t"><tbody>
              <tr><td>Constant rule</td><td><Tex t="\frac{d}{dx}(c)=0" /></td></tr>
              <tr><td>Power rule</td><td><Tex t="\frac{d}{dx}x^n=nx^{n-1}" /></td></tr>
              <tr><td>Constant multiple</td><td><Tex t="(cf)'=c f'" /></td></tr>
              <tr><td>Sum / Difference</td><td><Tex t="(f\pm g)'=f'\pm g'" /></td></tr>
            </tbody></table>
          </Grownup>
        </>),
      },
    ],
    remember: ['තනි අංකය → 0 🛣️', 'බලය ඉස්සරහට පනිනවා, උඩින් 1ක් අඩු වෙනවා 🦘 (xⁿ → n·xⁿ⁻¹)', 'ඉස්සරහ අංකය ගුණ වෙනවා ✖️', '+ / − කෑලි වෙන වෙනම 🧸'],
    mistakes: ['−7 වගේ තනි අංකය එහෙමම තියන එක. ❌ එය 0 වෙනවා.', 'බලයෙන් 1 අඩු කරන්න අමතක වෙන එක: x³ → 3x³ ❌  (හරි: 3x²)'],
    quiz: [
      { q: 'y = 7 නම් බෑවුම (d/dx) කීයද?', answer: 0, why: 'තනි අංකය → 0.' },
      { q: 'x⁵ → ?', options: ['5x⁴', 'x⁴', '5x⁵'], answer: 0, why: '5 ඉස්සරහට, 5 − 1 = 4.' },
      { q: '4x³ → ?', options: ['12x²', '4x²', '12x³'], answer: 0, why: '4 × 3 = 12, බලය 2.' },
      { q: 'x² + 3x → ?', options: ['2x + 3', 'x + 3', '2x + 3x'], answer: 0, why: 'x² → 2x, 3x → 3.' },
      { q: 'y = 3x² + 5x නම් x = 2 දී බෑවුම කීයද?', answer: 17, why: 'y′ = 6x + 5 ⟹ 6 × 2 + 5 = 17.' },
      { q: 'x⁴ − x² → ?', options: ['4x³ − 2x', '4x³ − x', 'x³ − x'], answer: 0, why: 'x⁴ → 4x³, x² → 2x.' },
      { q: '5x → ? (අංකයක් ලියන්න)', answer: 5, why: '5x = 5x¹ ⟹ 5 × 1 × x⁰ = 5.' },
      { q: 'y = x¹⁰ නම් x = 1 දී බෑවුම කීයද?', answer: 10, why: '10x⁹ ⟹ 10 × 1 = 10.' },
    ],
  },

  /* ───────────────────────── 4 ───────────────────────── */
  {
    id: 't4', n: 4, icon: '🌊', section: 'diff', si: 'තරංග ශ්‍රිත (sin, cos)', en: 'Trigonometric Derivatives',
    steps: [
      {
        title: '🎡 රෝද පැද්දිල්ල',
        body: (<>
          <p>Ferris wheel (රෝද පැද්දිල්ල) එකක ඉඳගෙන කරකැවෙනවා කියලා හිතන්න. ඔයා <b>උඩට යනවා, පහළට එනවා, ආයෙත් උඩට...</b></p>
          <WordBox simple="ඔයා කොච්චර උසින්ද (උඩ-පහළ)" maths="sin" en="sine" />
          <WordBox simple="ඔයා කොච්චර වමට/දකුණට ද" maths="cos" en="cosine" />
          <p>▶ කරකවලා බලන්න — රතු <b>sin</b> තරංගය සහ තැඹිලි <b>cos</b> තරංගය හැදෙනවා! 🌊</p>
          <UnitCircleTrig />
        </>),
      },
      {
        title: '🌊 තරංගයේ බෑවුම = තවත් තරංගයක්!',
        body: (<>
          <p>sin තරංගයේ උඩට යන තැන බෑවුම <b>+</b>. මුදුනේ බෑවුම <b>0</b>. පහළට යන තැන <b>−</b>.</p>
          <p>▶ ඔබලා බලන්න: බෑවුම් එකින් එක ඇඳගෙන යද්දී <b>cos</b> තරංගයම හැදෙනවා!</p>
          <SlopeTracer />
          <BigIdea><b>sin</b> හි බෑවුම = <b>cos</b> 🤯</BigIdea>
          <TryIt q="sin තරංගයේ උඩම මුදුනේ බෑවුම?" options={['0', '1', '−1']} answer={0} why="මුදුනේ සමතලයි — බෑවුම 0." />
        </>),
      },
      {
        title: '📋 කෙටි ලැයිස්තුව',
        body: (<>
          <table className="t"><thead><tr><th>ශ්‍රිතය</th><th>බෑවුම (ව්‍යුත්පන්නය)</th></tr></thead><tbody>
            <tr><td>sin x</td><td>cos x</td></tr>
            <tr><td><b>co</b>s x</td><td><span className="hl1">−</span> sin x</td></tr>
            <tr><td>tan x</td><td>sec² x</td></tr>
            <tr><td><b>co</b>t x</td><td><span className="hl1">−</span> csc² x</td></tr>
            <tr><td>sec x</td><td>sec x tan x</td></tr>
            <tr><td><b>c</b>s<b>c</b> x (cosec)</td><td><span className="hl1">−</span> csc x cot x</td></tr>
          </tbody></table>
          <Owl>💡 මතක තියාගන්න උපක්‍රමය: <b>“co”</b> වලින් පටන් ගන්න අය (cos, cot, cosec) <b>හැමෝටම − (අඩු) ලකුණක්</b>! 😜</Owl>
          <TryIt q="cos x → ?" options={['−sin x', 'sin x', 'cos x']} answer={0} why="“co” නිසා − ලකුණ: −sin x." />
          <TryIt q="tan x → ?" options={['sec² x', 'sec x', '−sec² x']} answer={0} why="tan x → sec² x (“co” නෑ, ඒ නිසා − නෑ)." />
        </>),
      },
      {
        title: '🧩 එකට කරමු',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t="y = 2\sin x + 3\cos x" /></p>
          <Recipe steps={[<>2 sin x → 2 cos x</>, <>3 cos x → 3 × (−sin x) = −3 sin x</>, <>එකතුව: <b>2 cos x − 3 sin x</b> 🎉</>]} />
          <TryIt q="5 sin x → ?" options={['5 cos x', 'cos x', '−5 cos x']} answer={0} why="ඉස්සරහ අංකය 5 එහෙමම, sin → cos." />
        </>),
      },
    ],
    remember: ['sin → cos', 'cos → −sin', 'tan → sec²', '“co” අයට − ලකුණ: cos, cot, csc.', 'sec → sec·tan,  csc → −csc·cot'],
    mistakes: ['cos x → +sin x ❌ (හරි: −sin x)', 'tan x → sec x ❌ (හරි: sec² x)'],
    quiz: [
      { q: 'sin x → ?', options: ['cos x', '−cos x', '−sin x'], answer: 0, why: 'sin හි බෑවුම = cos.' },
      { q: 'cos x → ?', options: ['sin x', '−sin x', 'cos x'], answer: 1, why: '“co” නිසා − : −sin x.' },
      { q: 'tan x → ?', options: ['sec x', 'sec² x', 'cot x'], answer: 1, why: 'tan x → sec² x.' },
      { q: 'sec x → ?', options: ['sec x tan x', 'sec² x', '−sec x tan x'], answer: 0, why: 'sec x → sec x · tan x.' },
      { q: 'csc x → ?', options: ['csc x cot x', '−csc x cot x', '−csc² x'], answer: 1, why: '“co” නිසා − ලකුණ.' },
      { q: 'y = sin x හි x = 0 තැන බෑවුම කීයද?', answer: 1, why: 'cos 0 = 1.' },
      { q: '2 sin x + 3 cos x → ?', options: ['2cos x − 3sin x', '2cos x + 3sin x', '−2cos x − 3sin x'], answer: 0, why: '2 cos x + 3(−sin x).' },
      { q: 'cot x → ?', options: ['sec² x', '−csc² x', 'csc² x'], answer: 1, why: '“co” නිසා − : −csc² x.' },
    ],
  },

  /* ───────────────────────── 5 ───────────────────────── */
  {
    id: 't5', n: 5, icon: '🙈', section: 'diff', si: 'සැඟවුණු y (ව්‍යංග්‍ය අවකලනය)', en: 'Implicit Differentiation',
    steps: [
      {
        title: '🙈 y හැංගිලා!',
        body: (<>
          <p>සාමාන්‍යයෙන් අපිට ලැබෙන්නේ <b>y = …</b> කියලා. ඒත් සමහර වෙලාවට y, x එක්ක <b>පටලැවිලා හැංගිලා</b> ඉන්නවා:</p>
          <p style={{ textAlign: 'center', fontSize: '1.3em' }}><Tex t="x^2 + y^2 = 25" /></p>
          <Pic e="🛞" caption="මේක බයිසිකල් රෝදයක් වගේ රවුමක්!" />
          <WordBox simple="හැංගිච්ච y තියෙද්දී බෑවුම හොයන එක" maths="ව්‍යංග්‍ය අවකලනය" en="Implicit Differentiation" />
        </>),
      },
      {
        title: '🏷️ එකම එක නීතිය: y ට ස්ටිකරයක්',
        body: (<>
          <BigIdea>y තියෙන කෑල්ලක් අවකලනය කළාම, ඒකට <b>🏷️ dy/dx</b> ස්ටිකරයක් අලවන්න!</BigIdea>
          <table className="t"><tbody>
            <tr><td>x²</td><td>→</td><td>2x</td><td>(සාමාන්‍ය විදිහට)</td></tr>
            <tr><td>y²</td><td>→</td><td>2y <span className="hl1">🏷️ dy/dx</span></td><td>(ස්ටිකරය!)</td></tr>
            <tr><td>y³</td><td>→</td><td>3y² <span className="hl1">🏷️ dy/dx</span></td><td></td></tr>
          </tbody></table>
          <Owl>dy/dx කියන්නේ අපි හොයන <b>බෑවුම</b>ම තමයි. y හැංගිලා ඉන්න නිසා ඒක ස්ටිකරයක් විදිහට එනවා. 😉</Owl>
          <TryIt q="y² → ?" options={['2y · dy/dx', '2y', 'y']} answer={0} why="y කෑල්ලක් නිසා 🏷️ dy/dx අලවන්න ඕනේ." />
        </>),
      },
      {
        title: '🛞 රෝදයේ බෑවුම හොයමු',
        body: (<>
          <p style={{ textAlign: 'center' }}><Tex t="x^2 + y^2 = 25" /></p>
          <Recipe steps={[
            <>හැම කෑල්ලක්ම අවකලනය කරන්න: <Tex t="2x + 2y\frac{dy}{dx} = 0" /> (25 තනි අංකය → 0)</>,
            <>dy/dx තනියම එක පැත්තකට ගන්න: <Tex t="\frac{dy}{dx} = -\frac{x}{y}" /></>,
            <>තැන (3, 4) නම්: −3 ÷ 4 = <b>−0.75</b> 🎉</>,
          ]} />
          <p>රවුම වටේ ලකුණ කරකවලා බෑවුම වෙනස් වෙන හැටි බලන්න 👇</p>
          <ImplicitCircle />
        </>),
      },
      {
        title: '🪜 ඇත්ත ලෝකයේ: ලිස්සන ඉණිමග',
        body: (<>
          <Story emoji="🪜">බිත්තියකට හේත්තු කරපු ඉණිමගක පහළ කොන ඉවතට අදිනකොට, උඩ කොන පහළට ලිස්සනවා. ඉණිමගේ දිග වෙනස් වෙන්නේ නෑ (x² + y² = දිග²). ඉතින් එක කොනක වේගය අනිත් කොනේ වේගයට බැඳිලා! ඒක හොයන්නේ මේ ක්‍රමයෙන්.</Story>
          <TryIt q="x + y = 10 නම් dy/dx?" options={['−1', '1', '10']} answer={0} why="1 + dy/dx = 0 ⟹ dy/dx = −1." />
          <Grownup>
            <p>xy = 1 වගේ ගුණ කිරීමක් නම් <b>ගුණිත නීතිය (product rule)</b>:</p>
            <Formula tex="y + x\frac{dy}{dx} = 0\;\Rightarrow\;\frac{dy}{dx} = -\frac{y}{x}" />
          </Grownup>
        </>),
      },
    ],
    remember: ['y කෑල්ලකට 🏷️ dy/dx ස්ටිකරය අලවන්න.', 'පියවර: (1) හැම කෑල්ලම අවකලනය → (2) dy/dx තනි කරන්න.', 'x² + y² = r²  ⟹  dy/dx = −x/y.'],
    mistakes: ['y² → 2y කියලා ස්ටිකරය අමතක කිරීම ❌ (හරි: 2y·dy/dx)', 'dy/dx තනි නොකර නවත්වන එක.'],
    quiz: [
      { q: 'x² + y² = 25 හි dy/dx = ?', options: ['−x/y', 'x/y', '−y/x'], answer: 0, why: '2x + 2y·dy/dx = 0 ⟹ dy/dx = −x/y.' },
      { q: 'y² → ?', options: ['2y', '2y · dy/dx', 'y'], answer: 1, why: 'y කෑල්ලකට 🏷️ dy/dx ස්ටිකරය.' },
      { q: 'x² + y² = 25 හි (3, 4) තැන බෑවුම කීයද?', answer: -0.75, why: '−3 ÷ 4 = −0.75.' },
      { q: 'y³ → ?', options: ['3y²', '3y² · dy/dx', 'y³'], answer: 1, why: 'බලය පනිනවා + ස්ටිකරය.' },
      { q: 'xy = 1 හි dy/dx = ?', options: ['−y/x', 'y/x', '−x/y'], answer: 0, why: 'y + x·dy/dx = 0 ⟹ −y/x.' },
      { q: 'y → ?', options: ['1', 'dy/dx', '0'], answer: 1, why: 'y අවකලනය = dy/dx.' },
      { q: 'x² + y² = 25 හි (0, 5) තැන බෑවුම කීයද?', answer: 0, why: '−0 ÷ 5 = 0. රෝදයේ උඩම තැන සමතලයි!' },
      { q: 'x + y = 10 හි dy/dx කීයද?', answer: -1, why: '1 + dy/dx = 0 ⟹ −1.' },
    ],
  },

  /* ───────────────────────── 6 ───────────────────────── */
  {
    id: 't6', n: 6, icon: '🎁', section: 'diff', si: 'දාම නීතිය', en: 'Chain Rule',
    steps: [
      {
        title: '🎁 පෙට්ටියක් ඇතුළේ පෙට්ටියක්',
        body: (<>
          <Pic e="🎁➡️📦➡️🧸" />
          <p>සමහර ශ්‍රිත තෑගි පෙට්ටි වගේ — <b>ලොකු පෙට්ටියක් ඇතුළේ පොඩි පෙට්ටියක්</b>.</p>
          <p style={{ textAlign: 'center', fontSize: '1.3em' }}>(<span className="hl2">3x + 1</span>)<span className="hl1">²</span></p>
          <p><span className="hl1">පිටත පෙට්ටිය</span> = “² (වර්ග කිරීම)” &nbsp;|&nbsp; <span className="hl2">ඇතුළේ පෙට්ටිය</span> = “3x + 1”</p>
          <WordBox simple="පෙට්ටි ඇතුළේ පෙට්ටි ඇරීමේ ක්‍රමය" maths="දාම නීතිය" en="Chain Rule" />
        </>),
      },
      {
        title: '⚙️ ගියර් වගේ කරකැවෙනවා',
        body: (<>
          <p>ගියර් දෙකක් හිතන්න. පළමු ගියරය 2 ගුණයක් වේගෙන්. ඒක දෙවෙනි ගියරය තව 3 ගුණයක් වේගෙන් කරකවනවා. මුළු වේගය = <b>2 × 3 = 6</b>!</p>
          <ChainGears />
          <BigIdea>වේග දෙක <b>ගුණ</b> වෙනවා: <span className="hl1">පිටත වේගය</span> × <span className="hl2">ඇතුළේ වේගය</span></BigIdea>
        </>),
      },
      {
        title: '📦 පෙට්ටි ඇරීමේ පියවර',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}>(<span className="hl2">3x + 1</span>)<span className="hl1">²</span></p>
          <Recipe steps={[
            <><span className="hl1">පිටත පෙට්ටිය</span> අරින්න (ඇතුළ එහෙමම තියන්න): 2(<span className="hl2">3x+1</span>)</>,
            <><span className="hl2">ඇතුළේ පෙට්ටිය</span> අරින්න: 3x + 1 → <b>3</b></>,
            <>දෙක ගුණ කරන්න: 2(3x+1) × 3 = <b>6(3x+1)</b> 🎉</>,
          ]} />
          <TryIt q="(2x + 1)² → ?" options={['4(2x+1)', '2(2x+1)', '2x+1']} answer={0} why="පිටත: 2(2x+1). ඇතුළ: 2. ගුණ: 4(2x+1)." />
        </>),
      },
      {
        title: '🌊 තරංග පෙට්ටි',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}>sin(<span className="hl2">2x</span>)</p>
          <Recipe steps={[<>පිටත sin → cos(<span className="hl2">2x</span>)</>, <>ඇතුළේ 2x → <b>2</b></>, <>ගුණ කරන්න: <b>2 cos(2x)</b> 🎉</>]} />
          <TryIt q="sin(3x) → ?" options={['3 cos(3x)', 'cos(3x)', '3 sin(3x)']} answer={0} why="පිටත sin → cos(3x), ඇතුළ 3x → 3. ගුණ කරන්න." />
          <Grownup>
            <Formula tex="\frac{d}{dx}f(g(x)) = f'(g(x))\cdot g'(x)" />
            <table className="t"><tbody>
              <tr><td><Tex t="\cos(x^2)" /></td><td><Tex t="-2x\sin(x^2)" /></td></tr>
              <tr><td><Tex t="\sin^2 x" /></td><td><Tex t="2\sin x\cos x" /></td></tr>
              <tr><td><Tex t="(x^2+1)^5" /></td><td><Tex t="10x(x^2+1)^4" /></td></tr>
            </tbody></table>
          </Grownup>
        </>),
      },
    ],
    remember: ['🎁 පිටත පෙට්ටිය අරින්න (ඇතුළ එහෙමම).', '📦 ඇතුළේ පෙට්ටිය අරින්න.', '✖️ දෙක ගුණ කරන්න.', 'sin(g) → cos(g) × g′'],
    mistakes: ['ඇතුළේ පෙට්ටිය අරින්න අමතක වීම: (3x+1)² → 2(3x+1) ❌ (හරි: 6(3x+1))', 'පිටත අරිද්දී ඇතුළ වෙනස් කිරීම: sin(2x) → cos(x) ❌'],
    quiz: [
      { q: '(2x+1)³ → ?', options: ['6(2x+1)²', '3(2x+1)²', '2(2x+1)³'], answer: 0, why: 'පිටත: 3(2x+1)². ඇතුළ: 2. ගුණ: 6(2x+1)².' },
      { q: 'sin(2x) → ?', options: ['cos(2x)', '2cos(2x)', '−2cos(2x)'], answer: 1, why: 'cos(2x) × 2.' },
      { q: 'cos(x²) → ?', options: ['−2x sin(x²)', '2x cos(x²)', '−sin(x²)'], answer: 0, why: 'පිටත: −sin(x²). ඇතුළ: 2x.' },
      { q: 'y = (3x+1)² නම් x = 0 දී බෑවුම කීයද?', answer: 6, why: '6(3x+1) ⟹ 6 × 1 = 6.' },
      { q: '(x²+1)⁵ → ?', options: ['10x(x²+1)⁴', '5(x²+1)⁴', '5x(x²+1)⁴'], answer: 0, why: '5(x²+1)⁴ × 2x.' },
      { q: '(sin x)² → ?', options: ['2 sin x cos x', '2 cos x', 'sin x'], answer: 0, why: 'පිටත: 2 sin x. ඇතුළ: cos x.' },
      { q: 'y = sin(3x) නම් x = 0 දී බෑවුම කීයද?', answer: 3, why: '3 cos(0) = 3.' },
      { q: 'sin(x²) හි පිටත සහ ඇතුළේ පෙට්ටි?', options: ['පිටත sin, ඇතුළ x²', 'පිටත x², ඇතුළ sin', 'දෙකම sin'], answer: 0, why: 'x² තමයි sin ඇතුළේ.' },
    ],
  },
]
