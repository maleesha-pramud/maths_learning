import type { Topic } from './types'
import { Formula, Story, Tex } from '../components/Lesson/Formula'
import { BigIdea, Owl, WordBox, Pic, Recipe, Grownup, TryIt } from '../components/Lesson/Kid'
import { AntiderivativeFamily, RiemannArea, VelocityToDistance, PartialFractionSplit } from '../components/viz/widgets2'
import { BucketFill } from '../components/viz/widgets3'

export const integral: Topic[] = [
  /* ───────────────────────── 7 ───────────────────────── */
  {
    id: 't7', n: 7, icon: '⏪', section: 'int', si: 'අනුකලනය = ආපසු යන ගමන', en: 'Integration as Reverse',
    steps: [
      {
        title: '🪣 බාල්දිය පුරවමු',
        body: (<>
          <p>කරාමයෙන් වතුර වැටෙන <b>වේගය</b> අපි දන්නවා. බාල්දියේ <b>මුළු වතුර</b> කොච්චරද? ▶ කරාමය අරින්න!</p>
          <BucketFill />
          <BigIdea>වේගය දන්නකොට <b>මුළු ප්‍රමාණය</b> හොයන එකට <b>අනුකලනය (Integration)</b> කියනවා. 🧺</BigIdea>
        </>),
      },
      {
        title: '⏪ වීඩියෝව පස්සට rewind කරමු',
        body: (<>
          <div className="row" style={{ justifyContent: 'center', fontSize: '1.3em', gap: 20 }}>
            <div>x² <b>⏩</b> 2x</div>
            <div className="en">අවකලනය = ඉස්සරහට</div>
          </div>
          <div className="row" style={{ justifyContent: 'center', fontSize: '1.3em', gap: 20 }}>
            <div>2x <b>⏪</b> x²</div>
            <div className="en">අනුකලනය = පස්සට</div>
          </div>
          <Owl>අනුකලනය කියන්නේ අවකලනයේ <b>ආපසු ගමන</b>. “2x ලැබුණේ මොකක් අවකලනය කරලද?” කියලා අහනවා. උත්තරේ: <b>x²</b>! 🕵️</Owl>
          <TryIt q="මොකක් අවකලනය කළාමද 3x² ලැබෙන්නේ?" options={['x³', '6x', '3x³']} answer={0} why="x³ → 3x². ඒ නිසා පස්සට ගියාම x³." />
        </>),
      },
      {
        title: '✍️ අනුකලනයේ ලකුණ',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.6em' }}><span className="hl1">∫</span> <span className="hl2">2x</span> <span className="hl3">dx</span></p>
          <Recipe steps={[
            <><span className="hl1">∫</span> — දිග “S” අකුර. Sum (එකතුව) කියන එක 🐍</>,
            <><span className="hl2">2x</span> — අපි අනුකලනය කරන දේ</>,
            <><span className="hl3">dx</span> — “x අනුව” කරන්න කියලා කියනවා</>,
          ]} />
        </>),
      },
      {
        title: '🤔 + C කියන්නේ මොකක්ද?',
        body: (<>
          <Story emoji="🪣">බාල්දියේ මුලින්ම වතුර <b>කොච්චර තිබ්බද</b> අපි දන්නේ නෑ! 0යි ද? 5යි ද? 10යි ද? ඒ නොදන්න අංකයට අපි <b>C</b> කියනවා.</Story>
          <p>x², x² + 5, x² − 10 — <b>තුනම</b> අවකලනය කළාම 2x! (තනි අංක → 0 නිසා). ඒ නිසා පස්සට ගියාම:</p>
          <Formula tex="\int 2x\,dx = x^2 + C" />
          <p>C slider එක ඇදලා බලන්න — වක්‍රය උඩට පහළට යනවා, ඒත් <b>බෑවුම් (කොළ ඉරි) එකමයි</b>!</p>
          <AntiderivativeFamily />
          <BigIdea>අනුකලනය කළාම <b>හැම වෙලාවෙම + C</b> ලියන්න! ✍️</BigIdea>
          <TryIt q="∫ 2x dx = ?" options={['x² + C', 'x²', '2x² + C']} answer={0} why="+ C අමතක කරන්න එපා!" />
        </>),
      },
    ],
    remember: ['අනුකලනය = අවකලනයේ ආපසු ගමන ⏪', 'හැම වෙලාවෙම + C ලියන්න (මුල් වතුර ප්‍රමාණය අපි දන්නේ නෑ 🪣)', '∫ = එකතුව, dx = x අනුව', 'උත්තර දෙක අතර වෙනස නියත අංකයක් (C) විතරයි.'],
    mistakes: ['+ C අමතක කිරීම — විභාගයේ ලකුණු කැපෙනවා! 😱', 'dx ලියන්න අමතක කිරීම.'],
    quiz: [
      { q: '∫ 2x dx = ?', options: ['x² + C', '2x² + C', 'x + C'], answer: 0, why: 'x² → 2x. ඒ නිසා x² + C.' },
      { q: '+ C ලියන්නේ ඇයි?', options: ['තනි අංක අවකලනය කළාම 0 වෙලා නැති වෙන නිසා', 'ලස්සනට', 'ගුරුතුමා කිව්ව නිසා'], answer: 0, why: 'පස්සට එද්දී මුල් අංකය අපි දන්නේ නෑ.' },
      { q: 'අනුකලනය කියන්නේ මොකේ ආපසු ගමනද?', options: ['අවකලනයේ', 'එකතු කිරීමේ', 'ගුණ කිරීමේ'], answer: 0, why: 'අනුකලනය ⏪ = අවකලනය ⏩ ආපසු.' },
      { q: 'x² + 5 සහ x² − 3 අතර වෙනස කීයද?', answer: 8, why: '5 − (−3) = 8. වෙනස අංකයක් විතරයි!' },
      { q: '∫ … dx වල “dx” කියන්නේ?', options: ['x අනුව කරන්න', 'x ගුණ කරන්න', 'x බෙදන්න'], answer: 0, why: 'dx = “x අනුව”.' },
      { q: 'එක ශ්‍රිතයකට උත්තර (ප්‍රතිව්‍යුත්පන්න) කීයක් තියෙනවද?', options: ['එකයි', 'අනන්තයි ♾️', 'දෙකයි'], answer: 1, why: 'C ට ඕනෑම අංකයක් දාන්න පුළුවන් නිසා.' },
      { q: '∫ 3x² dx = ?', options: ['x³ + C', '6x + C', '3x³ + C'], answer: 0, why: 'x³ → 3x².' },
      { q: 'විනාඩියට ලීටර් 2ක් වැටෙනවා නම්, විනාඩි 5කින් වතුර කොච්චරද?', answer: 10, why: '2 × 5 = 10 ලීටර්.' },
    ],
  },

  /* ───────────────────────── 8 ───────────────────────── */
  {
    id: 't8', n: 8, icon: '🔧', section: 'int', si: 'අනුකලන කෙටි ක්‍රම', en: 'Power, Constant & Polynomial Rules',
    steps: [
      {
        title: '🦘 කැංගරුවා ආපසු!',
        body: (<>
          <p>අවකලනයේදී: <b>පනිනවා, 1ක් අඩු කරනවා</b>. අනුකලනයේදී අපි ඒක <b>පෙරළලා</b> කරනවා:</p>
          <Recipe steps={[<>උඩ අංකයට <span className="hl3">1ක් එකතු</span> කරන්න ➕</>, <>ඒ <span className="hl1">අලුත් අංකයෙන් බෙදන්න</span> ➗</>, <><b>+ C</b> ලියන්න ✍️</>]} />
          <p style={{ textAlign: 'center', fontSize: '1.3em' }}>x³ &nbsp;→&nbsp; x<sup className="hl3">4</sup> &nbsp;→&nbsp; <Tex t="\frac{x^4}{4}" /> &nbsp;→&nbsp; <Tex t="\frac{x^4}{4} + C" /></p>
          <TryIt q="∫ x² dx = ?" options={['x³/3 + C', 'x³ + C', '2x + C']} answer={0} why="2 + 1 = 3, 3න් බෙදන්න, + C." />
          <TryIt q="∫ x dx = ?" options={['x²/2 + C', 'x² + C', '1 + C']} answer={0} why="x = x¹. 1 + 1 = 2, 2න් බෙදන්න." />
          <Grownup>
            <Formula tex="\int x^n\,dx = \frac{x^{n+1}}{n+1} + C\qquad (n \neq -1)" />
          </Grownup>
        </>),
      },
      {
        title: '🏃 තනි අංකයක් → x එක්ක',
        body: (<>
          <Story emoji="🏃">ඔයා තත්පරයකට මීටර් 5ක් දුවනවා. තත්පර x කින් ගිය දුර? <b>5x</b>!</Story>
          <Formula tex="\int 5\,dx = 5x + C" say="තනි අංකයට x එකක් එකතු කරන්න." />
          <TryIt q="∫ 10 dx = ?" options={['10x + C', '10 + C', 'x + C']} answer={0} why="තනි අංකය → අංකය × x." />
        </>),
      },
      {
        title: '✖️ ඉස්සරහ අංකය ඉවසිලිවන්තව ඉන්නවා',
        body: (<>
          <p>ඉස්සරහ අංකය පැත්තකින් තියලා, අනිත් කෑල්ල කරලා, අන්තිමට ගුණ කරන්න.</p>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t="\int 4x^3\,dx = 4 \times \frac{x^4}{4} + C = x^4 + C" /></p>
          <TryIt q="∫ 6x dx = ?" options={['3x² + C', '6x² + C', '6 + C']} answer={0} why="6 × x²/2 = 3x²." />
        </>),
      },
      {
        title: '🧸 කෑලි වෙන වෙනම + පරීක්ෂා කිරීම',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t="\int (3x^2 + 4x + 5)\,dx" /></p>
          <Recipe steps={[<>3x² → 3 × x³/3 = <b>x³</b></>, <>4x → 4 × x²/2 = <b>2x²</b></>, <>5 → <b>5x</b></>, <>එකතුව: <b>x³ + 2x² + 5x + C</b> 🎉</>]} />
          <Owl>✅ <b>රහස් උපක්‍රමය:</b> උත්තරය අවකලනය කරලා බලන්න. මුල් එකම ආවොත් ඔයා හරි! (x³ + 2x² + 5x)′ = 3x² + 4x + 5 ✔</Owl>
        </>),
      },
    ],
    remember: ['➕ උඩ අංකයට 1 එකතු → ➗ ඒකෙන් බෙදන්න → ✍️ + C', 'තනි අංකය k → kx', 'ඉස්සරහ අංකය එහෙමම තියලා ගුණ කරන්න.', 'උත්තරය අවකලනය කරලා පරීක්ෂා කරන්න ✅'],
    mistakes: ['බෙදන්න අමතක වීම: ∫x³ = x⁴ ❌ (හරි: x⁴/4)', '+ C නැති කිරීම', 'උඩ අංකය −1 නම් මේ ක්‍රමය වැඩ නෑ (0න් බෙදන්න බෑ).'],
    quiz: [
      { q: '∫ x³ dx = ?', options: ['x⁴/4 + C', '3x² + C', 'x⁴ + C'], answer: 0, why: '3 + 1 = 4, 4න් බෙදන්න.' },
      { q: '∫ 5 dx = ?', options: ['5x + C', '5 + C', 'x + C'], answer: 0, why: 'තනි අංකය → 5x.' },
      { q: '∫ 4x³ dx = ?', options: ['x⁴ + C', '12x² + C', '4x⁴ + C'], answer: 0, why: '4 × x⁴/4 = x⁴.' },
      { q: '∫ (3x² + 4x + 5) dx = ?', options: ['x³ + 2x² + 5x + C', 'x³ + 4x² + 5x + C', '6x + 4 + C'], answer: 0, why: 'කෑලි වෙන වෙනම.' },
      { q: '∫ 6x dx = a·x² + C. a කීයද?', answer: 3, why: '6 ÷ 2 = 3.' },
      { q: 'මේ ක්‍රමය වැඩ නොකරන උඩ අංකය කීයද?', answer: -1, why: '−1 + 1 = 0. 0න් බෙදන්න බෑ!' },
      { q: '∫ 10 dx = ?', options: ['10x + C', '10 + C', 'x/10 + C'], answer: 0, why: 'තනි අංකය → අංකය × x.' },
      { q: '∫ (x + 1) dx = ?', options: ['x²/2 + x + C', 'x² + x + C', '1 + C'], answer: 0, why: 'x → x²/2, 1 → x.' },
    ],
  },

  /* ───────────────────────── 9 ───────────────────────── */
  {
    id: 't9', n: 9, icon: '🃏', section: 'int', si: 'මතක තබාගත යුතු අනුකල', en: 'Standard Forms',
    steps: [
      {
        title: '🃏 ගැලපෙන කාඩ් සෙල්ලම',
        body: (<>
          <p>මේ 4 කට්ට පාඩම් කරගන්න. ඒවා කාඩ් ජෝඩු වගේ:</p>
          <div className="map">
            <div className="card" style={{ textAlign: 'center' }}><Tex t="\int e^x dx" /><Pic e="🪞" /><b>eˣ + C</b></div>
            <div className="card" style={{ textAlign: 'center' }}><Tex t="\int \cos x\,dx" /><Pic e="🌊" /><b>sin x + C</b></div>
            <div className="card" style={{ textAlign: 'center' }}><Tex t="\int \sin x\,dx" /><Pic e="🔻🌊" /><b>−cos x + C</b></div>
            <div className="card" style={{ textAlign: 'center' }}><Tex t="\int \frac{1}{x} dx" /><Pic e="🪵" /><b>ln|x| + C</b></div>
          </div>
        </>),
      },
      {
        title: '🪞 eˣ — කණ්ණාඩි අංකය',
        body: (<>
          <p>eˣ හරිම විශේෂයි. අවකලනය කළත්, අනුකලනය කළත් — <b>ආයෙත් eˣ ම</b>! කණ්ණාඩියක් වගේ. 🪞</p>
          <TryIt q="∫ 3eˣ dx = ?" options={['3eˣ + C', 'eˣ + C', '3xeˣ + C']} answer={0} why="ඉස්සරහ 3 එහෙමම, eˣ → eˣ." />
        </>),
      },
      {
        title: '🔄 sin / cos වටය',
        body: (<>
          <div className="pic" style={{ fontSize: '1.3em' }}>
            sin ➡️ cos ➡️ −sin ➡️ −cos ➡️ sin
          </div>
          <p>අවකලනය කරද්දී ➡️ දිශාවට යනවා. අනුකලනය කරද්දී <b>පස්සට ⬅️</b> යනවා.</p>
          <Recipe steps={[<>∫ cos x → පස්සට එක පියවරක් → <b>sin x</b></>, <>∫ sin x → පස්සට එක පියවරක් → <b>−cos x</b> (− ලකුණ!)</>]} />
          <TryIt q="∫ sin x dx = ?" options={['−cos x + C', 'cos x + C', 'sin x + C']} answer={0} why="(−cos x)′ = sin x. ඒ නිසා − ලකුණ ඕනේ!" />
        </>),
      },
      {
        title: '🪵 1/x — විශේෂ එක',
        body: (<>
          <p>1/x = x⁻¹. කැංගරු ක්‍රමයෙන් −1 + 1 = 0, 0න් බෙදන්න බෑ! 😵 ඒ නිසා මේකට විශේෂ උත්තරයක්:</p>
          <Formula tex="\int \frac{1}{x}\,dx = \ln|x| + C" say="ln කියන්නේ ලඝුගණකය (natural log)." />
          <TryIt q="∫ (2 cos x) dx = ?" options={['2 sin x + C', '−2 sin x + C', '2 cos x + C']} answer={0} why="2 එහෙමම, cos → sin." />
        </>),
      },
    ],
    remember: ['∫eˣ = eˣ + C 🪞', '∫cos x = sin x + C', '∫sin x = −cos x + C (− ලකුණ!)', '∫1/x = ln|x| + C 🪵'],
    mistakes: ['∫sin x = +cos x ❌ (හරි: −cos x)', '1/x ට කැංගරු ක්‍රමය දාන එක ❌'],
    quiz: [
      { q: '∫ eˣ dx = ?', options: ['eˣ + C', 'x eˣ + C', 'eˣ⁺¹ + C'], answer: 0, why: 'කණ්ණාඩි අංකය 🪞.' },
      { q: '∫ sin x dx = ?', options: ['−cos x + C', 'cos x + C', 'sin x + C'], answer: 0, why: '(−cos x)′ = sin x.' },
      { q: '∫ cos x dx = ?', options: ['sin x + C', '−sin x + C', 'cos x + C'], answer: 0, why: '(sin x)′ = cos x.' },
      { q: '∫ 1/x dx = ?', options: ['ln|x| + C', 'x + C', '1/x² + C'], answer: 0, why: 'විශේෂ එක 🪵.' },
      { q: '∫ 2cos x dx = ?', options: ['2 sin x + C', '−2 sin x + C', '2 cos x + C'], answer: 0, why: '2 එහෙමම.' },
      { q: '∫ (sin x + cos x) dx = ?', options: ['−cos x + sin x + C', 'cos x − sin x + C', 'sin x + cos x + C'], answer: 0, why: 'කෑලි වෙන වෙනම.' },
      { q: '∫ 3eˣ dx = ?', options: ['3eˣ + C', 'eˣ + C', '3xeˣ + C'], answer: 0, why: '3 එහෙමම.' },
      { q: '∫₀^(π/2) cos x dx = ? (අංකයක්)', answer: 1, why: 'sin(π/2) − sin 0 = 1 − 0 = 1.' },
    ],
  },

  /* ───────────────────────── 10 ───────────────────────── */
  {
    id: 't10', n: 10, icon: '📐', section: 'int', si: 'සීමා සහිත අනුකලනය', en: 'Definite Integrals',
    steps: [
      {
        title: '🧱 වක්‍රය යට ඉඩ ගණන් කරමු',
        body: (<>
          <p>වක්‍රයක් යට ඉඩ (වර්ගඵලය) හොයන්න <b>පොඩි ගඩොල් (සෘජුකෝණාස්‍ර)</b> පුරවනවා. ගඩොල් <b>වැඩි කරන තරමට</b> උත්තරය හරියටම ළං වෙනවා!</p>
          <p>slider එක දකුණට ඇදලා ගඩොල් වැඩි කරන්න 👇</p>
          <RiemannArea />
          <WordBox simple="a සිට b දක්වා වක්‍රය යට ඉඩ" maths="නිශ්චිත අනුකලය" en="Definite Integral" />
        </>),
      },
      {
        title: '⚡ විදුලි මීටරයේ උපක්‍රමය',
        body: (<>
          <Story emoji="⚡">මාසෙ මුලදී විදුලි මීටරය <b>120</b>යි. මාසෙ අන්තිමේ <b>200</b>යි. මාසෙට පාවිච්චි කළේ? <b>200 − 120 = 80</b>! දවසින් දවස එකතු කරන්න ඕනේ නෑ.</Story>
          <BigIdea>උත්තරය = <b>අන්තිම කියවීම − මුල් කියවීම</b>  = F(b) − F(a)</BigIdea>
          <Recipe steps={[<>සාමාන්‍ය විදිහට අනුකලනය කරන්න (C නැතුව) → F(x)</>, <>උඩ අංකය (b) දාන්න → F(b)</>, <>පහළ අංකය (a) දාන්න → F(a)</>, <>අඩු කරන්න: F(b) − F(a) 🎉</>]} />
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t="\int_1^3 2x\,dx = [x^2]_1^3 = 9 - 1 = 8" /></p>
          <TryIt q="∫₀² 2x dx = ?" options={['4', '2', '8']} answer={0} why="[x²] → 2² − 0² = 4." />
          <Grownup>
            <Formula tex="\int_a^b f(x)\,dx = F(b) - F(a)" say="Fundamental Theorem of Calculus (දෙවන ආකාරය)" />
          </Grownup>
        </>),
      },
      {
        title: '🚌 බස් එක ගිය දුර',
        body: (<>
          <p>බස් එකේ <b>වේග</b> ප්‍රස්තාරය යට තියෙන කොළ පාට ඉඩ = බස් එක <b>ගිය දුර</b>!</p>
          <VelocityToDistance />
          <Owl>නිශ්චිත අනුකලයෙන් හොයන්න පුළුවන්: 📏 වක්‍රය යට ඉඩ, 🚌 වේගයෙන් දුර, 🪣 එකතු වුණු ප්‍රමාණය, 📈 මුළු වෙනස.</Owl>
        </>),
      },
      {
        title: '🆚 + C ඇති එක සහ නැති එක',
        body: (<>
          <table className="t"><thead><tr><th></th><th>අනිශ්චිත (සීමා නැති)</th><th>නිශ්චිත (සීමා ඇති)</th></tr></thead><tbody>
            <tr><td>ලියන විදිහ</td><td>∫ f dx</td><td>∫ₐᵇ f dx</td></tr>
            <tr><td>උත්තරය</td><td>ශ්‍රිතයක් + C</td><td><b>එක අංකයක්</b> 🔢</td></tr>
            <tr><td>+ C ?</td><td>✅ ඕනේ</td><td>❌ ඕනේ නෑ (අඩු කරද්දී කැපිලා යනවා)</td></tr>
          </tbody></table>
          <TryIt q="∫₁³ 2x dx උත්තරය මොන වගේද?" options={['අංකයක් (8)', 'x² + C', 'ප්‍රස්තාරයක්']} answer={0} why="සීමා තියෙන නිසා උත්තරය අංකයක්." />
        </>),
      },
    ],
    remember: ['නිශ්චිත අනුකලය = වක්‍රය යට ඉඩ = එක අංකයක් 🔢', 'උත්තරය = F(b) − F(a)  (අන්තිම − මුල ⚡)', 'සීමා තියෙනකොට + C ඕනේ නෑ.', 'වේග ප්‍රස්තාරය යට ඉඩ = දුර 🚌'],
    mistakes: ['F(a) − F(b) කියලා පෙරළලා අඩු කරන එක ❌ (හැම වෙලාවෙම උඩ − පහළ)', 'නිශ්චිත අනුකලයට + C ලියන එක.'],
    quiz: [
      { q: '∫₁³ 2x dx = ?', answer: 8, why: '3² − 1² = 9 − 1 = 8.' },
      { q: '∫₀² 3 dx = ?', answer: 6, why: '[3x] ⟹ 6 − 0 = 6.' },
      { q: '∫₀³ x² dx = ?', answer: 9, why: '[x³/3] ⟹ 27/3 − 0 = 9.' },
      { q: 'නිශ්චිත අනුකලයක උත්තරය?', options: ['අංකයක් 🔢', 'ශ්‍රිතයක් + C', 'වචනයක්'], answer: 0, why: 'සීමා දාලා අඩු කළාම අංකයක් ලැබෙනවා.' },
      { q: '∫ₐᵇ f dx = ?', options: ['F(b) − F(a)', 'F(a) − F(b)', 'F(a) + F(b)'], answer: 0, why: 'අන්තිම − මුල ⚡.' },
      { q: '∫₀^π sin x dx = ?', answer: 2, why: '[−cos x] ⟹ −(−1) − (−1) = 2.' },
      { q: '∫₁² x dx = ?', answer: 1.5, why: '[x²/2] ⟹ 2 − 0.5 = 1.5.' },
      { q: 'වේග ප්‍රස්තාරය යට ඉඩ කියන්නේ?', options: ['ගිය දුර 🚌', 'උෂ්ණත්වය', 'බර'], answer: 0, why: 'වේගය × කාලය = දුර.' },
    ],
  },

  /* ───────────────────────── 11 ───────────────────────── */
  {
    id: 't11', n: 11, icon: '🍫', section: 'int', si: 'නිශ්චිත අනුකලයේ නීති', en: 'Properties of Definite Integrals',
    steps: [
      {
        title: '🚪 නීතිය 1: පළලක් නැත්නම් → 0',
        body: (<>
          <p>2 සිට 2 දක්වා කියන්නේ කොහෙවත් යන්නේ නෑ! පළල 0 නම් ඉඩත් 0.</p>
          <Formula tex="\int_a^a f\,dx = 0" />
          <TryIt q="∫₅⁵ x² dx = ?" options={['0', '25', '5']} answer={0} why="පටන් ගන්න තැනයි, ඉවර වෙන තැනයි එකයි ⟹ 0." />
        </>),
      },
      {
        title: '🔄 නීතිය 2: පෙරළුවොත් − ලකුණ',
        body: (<>
          <Story emoji="🚶">ඉස්සරහට මීටර් 5ක් ගියොත් +5. ඒකම <b>පස්සට</b> ගියොත් −5!</Story>
          <Formula tex="\int_a^b f\,dx = -\int_b^a f\,dx" />
          <TryIt q="∫₀³ f = 5 නම් ∫₃⁰ f = ?" options={['−5', '5', '0']} answer={0} why="සීමා පෙරළුවා ⟹ − ලකුණ." />
        </>),
      },
      {
        title: '🍫 නීතිය 3: කඩලා එකතු කරන්න',
        body: (<>
          <Story emoji="🍫">චොකලට් එකක් කෑලි දෙකකට කැඩුවාට මුළු චොකලට් එක වෙනස් වෙන්නේ නෑ!</Story>
          <Formula tex="\int_0^5 f = \int_0^2 f + \int_2^5 f" say="0 සිට 5 = (0 සිට 2) + (2 සිට 5)" />
          <TryIt q="∫₀² f = 3, ∫₂⁵ f = 4. ∫₀⁵ f = ?" options={['7', '1', '12']} answer={0} why="3 + 4 = 7 🍫." />
        </>),
      },
      {
        title: '✖️ නීතිය 4 සහ 5: අංක එළියට, එකතුව වෙන වෙනම',
        body: (<>
          <Formula tex="\int_a^b k\,f\,dx = k\int_a^b f\,dx" say="ඉස්සරහ අංකය එළියට ගන්න පුළුවන්." />
          <Formula tex="\int_a^b (f + g)\,dx = \int_a^b f + \int_a^b g" say="+ / − කෑලි වෙන වෙනම." />
          <TryIt q="∫₀¹ f = 2, ∫₀¹ g = 3. ∫₀¹ (f + g) = ?" options={['5', '6', '1']} answer={0} why="2 + 3 = 5." />
          <Owl>⚠️ ඒත් ගුණ කිරීම (f × g) එහෙම වෙන් කරන්න <b>බෑ</b>!</Owl>
        </>),
      },
    ],
    remember: ['🚪 ∫ₐᵃ = 0', '🔄 සීමා පෙරළුවොත් − ලකුණ', '🍫 කඩලා එකතු කරන්න පුළුවන්', '✖️ අංකය එළියට, + / − වෙන වෙනම'],
    mistakes: ['පෙරළුවාම − ලකුණ අමතක කිරීම', '∫ f·g = ∫f · ∫g කියලා හිතන එක ❌'],
    quiz: [
      { q: '∫₂² x³ dx = ?', answer: 0, why: 'පළල 0 ⟹ 0 🚪.' },
      { q: '∫ₐᵇ f dx = ?', options: ['−∫ᵇₐ f dx', '∫ᵇₐ f dx', '0'], answer: 0, why: 'පෙරළුවොත් − 🔄.' },
      { q: '∫₀² f = 3, ∫₂⁵ f = 4. ∫₀⁵ f = ?', answer: 7, why: '3 + 4 = 7 🍫.' },
      { q: '∫₀¹ 3x dx = ?', answer: 1.5, why: '3 × [x²/2] = 3 × ½ = 1.5.' },
      { q: '∫₀³ f = 5 නම් ∫₃⁰ f = ?', answer: -5, why: 'පෙරළුවා ⟹ −5.' },
      { q: '∫₀¹ f = 2, ∫₀¹ g = 3. ∫₀¹ (f+g) = ?', answer: 5, why: '2 + 3 = 5.' },
      { q: '∫ₐᵇ (f − g) dx = ?', options: ['∫f − ∫g', '∫f × ∫g', '∫f + ∫g'], answer: 0, why: '− කෑලි වෙන වෙනම.' },
      { q: '∫ₐᵇ k·f dx = ?', options: ['k × ∫ₐᵇ f dx', 'k + ∫ₐᵇ f dx', '0'], answer: 0, why: 'අංකය එළියට ✖️.' },
    ],
  },

  /* ───────────────────────── 12 ───────────────────────── */
  {
    id: 't12', n: 12, icon: '🍕', section: 'int', si: 'භාග අනුකලනය', en: 'Rational Functions & Partial Fractions',
    steps: [
      {
        title: '🏠 උඩ තට්ටුව සහ යට තට්ටුව',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.4em' }}><Tex t="\dfrac{\color{red}{2x}}{\color{blue}{x^2+1}}" /></p>
          <WordBox simple="🔴 උඩ තට්ටුව" maths="ලවය" en="Numerator" />
          <WordBox simple="🔵 යට තට්ටුව" maths="හරය" en="Denominator" />
        </>),
      },
      {
        title: '🔍 රහස් රටාව: උඩ = යටේ බෑවුම',
        body: (<>
          <p>යට තට්ටුව x² + 1 අවකලනය කළොත්? <b>2x</b>! ඒ කියන්නේ <b>උඩ තට්ටුව</b> ම තමයි! 🤩</p>
          <BigIdea>උඩ තට්ටුව = යට තට්ටුවේ බෑවුම නම් ⟹ උත්තරය = <b>ln|යට තට්ටුව| + C</b></BigIdea>
          <Formula tex="\int \frac{2x}{x^2+1}\,dx = \ln(x^2+1) + C" />
          <TryIt q="∫ 3x²/(x³ + 5) dx = ?" options={['ln|x³ + 5| + C', '3 ln x + C', 'x³ + C']} answer={0} why="(x³ + 5)′ = 3x² = උඩ තට්ටුව ✔." />
          <Grownup><Formula tex="\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + C" /></Grownup>
        </>),
      },
      {
        title: '🧮 උඩ තට්ටුව ටිකක් වෙනස් නම්?',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t="\int \frac{x}{x^2+1}\,dx" /></p>
          <p>යට බෑවුම 2x. ඒත් උඩ තියෙන්නේ x විතරයි — ඒ කියන්නේ <b>බාගයක් (½)</b>.</p>
          <Recipe steps={[<>x = ½ × 2x කියලා ලියන්න</>, <>½ එළියට ගන්න</>, <>රටාව දාන්න: <b>½ ln(x² + 1) + C</b> 🎉</>]} />
        </>),
      },
      {
        title: '🍕 පීසා කපමු (භාග වෙන් කිරීම)',
        body: (<>
          <p>සමහර භාග හරිම <b>ලොකුයි, අමාරුයි</b>. ඒවා <b>පොඩි ලේසි කෑලි</b> වලට කපලා, එක එක කෑල්ල වෙන වෙනම කරනවා!</p>
          <WordBox simple="ලොකු භාගය පොඩි කෑලි වලට කැපීම" maths="භාග වෙන් කිරීම" en="Partial Fractions" />
          <PartialFractionSplit />
        </>),
      },
      {
        title: '✂️ පියවරෙන් පියවර',
        body: (<>
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t="\int \frac{1}{(x-1)(x-2)}\,dx" /></p>
          <Recipe steps={[
            <>කෑලි දෙකකට කපන්න: <Tex t="\frac{A}{x-1} + \frac{B}{x-2}" /></>,
            <>1 = A(x − 2) + B(x − 1)</>,
            <>x = 1 දාන්න ⟹ 1 = −A ⟹ <b>A = −1</b></>,
            <>x = 2 දාන්න ⟹ 1 = B ⟹ <b>B = 1</b></>,
            <>එක එක කෑල්ල: <Tex t="-\ln|x-1| + \ln|x-2| + C" /> 🎉</>,
          ]} />
          <Owl>💡 උපක්‍රමය: A හොයන්න x = 1 දාන්න (B කෑල්ල 0 වෙනවා). B හොයන්න x = 2 දාන්න (A කෑල්ල 0 වෙනවා)!</Owl>
        </>),
      },
    ],
    remember: ['උඩ = යටේ බෑවුම ⟹ ln|යට| + C 🔍', 'උඩ ටිකක් වෙනස් නම් අංකය (½ වගේ) එළියට ගන්න.', 'අමාරු භාගය 🍕 කෑලි වලට: A/(x−a) + B/(x−b)', 'A, B හොයන්න x = a, x = b දාන්න.'],
    mistakes: ['ln ඇතුළේ | | (absolute) අමතක කිරීම', '½ වගේ අංකය අමතක කිරීම', 'A සහ B මාරු කරගැනීම'],
    quiz: [
      { q: '∫ 2x/(x²+1) dx = ?', options: ['ln(x²+1) + C', '2 ln x + C', 'x²+1 + C'], answer: 0, why: 'උඩ = යටේ බෑවුම.' },
      { q: '∫ 1/(x−3) dx = ?', options: ['ln|x−3| + C', '1/(x−3)² + C', '(x−3) + C'], answer: 0, why: '(x − 3)′ = 1 = උඩ.' },
      { q: '∫ 3x²/(x³+5) dx = ?', options: ['ln|x³+5| + C', '3 ln x + C', 'x³ + C'], answer: 0, why: '(x³+5)′ = 3x² = උඩ.' },
      { q: '∫ x/(x²+1) dx = ?', options: ['½ ln(x²+1) + C', 'ln(x²+1) + C', '2 ln(x²+1) + C'], answer: 0, why: 'x = ½ × 2x.' },
      { q: '1/((x−1)(x−2)) = A/(x−1) + B/(x−2). A = ?', answer: -1, why: 'x = 1 ⟹ 1 = −A ⟹ A = −1.' },
      { q: 'ඒකෙම B = ?', answer: 1, why: 'x = 2 ⟹ 1 = B.' },
      { q: '1/(x(x+1)) = ?', options: ['1/x − 1/(x+1)', '1/x + 1/(x+1)', 'x/(x+1)'], answer: 0, why: '1/x − 1/(x+1) = 1/(x(x+1)) ✔.' },
      { q: '∫ 4x/(2x²+1) dx = ?', options: ['ln(2x²+1) + C', '4 ln(2x²+1) + C', 'ln(4x) + C'], answer: 0, why: '(2x²+1)′ = 4x = උඩ.' },
    ],
  },
]
