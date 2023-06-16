"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import styled from "styled-components";
import { device } from "@/devices";
import { restart } from "@/redux/appReducer";

export default function LocaleSwitcher() {
  const dispatch = useDispatch();
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onClickLocale(locale: string) {
    dispatch(restart());
    router.replace(`/${locale}${pathname}`);
  }

  return (
    <LocaleContainer>
      {["en", "ch"].map((selectionLocale) => (
        <Locale
          key={selectionLocale}
          onClick={() => onClickLocale(selectionLocale)}
          $activeLocale={locale}
          $selectionLocale={selectionLocale}
        >
          {t(selectionLocale)}
        </Locale>
      ))}
    </LocaleContainer>
  );
}

const LocaleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

const Locale = styled.div<{ $activeLocale: string; $selectionLocale: string }>`
  font-size: calc(15px + 0.5vw);
  margin: 10px;
  font-weight: ${(props) =>
    !props.$activeLocale || props.$activeLocale === props.$selectionLocale
      ? "900"
      : "normal"};
  color: ${(props) =>
    !props.$activeLocale || props.$activeLocale === props.$selectionLocale
      ? "#700a02"
      : "black"};
  cursor: pointer;
`;
