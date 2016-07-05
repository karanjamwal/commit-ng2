import { OnInit, Component, ElementRef }                            from '@angular/core';  
import { Router, ActivatedRoute  }                                  from '@angular/router'; 
import { County, DonorChooseService, Proposal, DonorChooseObject }  from '../donorschoose/donorschoose.service';
import { kgrid }                                                    from '../../shared/kendo/grid';

import {
  MapsAPILoader,
  NoOpMapsAPILoader,
  MouseEvent,
  GOOGLE_MAPS_PROVIDERS,
  GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core';

declare var jQuery : any;
declare var L : any;
declare var map : any;

@Component({
    templateUrl: 'app/pages/donorschoose/donorschoose.component.html', 
    providers: [County,DonorChooseService],
    directives: [GOOGLE_MAPS_DIRECTIVES, kgrid]
})
 
 
export class DonorsChooseComponent  {

    info = "Donors Choose";
    options: any;
    projects: Proposal[];
    countyOptions: any;
    counties : County[];
    spinner = false;
    numberOfProjects = 242;
    amountNeeded = 2523.23;
    NuDistricts = 352;
    NuSchools = 23;  
    donorChooseObj : DonorChooseObject;
    selectedCounty:County = new County(); 

    constructor(
        public _donorService: DonorChooseService, 
        public element: ElementRef, 
        public _activatedRoute : ActivatedRoute,
        public _router: Router) { 
        
        this.selectedCounty.CountyID = "331"; 
    } 

    ngOnInit(): void { 
        debugger;
        this.spinner = false;
        
        this._activatedRoute.params.subscribe(params => {
            this.selectedCounty.CountyID = params['id'];
        })
        
        this.loadMap();
        this.fillGrid(this.selectedCounty.CountyID); 
        this.fillCountyOtpions();
    }

    public downloadExcel(){ 
        var fields = ['School', 'Title', 'Cost to Complete', 'City', 'Link']; 
        //this.json2Csv(this.projects, "County-Data", fields);
    }
 
    private createGrid() { 
        debugger;
        jQuery("#grid").kendoGrid({ 
            dataSource: {
                data: this.projects,
                schema: {
                    model: {
                        fields: {
                            schoolName: { type: "string" },
                            title: { type: "string" },
                            costToComplete: { type: "number" },
                            city: { type: "string" }
                        }
                    }
                }
                //pageSize: 20
            },
            //height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: [
                { field: "schoolName", title: "School", width: "130px", encoded: false },
                { field: "title", title: "Title", format: "{0:c}", width: "250px", encoded: false },
                { field: "costToComplete", title: "Cost to Complete", width: "130px" },
                { field: "city", title: "City", width: "130px" },
                { field: "proposalURL", title: "Link", width: "130px", template: "<a href='#= proposalURL#' target='_blank'>link</a>" } //, 
            ]
        });
    }

    private loadMap() {
        jQuery("#mapContainer").empty();   
        var mapDiv = jQuery("<div></div>").attr("id", "map-canvas-dc").height(548).css('border', '2px solid orange');
        mapDiv.appendTo("#mapContainer");
        map = L.map('map-canvas-dc').setView([28.984494999999999009787643444724380970001220703125, -95.9589940000000041209204937331378459930419921875], 10);
        L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

    }
  
    private fillGrid(county:string){      

        this._donorService.getDonorResult(county)
        .subscribe(data => 
        {  
            this.donorChooseObj = data; 
            this.projects = data.proposals;
            
            let temp : number = 0;
            let districts : string[] = [];
            let schools : string[] = [];

            this.loadMap();
            var markerLayer = L.featureGroup();

            this.numberOfProjects = this.projects.length;

            for(var project of this.projects) { 
                temp += +project.costToComplete;

                if(districts.indexOf(project.city) == -1) {
                    districts.push(project.city);
                }

                if(schools.indexOf(project.schoolName) == -1) {
                    schools.push(project.schoolName);
                }

                debugger;

                try
                {
                    var lat = project.latitude;
                    var lng = project.longitude;

                    //add marker 
                    if(typeof lat != "undefined" && typeof lng != "undefined"){
                        var marker = L.marker([parseFloat(lat), parseFloat(lng)], {
                            icon: L.icon({
                                iconUrl: 'app/assets/images/orange1.png',  
                            })
                        });
                        console.log(marker);
                        marker.bindPopup(project.schoolName + " : " + project.costToComplete);
                        marker.addTo(markerLayer);
                    }  
                }
                catch (error)
                {
                	console.log('Error while adding markers to map : ' + error);
                } 
            } 
            this.NuDistricts = districts.length;
            this.NuSchools = schools.length;
            this.amountNeeded = temp;
 
            markerLayer.addTo(map);
            map.fitBounds(markerLayer.getBounds());

            this.createGrid();
            
        },
        err => console.error(err),
        () => console.log('done'));
    }

    private changeCounty(county : any) : void{
      
        debugger;
        console.log(county);

        this.selectedCounty.CountyID = county;
        this.fillGrid(this.selectedCounty.CountyID);
        jQuery("#grid").kendoGrid('destroy').empty();
 
        //TODO
        if (this.selectedCounty.CountyID) { 
            this._router.navigateByUrl('/donorschoose/' + this.selectedCounty.CountyID);
        }
    }

    private fillCountyOtpions() {  
        this._donorService.getCountyOptions()
        .subscribe(x => this.counties = x); 
    } 

}