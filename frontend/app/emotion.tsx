"use client";
import { CacheProvider } from "@emotion/react";
import { useEmotionCache, MantineProvider } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

export default function RootStyleRegistry({
  children
}: {
  children: React.ReactNode
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={
        `${cache.key} ${Object.keys(cache.inserted).join(" ")}`
      }
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <NextUIProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {children}
        </MantineProvider>
      </NextUIProvider>
    </CacheProvider>
  )
}