import React from 'react';
import { renderToStaticMarkup } from "react-dom/server";
import enTrans from "assets/translations/en.translation.json";
import vnTrans from "assets/translations/vn.translation.json";
import cnTrans from "assets/translations/cn.translation.json";
import idTrans from "assets/translations/id.translation.json";
import jpTrans from "assets/translations/jp.translation.json";
import khTrans from "assets/translations/kh.translation.json";
import krTrans from "assets/translations/kr.translation.json";
import laTrans from "assets/translations/la.translation.json";
import thTrans from "assets/translations/th.translation.json";
import myTrans from "assets/translations/my.translation.json";

const onMissingTranslation = ({translationId, languageCode}) => {
    return translationId;
}

class LocalizedComponent extends React.Component {
    constructor(props) {
        super(props);

        const languages = ['en', 'vn', 'cn', 'id', 'jp', 'kh', 'kr', 'la', 'my', 'th'];
        const defaultLanguage = localStorage.getItem("languageCode") || languages[0];

        this.props.initialize({
            languages,
            options: {
                renderToStaticMarkup,
                defaultLanguage,
                onMissingTranslation, 
                renderInnerHtml: true
            }
        });

        this.props.addTranslationForLanguage(enTrans, 'en');
        this.props.addTranslationForLanguage(vnTrans, 'vn');
        this.props.addTranslationForLanguage(cnTrans, 'cn');
        this.props.addTranslationForLanguage(idTrans, 'id');
        this.props.addTranslationForLanguage(jpTrans, 'jp');
        this.props.addTranslationForLanguage(khTrans, 'kh');
        this.props.addTranslationForLanguage(krTrans, 'kr');
        this.props.addTranslationForLanguage(laTrans, 'la');
        this.props.addTranslationForLanguage(myTrans, 'my');
        this.props.addTranslationForLanguage(thTrans, 'th');
    }



}

export default LocalizedComponent;
