import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function MyContainer() {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <h1 id="">{t("Frontpage")}</h1>
        </div>
    );
}

// i18n translations might still be loaded by the http backend
// use react's Suspense
export default function App() {
    return (
      <Suspense fallback="loading">
        <MyContainer />
      </Suspense>
    );
}