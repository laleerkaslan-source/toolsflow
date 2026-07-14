import { ToolLayout } from "@/components/tools/tool-layout";
import { BmiCalculator } from "@/components/tools/bmi-calculator";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "VKİ Hesaplayıcı (Vücut Kitle İndeksi)" : "BMI Calculator (Body Mass Index)",
    description: isTr
      ? "Ücretsiz VKİ hesaplayıcı. Boy ve kilonuzu girerek Vücut Kitle İndeksinizi hesaplayın ve sağlık durumunuzu öğrenin."
      : "Free BMI calculator. Calculate your Body Mass Index by entering your height and weight to learn your health status.",
    alternates: {
      canonical: isTr ? "/araclar/vki-hesaplayici" : "/en/tools/bmi-calculator",
      languages: {
        tr: "/araclar/vki-hesaplayici",
        en: "/en/tools/bmi-calculator",
      },
    },
  };
}

export default async function BmiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        { q: "VKİ nedir?", a: "Vücut Kitle İndeksi (VKİ), kilonuzu boyunuzun karesine bölerek hesaplanan bir değerdir. Genel sağlık durumunuz hakkında fikir verir." },
        { q: "Normal VKİ değeri nedir?", a: "Normal VKİ değeri 18.5 ile 24.9 arasındadır. 18.5'in altı zayıf, 25-29.9 arası fazla kilolu, 30 ve üzeri obez olarak değerlendirilir." },
        { q: "VKİ her zaman doğru mudur?", a: "VKİ genel bir göstergedir ancak kas kütlesi, kemik yoğunluğu ve yaş gibi faktörleri dikkate almaz. Sporcular için yanıltıcı olabilir." },
        { q: "VKİ'mi nasıl düşürebilirim?", a: "Dengeli beslenme ve düzenli egzersiz ile VKİ'nizi sağlıklı aralığa getirebilirsiniz. Bir sağlık uzmanına danışmanız önerilir." },
      ]
    : [
        { q: "What is BMI?", a: "Body Mass Index (BMI) is calculated by dividing your weight by the square of your height. It gives an indication of your general health status." },
        { q: "What is a normal BMI value?", a: "A normal BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is considered obese." },
        { q: "Is BMI always accurate?", a: "BMI is a general indicator but doesn't account for factors like muscle mass, bone density and age. It can be misleading for athletes." },
        { q: "How can I lower my BMI?", a: "You can bring your BMI to a healthy range through balanced nutrition and regular exercise. Consulting a health professional is recommended." },
      ];

  const guide = isTr ? (
    <>
      <h2>Vücut Kitle İndeksi (VKİ) Nedir?</h2>
      <p>
        Vücut Kitle İndeksi (VKİ veya İngilizce kısaltmasıyla BMI), bir kişinin
        kilosunun boyuna oranını değerlendiren, uluslararası kabul görmüş bir
        tarama ölçütüdür. 19. yüzyılda Belçikalı istatistikçi Adolphe Quetelet
        tarafından geliştirildiği için &quot;Quetelet indeksi&quot; olarak da
        bilinir. Dünya Sağlık Örgütü (WHO) tarafından yetişkinlerde kilo
        durumunu sınıflandırmak için kullanılır. VKİ, tek başına bir hastalık
        teşhisi koymaz; ancak fazla kilo veya obeziteye bağlı sağlık risklerini
        değerlendirmek için pratik bir başlangıç noktasıdır.
      </p>

      <h2>VKİ Nasıl Hesaplanır? Formül ve Örnek</h2>
      <p>
        VKİ formülü oldukça basittir: kilonuzu (kilogram cinsinden), boyunuzun
        metre cinsinden karesine bölersiniz:
      </p>
      <p>
        <strong>VKİ = Kilo (kg) ÷ Boy² (m²)</strong>
      </p>
      <p>
        Örneğin 75 kg ağırlığında ve 1,75 m boyundaki bir kişinin VKİ&apos;si şöyle
        hesaplanır: 75 ÷ (1,75 × 1,75) = 75 ÷ 3,0625 = <strong>24,5</strong>. Bu
        değer &quot;normal kilolu&quot; aralığının üst sınırına yakındır. Boyunu
        santimetre girenler için: 175 cm = 1,75 m şeklinde metreye çevirmek
        gerekir. Yukarıdaki hesaplayıcı bu dönüşümü ve bölme işlemini sizin için
        otomatik yapar.
      </p>

      <h2>VKİ Kategorileri (WHO Sınıflandırması)</h2>
      <table>
        <thead>
          <tr>
            <th>VKİ Aralığı</th>
            <th>Kategori</th>
            <th>Genel Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>18,5 altı</td><td>Zayıf</td><td>Beslenme yetersizliği riski</td></tr>
          <tr><td>18,5 – 24,9</td><td>Normal</td><td>Düşük risk</td></tr>
          <tr><td>25,0 – 29,9</td><td>Fazla kilolu</td><td>Orta düzey artmış risk</td></tr>
          <tr><td>30,0 – 34,9</td><td>Obez (Sınıf 1)</td><td>Yüksek risk</td></tr>
          <tr><td>35,0 – 39,9</td><td>Obez (Sınıf 2)</td><td>Çok yüksek risk</td></tr>
          <tr><td>40,0 ve üzeri</td><td>Aşırı obez (Sınıf 3)</td><td>Aşırı yüksek risk</td></tr>
        </tbody>
      </table>

      <h2>VKİ Neyi Ölçmez? Önemli Sınırlamalar</h2>
      <p>
        VKİ pratik bir tarama aracıdır ama vücut kompozisyonunu ayırt edemez.
        Kas ile yağı ayırt etmediği için bazı durumlarda yanıltıcı olabilir:
      </p>
      <ul>
        <li>
          <strong>Sporcular ve kas kütlesi yüksek kişiler:</strong> Kas, yağdan
          daha yoğundur. Bu nedenle vücut yağ oranı düşük bir vücut geliştirmeci,
          VKİ&apos;ye göre &quot;fazla kilolu&quot; hatta &quot;obez&quot;
          çıkabilir — oysa sağlık riski taşımaz.
        </li>
        <li>
          <strong>Yaşlılar:</strong> Yaşla birlikte kas kütlesi azalır. Normal
          VKİ değeri olan yaşlı bir kişinin bile vücut yağ oranı yüksek olabilir.
        </li>
        <li>
          <strong>Yağ dağılımı:</strong> VKİ, yağın nerede biriktiğini göstermez.
          Bel çevresinde biriken karın yağı (elma tipi), kalça bölgesindeki yağa
          (armut tipi) göre kalp-damar hastalıkları açısından daha risklidir.
        </li>
        <li>
          <strong>Hamileler ve çocuklar:</strong> Yetişkin VKİ aralıkları
          hamileler için geçerli değildir. Çocuklarda yaşa ve cinsiyete göre
          persentil eğrileri kullanılır.
        </li>
      </ul>

      <h2>VKİ&apos;yi Tamamlayan Ölçümler</h2>
      <p>
        Daha eksiksiz bir tablo için VKİ&apos;yi bel çevresi ölçümü ile birlikte
        değerlendirmek önerilir. Erkeklerde 102 cm, kadınlarda 88 cm üzeri bel
        çevresi, VKİ normal olsa bile artmış metabolik risk işaretidir. Bel/kalça
        oranı ve vücut yağ yüzdesi ölçümleri de tabloyu zenginleştirir.
      </p>

      <h2>Bu Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>Boyunuzu santimetre cinsinden girin (ör. 175).</li>
        <li>Kilonuzu kilogram cinsinden girin (ör. 75).</li>
        <li>VKİ değeriniz ve hangi kategoride olduğunuz anında görüntülenir.</li>
        <li>Sonucu, sağlık geçmişinizle birlikte bir uzmanla değerlendirin.</li>
      </ol>

      <h2>Sağlıklı VKİ Aralığını Korumak</h2>
      <p>
        VKİ&apos;nizi sağlıklı aralıkta tutmanın yolu, aşırı diyetlerden çok
        sürdürülebilir alışkanlıklardan geçer: dengeli ve porsiyon kontrollü
        beslenme, haftada en az 150 dakika orta yoğunlukta fiziksel aktivite,
        yeterli uyku ve stres yönetimi. Ani kilo verme veya alma durumlarında
        mutlaka bir hekime veya diyetisyene danışın.
      </p>

      <h2>Uyarı ve Kaynaklar</h2>
      <p>
        Bu araç yalnızca bilgilendirme amaçlıdır ve tıbbi teşhis yerine geçmez.
        VKİ değerlendirmesi Dünya Sağlık Örgütü (
        <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO</a>
        ) sınıflandırmasına dayanır. Sağlığınızla ilgili kararlar için{" "}
        <a href="https://www.saglik.gov.tr" target="_blank" rel="noopener noreferrer">T.C. Sağlık Bakanlığı</a>{" "}
        kaynaklarını ve bir sağlık uzmanının görüşünü esas alın.
      </p>
    </>
  ) : (
    <>
      <h2>What Is Body Mass Index (BMI)?</h2>
      <p>
        Body Mass Index (BMI) is an internationally recognized screening measure
        that assesses the ratio of a person&apos;s weight to their height.
        Developed in the 19th century by Belgian statistician Adolphe Quetelet,
        it is also known as the &quot;Quetelet index.&quot; The World Health
        Organization (WHO) uses it to classify weight status in adults. BMI does
        not diagnose any disease on its own, but it is a practical starting point
        for evaluating health risks associated with being underweight, overweight
        or obese.
      </p>

      <h2>How to Calculate BMI: Formula and Example</h2>
      <p>
        The BMI formula is simple: divide your weight (in kilograms) by the
        square of your height (in meters):
      </p>
      <p>
        <strong>BMI = Weight (kg) ÷ Height² (m²)</strong>
      </p>
      <p>
        For example, a person weighing 75 kg and 1.75 m tall has a BMI of: 75 ÷
        (1.75 × 1.75) = 75 ÷ 3.0625 = <strong>24.5</strong>, near the upper end of
        the &quot;normal weight&quot; range. If you enter height in centimeters
        (175 cm), it converts to 1.75 m. The calculator above handles this
        conversion and the division automatically.
      </p>

      <h2>BMI Categories (WHO Classification)</h2>
      <table>
        <thead>
          <tr><th>BMI Range</th><th>Category</th><th>General Risk</th></tr>
        </thead>
        <tbody>
          <tr><td>Below 18.5</td><td>Underweight</td><td>Risk of malnutrition</td></tr>
          <tr><td>18.5 – 24.9</td><td>Normal</td><td>Low risk</td></tr>
          <tr><td>25.0 – 29.9</td><td>Overweight</td><td>Moderately increased risk</td></tr>
          <tr><td>30.0 – 34.9</td><td>Obese (Class 1)</td><td>High risk</td></tr>
          <tr><td>35.0 – 39.9</td><td>Obese (Class 2)</td><td>Very high risk</td></tr>
          <tr><td>40.0 and above</td><td>Obese (Class 3)</td><td>Extremely high risk</td></tr>
        </tbody>
      </table>

      <h2>What BMI Does Not Measure: Key Limitations</h2>
      <p>
        BMI is a practical screening tool but cannot distinguish body
        composition. Because it does not separate muscle from fat, it can be
        misleading in some cases:
      </p>
      <ul>
        <li><strong>Athletes and muscular individuals:</strong> Muscle is denser than fat, so a lean bodybuilder may register as &quot;overweight&quot; or even &quot;obese&quot; despite low body fat.</li>
        <li><strong>Older adults:</strong> Muscle mass declines with age, so an elderly person with a normal BMI may still have high body fat.</li>
        <li><strong>Fat distribution:</strong> BMI does not show where fat is stored. Abdominal fat (apple shape) carries more cardiovascular risk than hip fat (pear shape).</li>
        <li><strong>Pregnant people and children:</strong> Adult BMI ranges do not apply during pregnancy, and children use age- and sex-specific percentile charts.</li>
      </ul>

      <h2>Measurements That Complement BMI</h2>
      <p>
        For a fuller picture, evaluate BMI alongside waist circumference. A waist
        above 102 cm in men or 88 cm in women signals increased metabolic risk
        even with a normal BMI. Waist-to-hip ratio and body-fat percentage add
        further detail.
      </p>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter your height in centimeters (e.g., 175).</li>
        <li>Enter your weight in kilograms (e.g., 75).</li>
        <li>Your BMI value and category appear instantly.</li>
        <li>Review the result with a professional in the context of your health history.</li>
      </ol>

      <h2>Maintaining a Healthy BMI Range</h2>
      <p>
        Keeping your BMI in a healthy range comes from sustainable habits rather
        than crash diets: balanced, portion-controlled nutrition, at least 150
        minutes of moderate physical activity per week, adequate sleep and stress
        management. Consult a doctor or dietitian for rapid weight changes.
      </p>

      <h2>Disclaimer and Sources</h2>
      <p>
        This tool is for informational purposes only and is not a substitute for
        medical diagnosis. BMI classification is based on{" "}
        <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">World Health Organization (WHO)</a>{" "}
        standards. Base health decisions on professional medical advice.
      </p>
    </>
  );

  return (
    <ToolLayout toolId="bmi-calculator" locale={locale} faq={faq} guide={guide}>
      <BmiCalculator />
    </ToolLayout>
  );
}
