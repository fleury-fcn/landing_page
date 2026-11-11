import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** « / » renvoie vers la langue par défaut (meta refresh en export statique). */
export default function RootPage(): never {
  redirect(`/${defaultLocale}/`);
}
