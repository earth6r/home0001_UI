import React from "react";
import { graphql, useStaticQuery } from "gatsby";

// This module enables multiple currencies to be used around the site and update them centrally on the site settings page in the CMS
// ./serializers.js imports this module to display annotations/marks in richtext/bodytext components
// /studio/schemas/modules standardText.js and /studio/schemas/objexts/bodyPortableText.js enable this module in standartText and flexGallery components respectively
// /schemas/documents/siteSettings.js contains the exchange rate variables which are queried here and updated in the CMS

const CurrencyTranslator = (annotationProps) => {


    function getExchangeRate(currencyRequest): number {
        const queryData = useStaticQuery(graphql`
            {
                settings:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
                    exchangeRateUSDBTC
                    exchangeRateUSDETH
                }
            }
        `);

        const { currencyFrom, currencyTo } = currencyRequest;
        let exchangeRate: number;
        if (currencyFrom && currencyTo) {
            if (currencyFrom == 'usd' && currencyTo == 'btc') {
                exchangeRate = queryData.settings.exchangeRateUSDBTC
            }
            else if (currencyFrom == 'usd' && currencyTo == 'eth') {
                exchangeRate = queryData.settings.exchangeRateUSDETH
            }
        }
        else exchangeRate = 0;

        return exchangeRate
    }
    
    // get the values from the cms mark/annotaion. decimalPlaces can be positive or negative to remove add digits after or round before the decimal place
    const { currencyFrom, currencyTo, amountUSD = 0, decimalPlaces = 0 } = annotationProps;

    // multiply amountUSD by the exchange rate
    // multiply that by 10^decimalPlaces to move left or right of decimal
    // Round the number
    // divide by 10^decimalPlaces to return position relative to decimal place
    const translatedCurrency = (Math.round((getExchangeRate({ currencyFrom, currencyTo }) * amountUSD) * Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces);

    // add commas e.g. 100,000 using toLocaleString()
    return (
        <>
            <span>{ translatedCurrency.toLocaleString("en-US", { maximumFractionDigits: decimalPlaces > 0? decimalPlaces : 0 }) }</span>
        </>
    );
};

export default CurrencyTranslator;
