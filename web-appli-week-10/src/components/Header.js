import {Link as RouterLink} from 'react-router-dom';
import React, {Suspense} from 'react'
import {useTranslation} from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button} from '@mui/material';

function Header() {
    const { t, i18n } = useTranslation();
    function changeLanguage(lang) {
        i18n.changeLanguage(lang)
    }    

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color='inherit' component={RouterLink} to='/'>{t("Home")}</Button>
                    <Button color='inherit' component={RouterLink} to='/about'>{t("About")}</Button>
                    <Button color='inherit' id="fi" onClick={()=> changeLanguage("fi")}>FI</Button>
                    <Button color='inherit' id="en" onClick={()=> changeLanguage("en")}>EN</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <Header />
        </Suspense>
    )

}
