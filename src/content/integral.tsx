import type { Topic } from './types'
import { Formula, Story, Tex } from '../components/Lesson/Formula'
import { BigIdea, Owl, WordBox, Pic, Recipe, Grownup, TryIt, Worked } from '../components/Lesson/Kid'
import { AntiderivativeFamily, RiemannArea, VelocityToDistance, PartialFractionSplit } from '../components/viz/widgets2'
import { BucketFill } from '../components/viz/widgets3'
import { CoinStack, IntegralMachine, AreaFinder, SplitArea, MemoryMatch } from '../components/viz/widgets4'

const STANDARD_PAIRS: [string, string][] = [
  ['\\int e^x\\,dx', 'e^x + C'],
  ['\\int \\cos x\\,dx', '\\sin x + C'],
  ['\\int \\sin x\\,dx', '-\\cos x + C'],
  ['\\int \\tfrac{1}{x}\\,dx', '\\ln|x| + C'],
  ['\\int \\sec^2 x\\,dx', '\\tan x + C'],
  ['\\int x^2\\,dx', '\\tfrac{x^3}{3} + C'],
]

export const integral: Topic[] = [
  /* ═════════════════════════ 7 ═════════════════════════ */
  {
    id: 't7', n: 7, icon: '⏪', section: 'int', si: 'අනුකලනය යනු කුමක්ද?', en: 'What is Integration?',
    steps: [
      {
        title: '🪙 කැටයට කාසි දාමු',
        body: (<>
          <p>සුනිල් හැමදාම කැටයට කාසි දානවා. <b>1 වෙනි දවසේ 1යි, 2 වෙනි දවසේ 2යි, 3 වෙනි දවසේ 3යි...</b> (හැමදාම එකක් වැඩියෙන්).</p>
          <p>ප්‍රශ්නය: <b>“දවස් කීපයකට පස්සේ කැටයේ මුළු කාසි කීයද?”</b> 🤔</p>
          <p>📅 slider එක ඇදලා බලන්න 👇</p>
          <CoinStack />
          <BigIdea>පොඩි පොඩි කෑලි <b>ඔක්කොම එකතු කරලා මුළු ගණන</b> හොයන එකට <b>අනුකලනය (Integration)</b> කියනවා. 🧺</BigIdea>
          <TryIt q="දවස් 4ක් ගියාම මුළු කාසි කීයද? (1 + 2 + 3 + 4)" options={['10', '4', '8']} answer={0} why="1 + 2 + 3 + 4 = 10 🪙." />
        </>),
      },
      {
        title: '🪣 බාල්දිය පුරවමු',
        body: (<>
          <p>දැන් කාසි වෙනුවට වතුර! කරාමයෙන් වතුර වැටෙන <b>වේගය</b> දන්නවා නම්, <b>මුළු වතුර</b> කොච්චරද? ▶ ඔබලා බලන්න.</p>
          <BucketFill />
          <table className="t"><thead><tr><th>අපි දන්නේ 👀</th><th>අපි හොයන්නේ 🎯</th></tr></thead><tbody>
            <tr><td>💧 වැටෙන වේගය</td><td>🪣 මුළු වතුර</td></tr>
            <tr><td>🪙 දවසකට කාසි</td><td>🏺 කැටයේ මුළු කාසි</td></tr>
            <tr><td>🚗 වේගය</td><td>📏 ගිය මුළු දුර</td></tr>
          </tbody></table>
          <Owl>වම් පැත්තේ = <b>“කොච්චර වේගෙන්ද”</b> (අවකලනය 🔍). දකුණු පැත්තේ = <b>“මුළු ගණන”</b> (අනුකලනය 🧺). ඒ දෙක ප්‍රතිවිරුද්ධයි!</Owl>
        </>),
      },
      {
        title: '⏪ වීඩියෝව පස්සට rewind',
        body: (<>
          <p>අවකලනය කියන්නේ වීඩියෝව <b>ඉස්සරහට ⏩</b>. අනුකලනය කියන්නේ ඒක <b>පස්සට ⏪</b>.</p>
          <table className="t"><thead><tr><th>මුල් එක</th><th>⏩ අවකලනය</th><th>⏪ අනුකලනය කළාම ආපහු</th></tr></thead><tbody>
            <tr><td>x²</td><td>2x</td><td>2x → <b>x²</b></td></tr>
            <tr><td>x³</td><td>3x²</td><td>3x² → <b>x³</b></td></tr>
            <tr><td>5x</td><td>5</td><td>5 → <b>5x</b></td></tr>
            <tr><td>sin x</td><td>cos x</td><td>cos x → <b>sin x</b></td></tr>
          </tbody></table>
          <Owl>🕵️ අනුකලනය කරද්දී අපි රහස් පරීක්ෂකයෙක් වගේ අහනවා: <b>“මොකක් අවකලනය කළාමද මේක ලැබුණේ?”</b></Owl>
          <TryIt q="මොකක් අවකලනය කළාමද 3x² ලැබෙන්නේ?" options={['x³', '6x', '3x³']} answer={0} why="x³ → 3x². ඒ නිසා පස්සට ගියාම x³." />
          <TryIt q="මොකක් අවකලනය කළාමද 5 ලැබෙන්නේ?" options={['5x', '5', '0']} answer={0} why="5x → 5. ඒ නිසා 5x." />
          <TryIt q="මොකක් අවකලනය කළාමද 4x³ ලැබෙන්නේ?" options={['x⁴', '12x²', '4x⁴']} answer={0} why="x⁴ → 4x³." />
        </>),
      },
      {
        title: '✍️ අනුකලනයේ ලකුණ කියවමු',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.8em' }}><span className="hl1">∫</span> <span className="hl2">2x</span> <span className="hl3">dx</span></p>
          <Recipe steps={[
            <><span className="hl1">∫</span> — දිග “S” අකුරක් 🐍. <b>S</b>um (එකතුව) කියන එක. “මේක අනුකලනය කරන්න” කියන ලකුණ.</>,
            <><span className="hl2">2x</span> — අපි අනුකලනය කරන දේ. (මේක <b>“වේගය”</b> වගේ)</>,
            <><span className="hl3">dx</span> — “<b>x අනුව</b>” කරන්න කියලා කියනවා. කෑම පිඟානක් අගට “ඉවරයි” කියලා තියන හැන්ද වගේ 🥄 — ∫ පටන් ගන්නවා, dx ඉවර කරනවා.</>,
          ]} />
          <div className="say">🗣️ කියවන විදිහ: “<b>x අනුව 2x හි අනුකලය</b>”</div>
          <TryIt q="∫ x² dx හි අනුකලනය කරන දේ මොකක්ද?" options={['x²', 'dx', '∫']} answer={0} why="∫ සහ dx මැද තියෙන්නේ අනුකලනය කරන දේ: x²." />
        </>),
      },
      {
        title: '🤔 + C කියන රහස් අංකය',
        body: (<>
          <Story emoji="🪣">බාල්දියේ <b>මුලින්ම</b> වතුර කොච්චර තිබ්බද අපි දන්නේ නෑ! හිස්ද? ලීටර් 5ක් තිබ්බද? ඒ නොදන්න අංකයට <b>C</b> කියනවා.</Story>
          <p>මේ තුනම අවකලනය කරලා බලන්න:</p>
          <table className="t"><tbody>
            <tr><td>x²</td><td>→</td><td>2x</td></tr>
            <tr><td>x² + 5</td><td>→</td><td>2x + 0 = <b>2x</b></td></tr>
            <tr><td>x² − 10</td><td>→</td><td>2x − 0 = <b>2x</b></td></tr>
          </tbody></table>
          <p>තනි අංක අවකලනය කළාම <b>0 වෙලා නැති වෙනවා</b>. ඉතින් පස්සට ගියාම ඒ අංකය මොකක්ද කියලා අපිට කියන්න බෑ. ඒ නිසා <b>+ C</b>.</p>
          <Worked title="උදාහරණය: ∫ 2x dx" start="\int 2x\,dx" steps={[
            { say: '🕵️ ප්‍රශ්නය අහන්න: මොකක් අවකලනය කළාමද 2x ලැබෙන්නේ?' },
            { say: 'x² අවකලනය කළාම 2x ලැබෙනවා!', tex: '\\frac{d}{dx}(x^2) = 2x' },
            { say: 'ඒත් x² + 5, x² − 10 ත් 2x ම දෙනවා. ඒ නිසා + C ලියනවා.', tex: '\\int 2x\\,dx = x^2 + C' },
          ]} />
          <p>C slider එක ඇදලා බලන්න — වක්‍රය උඩට/පහළට යනවා, ඒත් <b>බෑවුම් (කොළ ඉරි) වෙනස් වෙන්නේ නෑ</b>:</p>
          <AntiderivativeFamily />
          <BigIdea>සීමා නැති අනුකලනයකදී <b>හැම වෙලාවෙම + C</b> ලියන්න! ✍️</BigIdea>
          <Grownup>
            <p>ශ්‍රිතයක ප්‍රතිව්‍යුත්පන්න (antiderivatives) ඕනෑම දෙකක් අතර වෙනස <b>නියතයක්</b> පමණි. ඒ සියල්ලේ එකතුවට <b>අනිශ්චිත අනුකලය (indefinite integral)</b> කියනවා.</p>
            <Formula tex="F'(x) = f(x) \;\Rightarrow\; \int f(x)\,dx = F(x) + C" />
          </Grownup>
        </>),
      },
      {
        title: '✅ හැම වෙලාවෙම පරීක්ෂා කරන්න පුළුවන්!',
        body: (<>
          <p>අනුකලනයේ ලොකුම වාසිය: <b>උත්තරය හරිද කියලා අපිටම බලන්න පුළුවන්</b>. උත්තරය අවකලනය කරලා බලන්න — මුල් එකම ආවොත් ඔයා හරි! 🎯</p>
          <Worked title="පරීක්ෂා කිරීම: ∫ 3x² dx = x³ + C ද?" start="\int 3x^2\,dx \overset{?}{=} x^3 + C" steps={[
            { say: 'උත්තරය (x³ + C) අවකලනය කරන්න.', tex: '\\frac{d}{dx}(x^3 + C) = 3x^2 + 0' },
            { say: 'ලැබුණේ 3x². ඒ මුල් එකමයි! ✅ උත්තරය හරි.', tex: '3x^2 = 3x^2 \\;\\checkmark' },
          ]} />
          <TryIt q="කවුරුහරි කිව්වා ∫ 2x dx = 2x² + C කියලා. පරීක්ෂා කරන්න: (2x²)′ = ?" options={['4x — ඒ නිසා වැරදියි ❌', '2x — හරි ✅']} answer={0} why="(2x²)′ = 4x, 2x නෙවෙයි. ඒ නිසා වැරදියි! හරි උත්තරය x² + C." />
        </>),
      },
    ],
    remember: ['අනුකලනය = පොඩි කෑලි එකතු කරලා මුළු ගණන 🧺', 'අනුකලනය = අවකලනයේ ආපසු ගමන ⏪', '“මොකක් අවකලනය කළාමද මේක ලැබුණේ?” කියලා අහන්න 🕵️', '∫ = පටන් ගන්න, dx = x අනුව / ඉවරයි', 'හැම වෙලාවෙම + C ✍️', 'උත්තරය අවකලනය කරලා පරීක්ෂා කරන්න ✅'],
    mistakes: ['+ C අමතක කිරීම — විභාගයේ ලකුණු කැපෙනවා! 😱', 'dx ලියන්න අමතක කිරීම.', 'පරීක්ෂා නොකර ඉදිරියට යාම.'],
    quiz: [
      { q: '∫ 2x dx = ?', options: ['x² + C', '2x² + C', 'x + C'], answer: 0, why: 'x² → 2x. ඒ නිසා x² + C.' },
      { q: '+ C ලියන්නේ ඇයි?', options: ['තනි අංක අවකලනය කළාම 0 වෙලා නැති වෙන නිසා', 'ලස්සනට', 'ගුරුතුමා කිව්ව නිසා'], answer: 0, why: 'පස්සට එද්දී මුල් අංකය අපි දන්නේ නෑ.' },
      { q: 'අනුකලනය කියන්නේ මොකේ ආපසු ගමනද?', options: ['අවකලනයේ', 'එකතු කිරීමේ', 'ගුණ කිරීමේ'], answer: 0, why: 'අනුකලනය ⏪ = අවකලනය ⏩ ආපසු.' },
      { q: 'x² + 5 සහ x² − 3 අතර වෙනස කීයද?', answer: 8, why: '5 − (−3) = 8. වෙනස අංකයක් විතරයි!' },
      { q: '∫ … dx වල “dx” කියන්නේ?', options: ['x අනුව කරන්න', 'x ගුණ කරන්න', 'x බෙදන්න'], answer: 0, why: 'dx = “x අනුව”.' },
      { q: 'එක ශ්‍රිතයකට උත්තර (ප්‍රතිව්‍යුත්පන්න) කීයක් තියෙනවද?', options: ['එකයි', 'අනන්තයි ♾️', 'දෙකයි'], answer: 1, why: 'C ට ඕනෑම අංකයක් දාන්න පුළුවන් නිසා.' },
      { q: '∫ 3x² dx = ?', options: ['x³ + C', '6x + C', '3x³ + C'], answer: 0, why: 'x³ → 3x².' },
      { q: 'විනාඩියට ලීටර් 2ක් වැටෙනවා නම්, විනාඩි 5කින් වතුර කොච්චරද?', answer: 10, why: '2 × 5 = 10 ලීටර්.' },
      { q: 'මොකක් අවකලනය කළාමද 5 ලැබෙන්නේ?', options: ['5x', '5', '0'], answer: 0, why: '(5x)′ = 5.' },
      { q: 'x⁴ + C අවකලනය කළාම මොකක්ද ලැබෙන්නේ? (උත්තරය පරීක්ෂා කිරීම)', options: ['4x³', 'x³', '4x⁴'], answer: 0, why: '(x⁴)′ = 4x³, C → 0. ඒ නිසා ∫4x³ dx = x⁴ + C හරි ✅.' },
    ],
  },

  /* ═════════════════════════ 8 ═════════════════════════ */
  {
    id: 't8', n: 8, icon: '🔧', section: 'int', si: 'අනුකලන කෙටි ක්‍රම', en: 'Power, Constant & Polynomial Rules',
    steps: [
      {
        title: '🦘 කැංගරුවා පස්සට පනිනවා',
        body: (<>
          <p>මතකද අවකලනයේදී? <b>බලය ඉස්සරහට පනිනවා, 1ක් අඩු වෙනවා</b>. අනුකලනයේදී අපි ඒක <b>පස්සට</b> කරනවා:</p>
          <table className="t"><thead><tr><th>⏩ අවකලනය</th><th>⏪ අනුකලනය</th></tr></thead><tbody>
            <tr><td>1️⃣ බලය ඉස්සරහට ගුණ කරන්න</td><td>1️⃣ බලයට <b>1ක් එකතු</b> කරන්න ➕</td></tr>
            <tr><td>2️⃣ බලයෙන් 1ක් අඩු කරන්න</td><td>2️⃣ අලුත් බලයෙන් <b>බෙදන්න</b> ➗</td></tr>
            <tr><td></td><td>3️⃣ <b>+ C</b> ලියන්න ✍️</td></tr>
          </tbody></table>
          <BigIdea>➕ <b>1 එකතු කරන්න</b> → ➗ <b>ඒකෙන් බෙදන්න</b> → ✍️ <b>+ C</b></BigIdea>
          <Grownup><Formula tex="\int x^n\,dx = \frac{x^{n+1}}{n+1} + C \qquad (n \neq -1)" /></Grownup>
        </>),
      },
      {
        title: '⚙️ අනුකලන යන්ත්‍රය',
        body: (<>
          <p>අංක වෙනස් කරලා, <b>“ඊළඟ පියවර”</b> ඔබලා යන්ත්‍රය වැඩ කරන හැටි බලන්න:</p>
          <IntegralMachine />
        </>),
      },
      {
        title: '✏️ උදාහරණ කිහිපයක්',
        body: (<>
          <Worked title="උදාහරණය 1: ∫ x⁵ dx" start="\int x^5\,dx" steps={[
            { say: '➕ බලයට 1ක් එකතු කරන්න: 5 + 1 = 6', tex: 'x^{6}' },
            { say: '➗ 6 න් බෙදන්න', tex: '\\frac{x^6}{6}' },
            { say: '✍️ + C', tex: '\\int x^5\\,dx = \\frac{x^6}{6} + C' },
          ]} />
          <Worked title="උදාහරණය 2: ∫ x dx  (හැංගිච්ච 1!)" start="\int x\,dx" steps={[
            { say: '🕵️ x හි බලය පේන්නේ නෑ. ඒත් ඇත්තටම x = x¹. බලය 1 හැංගිලා!', tex: 'x = x^1' },
            { say: '➕ 1 + 1 = 2', tex: 'x^2' },
            { say: '➗ 2 න් බෙදන්න, ✍️ + C', tex: '\\int x\\,dx = \\frac{x^2}{2} + C' },
          ]} />
          <TryIt q="∫ x² dx = ?" options={['x³/3 + C', 'x³ + C', '2x + C']} answer={0} why="2 + 1 = 3, 3 න් බෙදන්න, + C." />
          <TryIt q="∫ x⁷ dx = ?" options={['x⁸/8 + C', '7x⁶ + C', 'x⁸ + C']} answer={0} why="7 + 1 = 8, 8 න් බෙදන්න." />
        </>),
      },
      {
        title: '🏃 තනි අංකයක අනුකලය',
        body: (<>
          <Story emoji="🏃">ඔයා තත්පරයකට මීටර් 5ක් දුවනවා. තත්පර 1 → 5m, තත්පර 2 → 10m, තත්පර x → <b>5x</b> මීටර්!</Story>
          <Worked title="ඇයි ∫ 5 dx = 5x + C ?" start="\int 5\,dx" steps={[
            { say: '🕵️ 5 ඇතුළේ x⁰ හැංගිලා ඉන්නවා (x⁰ = 1).', tex: '5 = 5x^0' },
            { say: '➕ 0 + 1 = 1, ➗ 1 න් බෙදන්න (වෙනසක් නෑ)', tex: '5\\cdot\\frac{x^1}{1} = 5x' },
            { say: '✍️ + C', tex: '\\int 5\\,dx = 5x + C' },
          ]} />
          <BigIdea>තනි අංකය <b>k</b> → <b>kx</b> (අංකයට x එකක් අලවන්න)</BigIdea>
          <TryIt q="∫ 10 dx = ?" options={['10x + C', '10 + C', 'x + C']} answer={0} why="10 → 10x." />
          <TryIt q="∫ 1 dx = ?" options={['x + C', '1 + C', '0']} answer={0} why="1 → 1x = x." />
        </>),
      },
      {
        title: '✖️ ඉස්සරහ අංකය පැත්තකින් තියන්න',
        body: (<>
          <p>ඉස්සරහින් අංකයක් තියෙනවා නම් (4x³ වගේ), ඒ අංකය <b>පැත්තකින් ඉවසිලිවන්තව ඉන්නවා</b>. අපි x කෑල්ල කරලා, අන්තිමට ගුණ කරනවා.</p>
          <Worked title="උදාහරණය: ∫ 4x³ dx" start="\int 4x^3\,dx" steps={[
            { say: '4 පැත්තකින් තියන්න', tex: '4\\int x^3\\,dx' },
            { say: 'x³ අනුකලනය: ➕ 3 + 1 = 4, ➗ 4', tex: '4\\cdot\\frac{x^4}{4}' },
            { say: '✂️ 4 ÷ 4 = 1. ✍️ + C', tex: '= x^4 + C' },
          ]} />
          <Worked title="උදාහරණය: ∫ 2x² dx  (භාගයක් එනවා — කමක් නෑ!)" start="\int 2x^2\,dx" steps={[
            { say: '2 පැත්තකින්, x²: ➕ 2 + 1 = 3, ➗ 3', tex: '2\\cdot\\frac{x^3}{3}' },
            { say: '2 ÷ 3 සුළු කරන්න බෑ. ඒ නිසා භාගයක් විදිහටම තියන්න. ✍️ + C', tex: '= \\frac{2x^3}{3} + C' },
          ]} />
          <Owl>භාගයක් (2/3 වගේ) ආවට බය වෙන්න එපා! 😊 ඒකත් හරි උත්තරයක්.</Owl>
          <TryIt q="∫ 6x dx = ?" options={['3x² + C', '6x² + C', '6 + C']} answer={0} why="6 × x²/2 = 3x²." />
        </>),
      },
      {
        title: '🧸 දිග ප්‍රශ්න: කෑලි වෙන වෙනම',
        body: (<>
          <p><b>+</b> සහ <b>−</b> වලින් වෙන් වෙලා තියෙන හැම කෑල්ලක්ම <b>වෙන වෙනම</b> අනුකලනය කරන්න. අන්තිමට <b>එක C එකක්</b> විතරක් ලියන්න.</p>
          <Worked title="උදාහරණය: ∫ (3x² + 4x + 5) dx" start="\int (3x^2 + 4x + 5)\,dx" steps={[
            { say: 'කෑල්ල 1️⃣: 3x² → 3 × x³/3', tex: '\\int 3x^2\\,dx = x^3' },
            { say: 'කෑල්ල 2️⃣: 4x → 4 × x²/2', tex: '\\int 4x\\,dx = 2x^2' },
            { say: 'කෑල්ල 3️⃣: 5 → 5x', tex: '\\int 5\\,dx = 5x' },
            { say: 'ඔක්කොම එකතු කරලා එක + C', tex: '= x^3 + 2x^2 + 5x + C' },
            { say: '✅ පරීක්ෂාව: අවකලනය කළාම 3x² + 4x + 5 ✔', tex: '(x^3 + 2x^2 + 5x)\' = 3x^2 + 4x + 5' },
          ]} />
          <Worked title="උදාහරණය: ∫ (x³ − 2x + 7) dx" start="\int (x^3 - 2x + 7)\,dx" steps={[
            { say: 'x³ → x⁴/4', tex: '\\frac{x^4}{4}' },
            { say: '−2x → −2 × x²/2 = −x²  (− ලකුණ එහෙමම තියාගන්න!)', tex: '-x^2' },
            { say: '7 → 7x', tex: '7x' },
            { say: 'එකතු කරලා + C', tex: '= \\frac{x^4}{4} - x^2 + 7x + C' },
          ]} />
          <TryIt q="∫ (x + 1) dx = ?" options={['x²/2 + x + C', 'x² + x + C', '1 + C']} answer={0} why="x → x²/2, 1 → x." />
        </>),
      },
      {
        title: '🌟 Bonus: සෘණ බල සහ තහනම් අංකය',
        body: (<>
          <p>බලය සෘණ (− ) වුණත් එකම ක්‍රමය වැඩ කරනවා!</p>
          <Worked title="උදාහරණය: ∫ 1/x² dx" start="\int \frac{1}{x^2}\,dx" steps={[
            { say: '1/x² = x⁻² කියලා ලියන්න', tex: '\\int x^{-2}\\,dx' },
            { say: '➕ −2 + 1 = −1, ➗ −1', tex: '\\frac{x^{-1}}{-1}' },
            { say: 'x⁻¹ = 1/x. ✍️ + C', tex: '= -\\frac{1}{x} + C' },
          ]} />
          <div className="mistake">🚫 <b>තහනම් අංකය: n = −1</b> (ඒ කියන්නේ 1/x). −1 + 1 = 0, 0 න් බෙදන්න බෑ! 😵 ඒකට විශේෂ උත්තරයක් තියෙනවා — ඊළඟ පාඩමේදී!</div>
        </>),
      },
    ],
    remember: ['➕ බලයට 1 → ➗ අලුත් බලයෙන් බෙදන්න → ✍️ + C', 'x = x¹ (හැංගිච්ච 1)', 'තනි අංකය k → kx', 'ඉස්සරහ අංකය පැත්තකින් තියලා අන්තිමට ගුණ කරන්න', 'දිග ප්‍රශ්න: කෑලි වෙන වෙනම, අන්තිමට එක C', '1/x (n = −1) ට මේ ක්‍රමය බෑ'],
    mistakes: ['බෙදන්න අමතක වීම: ∫x³ = x⁴ ❌ (හරි: x⁴/4)', 'පරණ බලයෙන් බෙදීම: ∫x³ = x⁴/3 ❌ (අලුත් බලය 4 න්!)', '+ C අමතක කිරීම', '− ලකුණ නැති කරගැනීම'],
    quiz: [
      { q: '∫ x³ dx = ?', options: ['x⁴/4 + C', '3x² + C', 'x⁴ + C'], answer: 0, why: '3 + 1 = 4, 4න් බෙදන්න.' },
      { q: '∫ 5 dx = ?', options: ['5x + C', '5 + C', 'x + C'], answer: 0, why: 'තනි අංකය → 5x.' },
      { q: '∫ 4x³ dx = ?', options: ['x⁴ + C', '12x² + C', '4x⁴ + C'], answer: 0, why: '4 × x⁴/4 = x⁴.' },
      { q: '∫ (3x² + 4x + 5) dx = ?', options: ['x³ + 2x² + 5x + C', 'x³ + 4x² + 5x + C', '6x + 4 + C'], answer: 0, why: 'කෑලි වෙන වෙනම.' },
      { q: '∫ 6x dx = a·x² + C. a කීයද?', answer: 3, why: '6 ÷ 2 = 3.' },
      { q: 'මේ ක්‍රමය වැඩ නොකරන බලය කීයද?', answer: -1, why: '−1 + 1 = 0. 0න් බෙදන්න බෑ!' },
      { q: '∫ 10 dx = ?', options: ['10x + C', '10 + C', 'x/10 + C'], answer: 0, why: 'තනි අංකය → අංකය × x.' },
      { q: '∫ (x + 1) dx = ?', options: ['x²/2 + x + C', 'x² + x + C', '1 + C'], answer: 0, why: 'x → x²/2, 1 → x.' },
      { q: '∫ x⁵ dx = ?', options: ['x⁶/6 + C', '5x⁴ + C', 'x⁶ + C'], answer: 0, why: '5 + 1 = 6, 6 න් බෙදන්න.' },
      { q: '∫ 2x² dx = ?', options: ['2x³/3 + C', '2x³ + C', '4x + C'], answer: 0, why: '2 × x³/3.' },
      { q: '∫ x⁻² dx = ?', options: ['−1/x + C', '1/x + C', '−2x⁻³ + C'], answer: 0, why: '−2 + 1 = −1 ⟹ x⁻¹/(−1) = −1/x.' },
    ],
  },

  /* ═════════════════════════ 9 ═════════════════════════ */
  {
    id: 't9', n: 9, icon: '🃏', section: 'int', si: 'මතක තබාගත යුතු අනුකල', en: 'Standard Forms',
    steps: [
      {
        title: '🔄 අවකලන ලැයිස්තුව පෙරළමු',
        body: (<>
          <p>අපි අවකලනයේදී ඉගෙන ගත්ත ලැයිස්තුව මතකද? ඒක <b>දකුණේ සිට වමට</b> කියෙව්වාම අනුකලන ලැයිස්තුව ලැබෙනවා! 🎉</p>
          <table className="t"><thead><tr><th>⏩ අවකලනය</th><th>⏪ ඒ නිසා අනුකලනය</th></tr></thead><tbody>
            <tr><td>(eˣ)′ = eˣ</td><td>∫ eˣ dx = <b>eˣ + C</b></td></tr>
            <tr><td>(sin x)′ = cos x</td><td>∫ cos x dx = <b>sin x + C</b></td></tr>
            <tr><td>(−cos x)′ = sin x</td><td>∫ sin x dx = <b>−cos x + C</b></td></tr>
            <tr><td>(ln x)′ = 1/x</td><td>∫ 1/x dx = <b>ln|x| + C</b></td></tr>
            <tr><td>(tan x)′ = sec² x</td><td>∫ sec² x dx = <b>tan x + C</b></td></tr>
          </tbody></table>
          <Owl>අලුතින් පාඩම් කරන්න දෙයක් නෑ — අපි දැනටමත් දන්න දේ පෙරළලා විතරයි! 😎</Owl>
        </>),
      },
      {
        title: '🪞 eˣ — කණ්ණාඩි අංකය',
        body: (<>
          <p>eˣ හරිම විශේෂයි. අවකලනය කළත්, අනුකලනය කළත් — <b>ආයෙත් eˣ ම</b>! කණ්ණාඩියක් ඉස්සරහ ඉන්නවා වගේ. 🪞</p>
          <Formula tex="\int e^x\,dx = e^x + C" />
          <Worked title="උදාහරණය: ∫ (3eˣ + 2) dx" start="\int (3e^x + 2)\,dx" steps={[
            { say: '3eˣ → 3 පැත්තකින්, eˣ → eˣ', tex: '3e^x' },
            { say: '2 → 2x (තනි අංකය)', tex: '2x' },
            { say: 'එකතු කරලා + C', tex: '= 3e^x + 2x + C' },
          ]} />
          <TryIt q="∫ 5eˣ dx = ?" options={['5eˣ + C', 'eˣ + C', '5xeˣ + C']} answer={0} why="5 එහෙමම, eˣ → eˣ." />
        </>),
      },
      {
        title: '🎡 sin / cos වටය',
        body: (<>
          <div className="card" style={{ textAlign: 'center', fontSize: '1.25em' }}>
            <div>sin x</div><div>⬇️ <span className="en">අවකලනය</span></div>
            <div>cos x</div><div>⬇️</div>
            <div>−sin x</div><div>⬇️</div>
            <div>−cos x</div><div>⬇️</div>
            <div>sin x 🔄</div>
          </div>
          <p>අවකලනය = වටේ <b>පහළට ⬇️</b>. අනුකලනය = වටේ <b>උඩට ⬆️</b> (එක පියවරක් පස්සට).</p>
          <Recipe steps={[<>∫ cos x → cos ට උඩින් තියෙන්නේ <b>sin x</b></>, <>∫ sin x → sin ට උඩින් තියෙන්නේ <b>−cos x</b> (වටේ අන්තිම එකෙන් උඩට)</>]} />
          <Worked title="උදාහරණය: ∫ (2 sin x + 5 cos x) dx" start="\int (2\sin x + 5\cos x)\,dx" steps={[
            { say: '2 sin x → 2 × (−cos x)', tex: '-2\\cos x' },
            { say: '5 cos x → 5 × sin x', tex: '5\\sin x' },
            { say: 'එකතු කරලා + C', tex: '= -2\\cos x + 5\\sin x + C' },
            { say: '✅ පරීක්ෂාව: (−2cos x)′ = 2 sin x ✔, (5 sin x)′ = 5 cos x ✔' },
          ]} />
          <TryIt q="∫ sin x dx = ?" options={['−cos x + C', 'cos x + C', 'sin x + C']} answer={0} why="(−cos x)′ = sin x. ඒ නිසා − ලකුණ ඕනේ!" />
        </>),
      },
      {
        title: '🪵 1/x — තහනම් අංකයේ විශේෂ උත්තරය',
        body: (<>
          <p>කලින් පාඩමේ තහනම් අංකය මතකද? 1/x = x⁻¹ ට කැංගරු ක්‍රමය වැඩ නෑ. ඒත් <b>(ln x)′ = 1/x</b> නිසා:</p>
          <Formula tex="\int \frac{1}{x}\,dx = \ln|x| + C" say="ln = ස්වාභාවික ලඝුගණකය (natural log). | | = අංකය සෘණ වුණත් ධන කරන ලකුණ." />
          <Worked title="උදාහරණය: ∫ 3/x dx" start="\int \frac{3}{x}\,dx" steps={[
            { say: '3 පැත්තකින් තියන්න', tex: '3\\int\\frac{1}{x}\\,dx' },
            { say: '1/x → ln|x|. ✍️ + C', tex: '= 3\\ln|x| + C' },
          ]} />
          <TryIt q="∫ 2/x dx = ?" options={['2 ln|x| + C', '2/x² + C', 'x² + C']} answer={0} why="2 පැත්තකින්, 1/x → ln|x|." />
        </>),
      },
      {
        title: '🌟 තවත් ත්‍රිකෝණමිතික ජෝඩු',
        body: (<>
          <p>අවකලන ලැයිස්තුවේ අනිත් ඒවත් පෙරළමු (විභාගයට වැදගත්!):</p>
          <table className="t"><thead><tr><th>අනුකලය</th><th>උත්තරය</th><th>ඇයි?</th></tr></thead><tbody>
            <tr><td><Tex t="\int \sec^2 x\,dx" /></td><td><Tex t="\tan x + C" /></td><td>(tan x)′ = sec² x</td></tr>
            <tr><td><Tex t="\int \csc^2 x\,dx" /></td><td><Tex t="-\cot x + C" /></td><td>(cot x)′ = −csc² x</td></tr>
            <tr><td><Tex t="\int \sec x\tan x\,dx" /></td><td><Tex t="\sec x + C" /></td><td>(sec x)′ = sec x tan x</td></tr>
            <tr><td><Tex t="\int \csc x\cot x\,dx" /></td><td><Tex t="-\csc x + C" /></td><td>(csc x)′ = −csc x cot x</td></tr>
          </tbody></table>
          <TryIt q="∫ sec² x dx = ?" options={['tan x + C', 'sec x + C', '−tan x + C']} answer={0} why="(tan x)′ = sec² x." />
        </>),
      },
      {
        title: '🃏 ගැලපෙන කාඩ් සෙල්ලම!',
        body: (<>
          <p>කාඩ් දෙකක් පෙරළලා <b>අනුකලය</b> සහ ඒකේ <b>උත්තරය</b> ගලපන්න. අඩු උත්සාහ ගණනකින් ඉවර කරන්න පුළුවන්ද? 🏆</p>
          <MemoryMatch pairs={STANDARD_PAIRS} />
        </>),
      },
      {
        title: '🧩 ඔක්කොම එකට',
        body: (<>
          <Worked title="උදාහරණය: ∫ (x² + eˣ − sin x + 4/x) dx" start="\int \left(x^2 + e^x - \sin x + \frac{4}{x}\right)dx" steps={[
            { say: 'x² → කැංගරු ක්‍රමය', tex: '\\frac{x^3}{3}' },
            { say: 'eˣ → කණ්ණාඩිය 🪞', tex: 'e^x' },
            { say: '−sin x → −(−cos x) = +cos x  (සෘණ දෙකක් = ධන!)', tex: '+\\cos x' },
            { say: '4/x → 4 ln|x|', tex: '4\\ln|x|' },
            { say: 'ඔක්කොම එකතු කරලා එක + C', tex: '= \\frac{x^3}{3} + e^x + \\cos x + 4\\ln|x| + C' },
          ]} />
        </>),
      },
    ],
    remember: ['∫eˣ = eˣ + C 🪞', '∫cos x = sin x + C', '∫sin x = −cos x + C (− ලකුණ!)', '∫1/x = ln|x| + C 🪵', '∫sec² x = tan x + C', 'අමතක වුණොත්: අවකලන ලැයිස්තුව පෙරළන්න 🔄'],
    mistakes: ['∫sin x = +cos x ❌ (හරි: −cos x)', '1/x ට කැංගරු ක්‍රමය දාන එක ❌', 'ln ඇතුළේ | | අමතක කිරීම', '−sin x හි සෘණ දෙක පටලවා ගැනීම'],
    quiz: [
      { q: '∫ eˣ dx = ?', options: ['eˣ + C', 'x eˣ + C', 'eˣ⁺¹ + C'], answer: 0, why: 'කණ්ණාඩි අංකය 🪞.' },
      { q: '∫ sin x dx = ?', options: ['−cos x + C', 'cos x + C', 'sin x + C'], answer: 0, why: '(−cos x)′ = sin x.' },
      { q: '∫ cos x dx = ?', options: ['sin x + C', '−sin x + C', 'cos x + C'], answer: 0, why: '(sin x)′ = cos x.' },
      { q: '∫ 1/x dx = ?', options: ['ln|x| + C', 'x + C', '1/x² + C'], answer: 0, why: 'විශේෂ එක 🪵.' },
      { q: '∫ 2cos x dx = ?', options: ['2 sin x + C', '−2 sin x + C', '2 cos x + C'], answer: 0, why: '2 එහෙමම.' },
      { q: '∫ (sin x + cos x) dx = ?', options: ['−cos x + sin x + C', 'cos x − sin x + C', 'sin x + cos x + C'], answer: 0, why: 'කෑලි වෙන වෙනම.' },
      { q: '∫ 3eˣ dx = ?', options: ['3eˣ + C', 'eˣ + C', '3xeˣ + C'], answer: 0, why: '3 එහෙමම.' },
      { q: '∫₀^(π/2) cos x dx = ? (අංකයක්)', answer: 1, why: 'sin(π/2) − sin 0 = 1 − 0 = 1.' },
      { q: '∫ sec² x dx = ?', options: ['tan x + C', 'sec x + C', '−tan x + C'], answer: 0, why: '(tan x)′ = sec² x.' },
      { q: '∫ 3/x dx = ?', options: ['3 ln|x| + C', '3/x² + C', 'x³ + C'], answer: 0, why: '3 පැත්තකින්, 1/x → ln|x|.' },
    ],
  },

  /* ═════════════════════════ 10 ═════════════════════════ */
  {
    id: 't10', n: 10, icon: '📐', section: 'int', si: 'සීමා සහිත අනුකලනය', en: 'Definite Integrals',
    steps: [
      {
        title: '🆚 සීමා නැති සහ සීමා ඇති',
        body: (<>
          <div className="row" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ flex: '1 1 240px', margin: 0 }}>
              <b>සීමා නැති (Indefinite)</b>
              <div style={{ textAlign: 'center', fontSize: '1.3em' }}><Tex t="\int 2x\,dx" /></div>
              <p>“මුල සිට ඕනෑම තැනකට” — උත්තරය <b>ශ්‍රිතයක් + C</b> (x² + C)</p>
            </div>
            <div className="card" style={{ flex: '1 1 240px', margin: 0 }}>
              <b>සීමා ඇති (Definite)</b>
              <div style={{ textAlign: 'center', fontSize: '1.3em' }}><Tex t="\int_{\color{red}1}^{\color{red}3} 2x\,dx" /></div>
              <p>“<b>1 සිට 3 දක්වා</b> විතරක්” — උත්තරය <b>එක අංකයක්</b> 🔢 (8)</p>
            </div>
          </div>
          <WordBox simple="a සිට b දක්වා විතරක් එකතු කරන එක" maths="නිශ්චිත අනුකලය" en="Definite Integral" />
          <p>∫ ලකුණේ <b>පහළ අංකය (a)</b> = පටන් ගන්න තැන 🚩. <b>උඩ අංකය (b)</b> = ඉවර වෙන තැන 🏁.</p>
        </>),
      },
      {
        title: '🧱 වක්‍රය යට ඉඩ = ගඩොල් එකතුව',
        body: (<>
          <p>නිශ්චිත අනුකලය කියන්නේ <b>වක්‍රය යට ඉඩ (වර්ගඵලය)</b>. ඒක හොයන්න පොඩි ගඩොල් (සෘජුකෝණාස්‍ර) පුරවලා එකතු කරනවා. ගඩොල් <b>වැඩි කරන තරමට</b> උත්තරය හරියටම ළං වෙනවා!</p>
          <RiemannArea />
          <Owl>ගඩොල් ලක්ෂ ගණනක් එකතු කරන්න අපිට කාලයක් නෑ නේද? 😅 ඒ නිසා ඊළඟ පියවරේ <b>සුපිරි කෙටි ක්‍රමයක්</b> ඉගෙන ගමු!</Owl>
        </>),
      },
      {
        title: '⚡ විදුලි මීටර් උපක්‍රමය',
        body: (<>
          <Story emoji="⚡">මාසෙ මුලදී විදුලි මීටරය <b>120</b>යි. මාසෙ අන්තිමේ <b>200</b>යි. මාසෙටම පාවිච්චි කළේ? <b>200 − 120 = 80</b>! දවසින් දවස එකතු කරන්න ඕනේ නෑ — <b>අන්තිම − මුල</b> විතරයි.</Story>
          <BigIdea>නිශ්චිත අනුකලය = <b>F(අන්තිම) − F(මුල)</b> = F(b) − F(a)<br /><span className="en">(F = සාමාන්‍ය විදිහට අනුකලනය කරලා ලැබෙන “මීටරය”)</span></BigIdea>
          <Recipe steps={[
            <>සාමාන්‍ය විදිහට අනුකලනය කරන්න — <b>C නැතුව</b>. ඒක F(x).</>,
            <>කොටු වරහන් ලියන්න: <Tex t="\big[F(x)\big]_a^b" /> (“මීටරය කියවන්න ලෑස්තියි”)</>,
            <><b>උඩ අංකය (b)</b> x වෙනුවට දාන්න → F(b) 🏁</>,
            <><b>පහළ අංකය (a)</b> x වෙනුවට දාන්න → F(a) 🚩</>,
            <><b>අඩු කරන්න:</b> F(b) − F(a) 🎉</>,
          ]} />
          <Grownup><Formula tex="\int_a^b f(x)\,dx = \big[F(x)\big]_a^b = F(b) - F(a)" say="Fundamental Theorem of Calculus (දෙවන ආකාරය). F′ = f." /></Grownup>
        </>),
      },
      {
        title: '✏️ පියවරෙන් පියවර උදාහරණ',
        body: (<>
          <Worked title="උදාහරණය 1: ∫₁³ 2x dx" start="\int_1^3 2x\,dx" steps={[
            { say: '1️⃣ අනුකලනය (C නැතුව): 2x → x²', tex: '\\big[x^2\\big]_1^3' },
            { say: '2️⃣ උඩ අංකය 3 දාන්න: 3² = 9', tex: 'F(3) = 9' },
            { say: '3️⃣ පහළ අංකය 1 දාන්න: 1² = 1', tex: 'F(1) = 1' },
            { say: '4️⃣ අඩු කරන්න 🎉', tex: '9 - 1 = 8' },
          ]} />
          <Worked title="උදාහරණය 2: ∫₀² (3x² + 1) dx" start="\int_0^2 (3x^2 + 1)\,dx" steps={[
            { say: '1️⃣ කෑලි වෙන වෙනම අනුකලනය: 3x² → x³, 1 → x', tex: '\\big[x^3 + x\\big]_0^2' },
            { say: '2️⃣ x = 2 දාන්න', tex: 'F(2) = 2^3 + 2 = 8 + 2 = 10' },
            { say: '3️⃣ x = 0 දාන්න', tex: 'F(0) = 0 + 0 = 0' },
            { say: '4️⃣ අඩු කරන්න 🎉', tex: '10 - 0 = 10' },
          ]} />
          <Worked title="උදාහරණය 3: ∫₀^π sin x dx  (තරංගයක් යට ඉඩ)" start="\int_0^{\pi} \sin x\,dx" steps={[
            { say: '1️⃣ sin x → −cos x', tex: '\\big[-\\cos x\\big]_0^{\\pi}' },
            { say: '2️⃣ x = π: cos π = −1 නිසා −(−1) = 1', tex: 'F(\\pi) = -\\cos\\pi = 1' },
            { say: '3️⃣ x = 0: cos 0 = 1 නිසා −1', tex: 'F(0) = -\\cos 0 = -1' },
            { say: '4️⃣ අඩු කරන්න: 1 − (−1) = 2 🎉 (සෘණයක් අඩු කළාම එකතු වෙනවා!)', tex: '1 - (-1) = 2' },
          ]} />
          <TryIt q="∫₀² 2x dx = ?" options={['4', '2', '8']} answer={0} why="[x²] → 2² − 0² = 4." />
          <TryIt q="∫₁² 3x² dx = ?" options={['7', '8', '9']} answer={0} why="[x³] → 2³ − 1³ = 8 − 1 = 7." />
        </>),
      },
      {
        title: '🎮 ඔයාම ඉඩ හොයන්න!',
        body: (<>
          <p>ශ්‍රිතයක් තෝරලා, <b>a</b> සහ <b>b</b> ඇදලා බලන්න. කොළ පාට ඉඩ සහ F(b) − F(a) එකට වෙනස් වෙනවා! 🟩</p>
          <AreaFinder />
          <TryIt q="f(x) = 3 (සමතලා රේඛාව), a = 1, b = 4. ඉඩ කීයද? (සෘජුකෝණාස්‍රයක්: උස × පළල)" options={['9', '12', '3']} answer={0} why="උස 3 × පළල (4 − 1 = 3) = 9. [3x] → 12 − 3 = 9 ✔ දෙකම එකයි!" />
        </>),
      },
      {
        title: '🚌 ඇත්ත ලෝකයේ: වේගයෙන් දුර',
        body: (<>
          <p>බස් එකේ <b>වේග</b> ප්‍රස්තාරය යට තියෙන ඉඩ = බස් එක <b>ගිය දුර</b>!</p>
          <VelocityToDistance />
          <Owl>නිශ්චිත අනුකලයෙන් හොයන්න පුළුවන්: 📏 වක්‍රය යට ඉඩ, 🚌 වේගයෙන් දුර, 🪣 එකතු වුණු ප්‍රමාණය, 📈 යම් දෙයක මුළු වෙනස.</Owl>
        </>),
      },
      {
        title: '🤔 ඇයි මෙතන + C ඕනේ නැත්තේ?',
        body: (<>
          <Worked title="C කැපිලා යන හැටි" start="\big[x^2 + C\big]_1^3" steps={[
            { say: 'C එක්කම උඩ අංකය දාන්න', tex: '(9 + C)' },
            { say: 'C එක්කම පහළ අංකය දාන්න', tex: '(1 + C)' },
            { say: 'අඩු කරන්න — C දෙක කැපිලා යනවා! ✂️', tex: '(9 + C) - (1 + C) = 9 - 1 + C - C = 8' },
          ]} />
          <BigIdea>සීමා තියෙනකොට C <b>කොහොමත් කැපිලා යනවා</b>. ඒ නිසා ලියන්න ඕනේ නෑ!</BigIdea>
          <Grownup>
            <p>වක්‍රය x-අක්ෂයට <b>පහළින්</b> තියෙනවා නම්, ඒ කොටස අනුකලයට <b>සෘණ (−)</b> විදිහට එකතු වෙනවා. උදා: <Tex t="\int_0^{2\pi}\sin x\,dx = 0" /> (උඩ කොටසයි පහළ කොටසයි කැපිලා යනවා).</p>
          </Grownup>
        </>),
      },
    ],
    remember: ['නිශ්චිත අනුකලය = a සිට b දක්වා වක්‍රය යට ඉඩ = එක අංකයක් 🔢', 'F(b) − F(a) = අන්තිම − මුල ⚡', 'පියවර: අනුකලනය → [ ] → b දාන්න → a දාන්න → අඩු කරන්න', 'සීමා තියෙනකොට + C ඕනේ නෑ (කැපිලා යනවා)', 'වේග ප්‍රස්තාරය යට ඉඩ = දුර 🚌'],
    mistakes: ['F(a) − F(b) කියලා පෙරළලා අඩු කරන එක ❌ (හැම වෙලාවෙම උඩ − පහළ)', 'සෘණ අංකයක් අඩු කරද්දී වැරදීම: 1 − (−1) = 2 (0 නෙවෙයි!)', 'නිශ්චිත අනුකලයට + C ලියන එක', 'x = 0 දාද්දී “0 නිසා ඔක්කොම 0” කියලා හිතන එක — cos 0 = 1!'],
    quiz: [
      { q: '∫₁³ 2x dx = ?', answer: 8, why: '3² − 1² = 9 − 1 = 8.' },
      { q: '∫₀² 3 dx = ?', answer: 6, why: '[3x] ⟹ 6 − 0 = 6.' },
      { q: '∫₀³ x² dx = ?', answer: 9, why: '[x³/3] ⟹ 27/3 − 0 = 9.' },
      { q: 'නිශ්චිත අනුකලයක උත්තරය?', options: ['අංකයක් 🔢', 'ශ්‍රිතයක් + C', 'වචනයක්'], answer: 0, why: 'සීමා දාලා අඩු කළාම අංකයක් ලැබෙනවා.' },
      { q: '∫ₐᵇ f dx = ?', options: ['F(b) − F(a)', 'F(a) − F(b)', 'F(a) + F(b)'], answer: 0, why: 'අන්තිම − මුල ⚡.' },
      { q: '∫₀^π sin x dx = ?', answer: 2, why: '[−cos x] ⟹ 1 − (−1) = 2.' },
      { q: '∫₁² x dx = ?', answer: 1.5, why: '[x²/2] ⟹ 2 − 0.5 = 1.5.' },
      { q: 'වේග ප්‍රස්තාරය යට ඉඩ කියන්නේ?', options: ['ගිය දුර 🚌', 'උෂ්ණත්වය', 'බර'], answer: 0, why: 'වේගය × කාලය = දුර.' },
      { q: '∫₀² (3x² + 1) dx = ?', answer: 10, why: '[x³ + x] ⟹ (8 + 2) − 0 = 10.' },
      { q: '∫₀¹ 4x³ dx = ?', answer: 1, why: '[x⁴] ⟹ 1 − 0 = 1.' },
    ],
  },

  /* ═════════════════════════ 11 ═════════════════════════ */
  {
    id: 't11', n: 11, icon: '🍫', section: 'int', si: 'නිශ්චිත අනුකලයේ නීති', en: 'Properties of Definite Integrals',
    steps: [
      {
        title: '🚪 නීතිය 1: පළලක් නැත්නම් → 0',
        body: (<>
          <p>2 සිට 2 දක්වා කියන්නේ <b>එක තැනකමයි</b> — කොහෙවත් යන්නේ නෑ! පළල 0 නම් ඉඩත් 0. (දොර වහලා තියෙනකොට ඇතුළට යන්න ඉඩ නෑ 🚪)</p>
          <Formula tex="\int_a^a f(x)\,dx = 0" />
          <Worked title="පරීක්ෂා කරමු: ∫₂² x² dx" start="\int_2^2 x^2\,dx" steps={[
            { say: 'අනුකලනය: x³/3', tex: '\\big[\\tfrac{x^3}{3}\\big]_2^2' },
            { say: 'උඩ 2 සහ පහළ 2 — දෙකම එකයි!', tex: '\\tfrac{8}{3} - \\tfrac{8}{3} = 0 \\;\\checkmark' },
          ]} />
          <TryIt q="∫₅⁵ (x³ + 7) dx = ?" options={['0', '132', '5']} answer={0} why="පටන් ගන්න තැනයි, ඉවර වෙන තැනයි එකයි ⟹ 0. ගණන් හදන්නවත් ඕනේ නෑ! 😎" />
        </>),
      },
      {
        title: '🔄 නීතිය 2: පෙරළුවොත් − ලකුණ',
        body: (<>
          <Story emoji="🚶">ඉස්සරහට මීටර් 5ක් ගියොත් +5. ඒ පාරම <b>පස්සට</b> ආවොත් −5!</Story>
          <Formula tex="\int_a^b f\,dx = -\int_b^a f\,dx" />
          <Worked title="පරීක්ෂා කරමු" start="\int_1^3 2x\,dx \quad\text{vs}\quad \int_3^1 2x\,dx" steps={[
            { say: 'සාමාන්‍ය පිළිවෙළ: 3² − 1²', tex: '\\int_1^3 2x\\,dx = 9 - 1 = 8' },
            { say: 'පෙරළපු පිළිවෙළ: 1² − 3²', tex: '\\int_3^1 2x\\,dx = 1 - 9 = -8' },
            { say: 'එකම අංකය, ලකුණ විතරක් වෙනස්! ✔', tex: '8 = -(-8)' },
          ]} />
          <TryIt q="∫₀³ f = 5 නම් ∫₃⁰ f = ?" options={['−5', '5', '0']} answer={0} why="සීමා පෙරළුවා ⟹ − ලකුණ." />
        </>),
      },
      {
        title: '🍫 නීතිය 3: කඩලා එකතු කරන්න',
        body: (<>
          <Story emoji="🍫">චොකලට් එකක් කෑලි දෙකකට කැඩුවාට මුළු චොකලට් ප්‍රමාණය වෙනස් වෙන්නේ නෑ!</Story>
          <p>රතු ඉරි රේඛාව (කපන තැන) ඇදලා බලන්න 👇</p>
          <SplitArea />
          <Formula tex="\int_a^b f = \int_a^c f + \int_c^b f" say="a සිට b = (a සිට c) + (c සිට b)" />
          <TryIt q="∫₀² f = 3, ∫₂⁵ f = 4. ∫₀⁵ f = ?" options={['7', '1', '12']} answer={0} why="3 + 4 = 7 🍫." />
          <TryIt q="∫₀⁴ f = 10 සහ ∫₀¹ f = 3. ∫₁⁴ f = ?" options={['7', '13', '3']} answer={0} why="මුළු එක 10 = 3 + ?. ඒ නිසා ? = 7." />
        </>),
      },
      {
        title: '✖️ නීතිය 4: අංකය එළියට',
        body: (<>
          <Formula tex="\int_a^b k\cdot f(x)\,dx = k\int_a^b f(x)\,dx" say="ඉස්සරහ අංකය ∫ ලකුණෙන් එළියට ගන්න පුළුවන්." />
          <Worked title="උදාහරණය: ∫₀¹ 3x dx" start="\int_0^1 3x\,dx" steps={[
            { say: '3 එළියට ගන්න', tex: '3\\int_0^1 x\\,dx' },
            { say: 'ඇතුළ: [x²/2] → ½ − 0 = ½', tex: '3 \\times \\tfrac12' },
            { say: 'ගුණ කරන්න 🎉', tex: '= 1.5' },
          ]} />
        </>),
      },
      {
        title: '➕ නීතිය 5: + / − කෑලි වෙන වෙනම',
        body: (<>
          <Formula tex="\int_a^b (f \pm g)\,dx = \int_a^b f\,dx \pm \int_a^b g\,dx" />
          <Worked title="නීති එකට: ∫₀² (3x² + 2x) dx" start="\int_0^2 (3x^2 + 2x)\,dx" steps={[
            { say: '➕ කෑලි වෙන් කරන්න (නීතිය 5)', tex: '\\int_0^2 3x^2\\,dx + \\int_0^2 2x\\,dx' },
            { say: '✖️ අංක එළියට (නීතිය 4)', tex: '3\\int_0^2 x^2\\,dx + 2\\int_0^2 x\\,dx' },
            { say: 'x²: [x³/3] → 8/3.  x: [x²/2] → 2', tex: '3\\cdot\\tfrac{8}{3} + 2\\cdot 2' },
            { say: 'ගණන් හදන්න 🎉', tex: '= 8 + 4 = 12' },
            { say: '✅ පරීක්ෂාව: කෙලින්ම [x³ + x²] → 8 + 4 = 12 ✔' },
          ]} />
          <TryIt q="∫₀¹ f = 2, ∫₀¹ g = 3. ∫₀¹ (f + g) = ?" options={['5', '6', '1']} answer={0} why="2 + 3 = 5." />
          <Owl>⚠️ පරිස්සමින්! <b>ගුණ කිරීම</b> (f × g) මෙහෙම වෙන් කරන්න <b>බෑ</b>: <Tex t="\int f\cdot g \neq \int f \cdot \int g" /></Owl>
        </>),
      },
    ],
    remember: ['🚪 ∫ₐᵃ = 0', '🔄 සීමා පෙරළුවොත් − ලකුණ', '🍫 c තැනින් කඩලා එකතු කරන්න පුළුවන්', '✖️ අංකය එළියට ගන්න පුළුවන්', '➕ + / − කෑලි වෙන වෙනම (ගුණ කිරීම බෑ!)'],
    mistakes: ['පෙරළුවාම − ලකුණ අමතක කිරීම', '∫ f·g = ∫f · ∫g කියලා හිතන එක ❌', 'කඩද්දී මැද තැන (c) වැරදියට ලිවීම'],
    quiz: [
      { q: '∫₂² x³ dx = ?', answer: 0, why: 'පළල 0 ⟹ 0 🚪.' },
      { q: '∫ₐᵇ f dx = ?', options: ['−∫ᵇₐ f dx', '∫ᵇₐ f dx', '0'], answer: 0, why: 'පෙරළුවොත් − 🔄.' },
      { q: '∫₀² f = 3, ∫₂⁵ f = 4. ∫₀⁵ f = ?', answer: 7, why: '3 + 4 = 7 🍫.' },
      { q: '∫₀¹ 3x dx = ?', answer: 1.5, why: '3 × [x²/2] = 3 × ½ = 1.5.' },
      { q: '∫₀³ f = 5 නම් ∫₃⁰ f = ?', answer: -5, why: 'පෙරළුවා ⟹ −5.' },
      { q: '∫₀¹ f = 2, ∫₀¹ g = 3. ∫₀¹ (f+g) = ?', answer: 5, why: '2 + 3 = 5.' },
      { q: '∫ₐᵇ (f − g) dx = ?', options: ['∫f − ∫g', '∫f × ∫g', '∫f + ∫g'], answer: 0, why: '− කෑලි වෙන වෙනම.' },
      { q: '∫ₐᵇ k·f dx = ?', options: ['k × ∫ₐᵇ f dx', 'k + ∫ₐᵇ f dx', '0'], answer: 0, why: 'අංකය එළියට ✖️.' },
      { q: '∫₀² (3x² + 2x) dx = ?', answer: 12, why: '[x³ + x²] ⟹ 8 + 4 = 12.' },
      { q: '∫₀⁴ f = 10, ∫₀¹ f = 3. ∫₁⁴ f = ?', answer: 7, why: '10 − 3 = 7 🍫.' },
    ],
  },

  /* ═════════════════════════ 12 ═════════════════════════ */
  {
    id: 't12', n: 12, icon: '🍕', section: 'int', si: 'භාග අනුකලනය', en: 'Rational Functions & Partial Fractions',
    steps: [
      {
        title: '🏠 උඩ තට්ටුව සහ යට තට්ටුව',
        body: (<>
          <p>භාගයක් කියන්නේ තට්ටු දෙකේ ගෙයක් වගේ:</p>
          <p style={{ textAlign: 'center', fontSize: '1.6em' }}><Tex t="\dfrac{\color{red}{2x}}{\color{blue}{x^2+1}}" /></p>
          <WordBox simple="🔴 උඩ තට්ටුව" maths="ලවය" en="Numerator" />
          <WordBox simple="🔵 යට තට්ටුව" maths="හරය" en="Denominator" />
          <Owl>භාග අනුකලනය කරන්න ක්‍රම දෙකක් ඉගෙන ගමු: <b>🔍 රහස් රටාව</b> සහ <b>🍕 පීසා කැපීම</b>.</Owl>
        </>),
      },
      {
        title: '🔍 ක්‍රමය 1: උඩ = යටේ බෑවුම',
        body: (<>
          <p>මේ භාගය බලන්න. <b>යට තට්ටුව</b> අවකලනය කරලා බලමු:</p>
          <Recipe steps={[<>යට තට්ටුව: <span className="hl2">x² + 1</span></>, <>ඒක අවකලනය කළාම: (x² + 1)′ = <span className="hl1">2x</span></>, <>උඩ තට්ටුව මොකක්ද? <span className="hl1">2x</span>! එකමයි! 🤩</>]} />
          <BigIdea>උඩ තට්ටුව = යට තට්ටුවේ බෑවුම නම් ⟹ උත්තරය = <b>ln|යට තට්ටුව| + C</b></BigIdea>
          <Formula tex="\int \frac{2x}{x^2+1}\,dx = \ln(x^2+1) + C" />
          <p>මේ ක්‍රමය හරියන්නේ මොන ඒවටද කියලා හඳුනාගන්න පුරුදු වෙමු:</p>
          <table className="t"><thead><tr><th>භාගය</th><th>යටේ බෑවුම</th><th>උඩ එක්ක සමානද?</th><th>උත්තරය</th></tr></thead><tbody>
            <tr><td><Tex t="\frac{3x^2}{x^3+5}" /></td><td>3x²</td><td>✅</td><td><Tex t="\ln|x^3+5| + C" /></td></tr>
            <tr><td><Tex t="\frac{1}{x-3}" /></td><td>1</td><td>✅</td><td><Tex t="\ln|x-3| + C" /></td></tr>
            <tr><td><Tex t="\frac{\cos x}{\sin x}" /></td><td>cos x</td><td>✅</td><td><Tex t="\ln|\sin x| + C" /></td></tr>
            <tr><td><Tex t="\frac{x}{x^2+1}" /></td><td>2x</td><td>🟡 බාගයක් විතරයි</td><td>ඊළඟ පියවර 👉</td></tr>
          </tbody></table>
          <TryIt q="∫ 3x²/(x³ + 5) dx = ?" options={['ln|x³ + 5| + C', '3 ln x + C', 'x³ + C']} answer={0} why="(x³ + 5)′ = 3x² = උඩ තට්ටුව ✔." />
          <Grownup>
            <Formula tex="\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + C" say="ඇයි? දාම නීතියෙන් (ln f)′ = f′/f." />
          </Grownup>
        </>),
      },
      {
        title: '🧮 උඩ තට්ටුව ටිකක් වෙනස් නම්?',
        body: (<>
          <p>සමහර වෙලාවට උඩ තට්ටුව යටේ බෑවුමට <b>හරියටම සමාන නෑ</b>, ඒත් <b>අංකයකින් ගුණ කළාම</b> සමාන වෙනවා. එතකොට ඒ අංකය එළියට ගන්නවා!</p>
          <Worked title="උදාහරණය: ∫ x/(x² + 1) dx" start="\int \frac{x}{x^2+1}\,dx" steps={[
            { say: 'යටේ බෑවුම: (x² + 1)′ = 2x. ඒත් උඩ තියෙන්නේ x විතරයි — 2x හි බාගයක්.', tex: 'x = \\tfrac12 \\cdot 2x' },
            { say: '½ එළියට ගන්න', tex: '\\tfrac12\\int \\frac{2x}{x^2+1}\\,dx' },
            { say: 'දැන් උඩ = යටේ බෑවුම ✔. රටාව දාන්න', tex: '= \\tfrac12\\ln(x^2+1) + C' },
          ]} />
          <Worked title="උදාහරණය: ∫ 6x/(x² + 4) dx" start="\int \frac{6x}{x^2+4}\,dx" steps={[
            { say: 'යටේ බෑවුම: 2x. උඩ 6x = 3 × 2x', tex: '6x = 3\\cdot 2x' },
            { say: '3 එළියට ගන්න', tex: '3\\int\\frac{2x}{x^2+4}\\,dx' },
            { say: 'රටාව දාන්න 🎉', tex: '= 3\\ln(x^2+4) + C' },
          ]} />
          <TryIt q="∫ 4x/(2x² + 1) dx = ?" options={['ln(2x² + 1) + C', '4 ln(2x² + 1) + C', '½ ln(2x² + 1) + C']} answer={0} why="(2x² + 1)′ = 4x = උඩ හරියටම ✔." />
        </>),
      },
      {
        title: '🍕 ක්‍රමය 2: පීසා කැපීම (Partial Fractions)',
        body: (<>
          <p>සමහර භාග <b>ලොකුයි, අමාරුයි</b> — රහස් රටාව වැඩ නෑ. එතකොට ඒවා <b>පොඩි ලේසි කෑලි දෙකකට කපනවා</b>!</p>
          <p>මේක <b>භාග එකතු කිරීමේ ආපසු ගමන</b>. ඔයා දන්නවා:</p>
          <div className="card" style={{ textAlign: 'center', fontSize: '1.2em' }}>
            <div>⏩ එකතු කිරීම: <Tex t="\frac12 - \frac13 = \frac{3-2}{6} = \frac16" /></div>
            <div>⏪ කැපීම: <Tex t="\frac16 = \frac12 - \frac13" /></div>
          </div>
          <p>අපිත් එහෙමම <Tex t="\frac{1}{(x-1)(x-2)}" /> කෑලි දෙකකට කපනවා:</p>
          <WordBox simple="ලොකු භාගය පොඩි කෑලි වලට කැපීම" maths="භාග වෙන් කිරීම" en="Partial Fractions" />
          <PartialFractionSplit />
        </>),
      },
      {
        title: '✂️ පීසා කපන පියවර 5',
        body: (<>
          <Worked title="උදාහරණය: ∫ 1/((x−1)(x−2)) dx" start="\int \frac{1}{(x-1)(x-2)}\,dx" steps={[
            { say: '1️⃣ කෑලි දෙකකට කපන්න. A සහ B කියන්නේ අපි හොයන රහස් අංක දෙක.', tex: '\\frac{1}{(x-1)(x-2)} = \\frac{A}{x-1} + \\frac{B}{x-2}' },
            { say: '2️⃣ දෙපැත්තම (x−1)(x−2) න් ගුණ කරන්න — භාග නැති වෙනවා!', tex: '1 = A(x-2) + B(x-1)' },
            { say: '3️⃣ A හොයන්න: x = 1 දාන්න. B කෑල්ල (1−1 = 0) නැති වෙනවා! 🪄', tex: '1 = A(1-2) + 0 \\Rightarrow 1 = -A \\Rightarrow A = -1' },
            { say: '4️⃣ B හොයන්න: x = 2 දාන්න. A කෑල්ල (2−2 = 0) නැති වෙනවා! 🪄', tex: '1 = 0 + B(2-1) \\Rightarrow B = 1' },
            { say: '5️⃣ කෑලි දෙක වෙන වෙනම අනුකලනය (1/(x−a) → ln|x−a|) 🎉', tex: '\\int\\Big(\\frac{-1}{x-1} + \\frac{1}{x-2}\\Big)dx = -\\ln|x-1| + \\ln|x-2| + C' },
          ]} />
          <Owl>🪄 <b>මැජික් උපක්‍රමය:</b> A හොයන්න A ගේ යට තට්ටුව 0 කරන x අංකය දාන්න. එතකොට B නැති වෙනවා. B ටත් එහෙමම!</Owl>
        </>),
      },
      {
        title: '✏️ තවත් උදාහරණයක් (උඩ තට්ටුවේ x තියෙනවා)',
        body: (<>
          <Worked title="උදාහරණය: ∫ (5x + 1)/((x+1)(x−1)) dx" start="\int \frac{5x+1}{(x+1)(x-1)}\,dx" steps={[
            { say: '1️⃣ කපන්න', tex: '\\frac{5x+1}{(x+1)(x-1)} = \\frac{A}{x+1} + \\frac{B}{x-1}' },
            { say: '2️⃣ ගුණ කරලා භාග නැති කරන්න', tex: '5x + 1 = A(x-1) + B(x+1)' },
            { say: '3️⃣ x = 1 දාන්න (A නැති වෙනවා)', tex: '6 = 2B \\Rightarrow B = 3' },
            { say: '4️⃣ x = −1 දාන්න (B නැති වෙනවා)', tex: '-4 = -2A \\Rightarrow A = 2' },
            { say: '5️⃣ අනුකලනය 🎉', tex: '= 2\\ln|x+1| + 3\\ln|x-1| + C' },
          ]} />
          <TryIt q="1/(x(x+1)) කපලා ලිව්වාම?" options={['1/x − 1/(x+1)', '1/x + 1/(x+1)', 'x/(x+1)']} answer={0} why="x = 0 ⟹ A = 1. x = −1 ⟹ 1 = −B ⟹ B = −1." />
        </>),
      },
      {
        title: '📐 සීමා සහිත පීසා',
        body: (<>
          <p>අන්තිමට, පීසා කැපීම සහ සීමා සහිත අනුකලනය එකට! (විභාගයේ එන වර්ගයේ ප්‍රශ්නයක්)</p>
          <Worked title="උදාහරණය: ∫₂³ 1/(x(x−1)) dx" start="\int_2^3 \frac{1}{x(x-1)}\,dx" steps={[
            { say: '1️⃣ කපන්න: x = 0 ⟹ A = −1. x = 1 ⟹ B = 1', tex: '\\frac{1}{x(x-1)} = \\frac{-1}{x} + \\frac{1}{x-1}' },
            { say: '2️⃣ අනුකලනය (C නැතුව)', tex: '\\big[-\\ln|x| + \\ln|x-1|\\big]_2^3' },
            { say: '3️⃣ x = 3 දාන්න', tex: 'F(3) = -\\ln 3 + \\ln 2' },
            { say: '4️⃣ x = 2 දාන්න (ln 1 = 0!)', tex: 'F(2) = -\\ln 2 + \\ln 1 = -\\ln 2' },
            { say: '5️⃣ අඩු කරන්න 🎉', tex: '(-\\ln 3 + \\ln 2) - (-\\ln 2) = 2\\ln 2 - \\ln 3 = \\ln\\tfrac{4}{3} \\approx 0.288' },
          ]} />
        </>),
      },
    ],
    remember: ['🔍 උඩ = යටේ බෑවුම ⟹ ln|යට| + C', '🧮 උඩ අංකයකින් වෙනස් නම් ඒ අංකය එළියට ගන්න', '🍕 අමාරු භාගය ⟹ A/(x−a) + B/(x−b)', '🪄 A, B හොයන්න යට තට්ටුව 0 කරන x දාන්න', '1/(x−a) → ln|x−a|', 'ln 1 = 0'],
    mistakes: ['ln ඇතුළේ | | (absolute) අමතක කිරීම', '½ වගේ අංකය අමතක කිරීම', 'A සහ B මාරු කරගැනීම', 'භාග නැති කරද්දී එක පැත්තක් විතරක් ගුණ කිරීම'],
    quiz: [
      { q: '∫ 2x/(x²+1) dx = ?', options: ['ln(x²+1) + C', '2 ln x + C', 'x²+1 + C'], answer: 0, why: 'උඩ = යටේ බෑවුම.' },
      { q: '∫ 1/(x−3) dx = ?', options: ['ln|x−3| + C', '1/(x−3)² + C', '(x−3) + C'], answer: 0, why: '(x − 3)′ = 1 = උඩ.' },
      { q: '∫ 3x²/(x³+5) dx = ?', options: ['ln|x³+5| + C', '3 ln x + C', 'x³ + C'], answer: 0, why: '(x³+5)′ = 3x² = උඩ.' },
      { q: '∫ x/(x²+1) dx = ?', options: ['½ ln(x²+1) + C', 'ln(x²+1) + C', '2 ln(x²+1) + C'], answer: 0, why: 'x = ½ × 2x.' },
      { q: '1/((x−1)(x−2)) = A/(x−1) + B/(x−2). A = ?', answer: -1, why: 'x = 1 ⟹ 1 = −A ⟹ A = −1.' },
      { q: 'ඒකෙම B = ?', answer: 1, why: 'x = 2 ⟹ 1 = B.' },
      { q: '1/(x(x+1)) = ?', options: ['1/x − 1/(x+1)', '1/x + 1/(x+1)', 'x/(x+1)'], answer: 0, why: '1/x − 1/(x+1) = 1/(x(x+1)) ✔.' },
      { q: '∫ 4x/(2x²+1) dx = ?', options: ['ln(2x²+1) + C', '4 ln(2x²+1) + C', 'ln(4x) + C'], answer: 0, why: '(2x²+1)′ = 4x = උඩ.' },
      { q: '(5x+1)/((x+1)(x−1)) = A/(x+1) + B/(x−1). B = ?', answer: 3, why: 'x = 1 ⟹ 6 = 2B ⟹ B = 3.' },
      { q: 'ඒකෙම A = ?', answer: 2, why: 'x = −1 ⟹ −4 = −2A ⟹ A = 2.' },
    ],
  },
]
