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

  return (
    <ToolLayout toolId="bmi-calculator" locale={locale} faq={faq}>
      <BmiCalculator />
    </ToolLayout>
  );
}
