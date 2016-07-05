export class AppSettings { 

    public static get API_ENDPOINT(): string {
        return 'http://commitstaging.azurewebsites.net'; 
    }

    public static get LIST_TABLE_API_ENDPOINT(): string {
        return `${AppSettings.API_ENDPOINT}/api/dictionary/ListTables?year={year}`; 
    }

    public static get SELECTED_TABLE_API_ENDPOINT(): string {
        return `${AppSettings.API_ENDPOINT}/api/dictionary/Get?selectedTable={selectedTable}&selectedYear={selectedYear}`; 
    }

    public static get DONOR_CHOOSE_API_ENDPOINT(): string {
        return 'http://api.donorschoose.org/common/json_feed.html?state=TX&Community={0}:1&APIKey=vmspm5ygamje&concise=true&description=true'; 
    }

    public static get DONOR_COUNTIES_LOCAL_JSON_ENDPOINT(): string {
        return 'app/assets/data/donorsCounties.json'; 
    }

    public static get SVG_TEMPLATE_LOCAL_ENDPOINT(): string {
        return 'app/assets/images/page{imageId}.svg'; 
    }
}