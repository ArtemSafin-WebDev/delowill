import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import phoneMask from './phoneMask';
import onlyNumeric from './onlyNumeric';
import fileUpload from './fileUpload';
import logoMenu from './logoMenu';
import goodsSlider from './goodsSlider';
import tabs from './tabs';
import accordions from './accordion';
import successStoriesSlider from './successStoriesSlider';
import formatSlider from './formatSlider';
import calculator from './calculator';
import whatIsIncludedChart from './whatIsIncludedChart';
import whatIsIncludedAdvancedView from './whatIsIncludedAdvancedView';
import vhUnits from './vhUnits';
import mobileReload from './mobileReload';
import datepicker from './datepicker';
import format from './format';
import anchorLinks from './anchorLinks';
import modals from './modals';
import franchiseMenu from './franchiseMenu';
import sectionsMenu from './sectionsMenu';
import franchiseCatalog from './franchiseCatalog';
import showMoreBtns from './showMoreBtns';
import articles from './articles';
import projectNewsSlider from './projectNewsSlider';
import players from './players';
import axios from 'axios';
import newCalculator from './calculatorNew';

document.addEventListener('DOMContentLoaded', function() {
    
    polyfills();
    detectTouch();
    vhUnits();
    setScrollbarWidth();
    validation();
    customSelects();
    phoneMask();
    onlyNumeric();
    fileUpload();
    logoMenu();
    goodsSlider();
    tabs();
    accordions();
    successStoriesSlider();
    formatSlider();
    // calculator();
    newCalculator();
    whatIsIncludedChart();
    whatIsIncludedAdvancedView();
    datepicker();
    format();
    anchorLinks();
    modals();
    franchiseMenu();
    sectionsMenu();
    franchiseCatalog();
    showMoreBtns();
    articles();
    projectNewsSlider();
    players();

    window.axios = axios;
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
