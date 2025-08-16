KJE.LunchSaverCalc=function(){this.NBR_PERIODS=12;
this.PERC_RESULTS_FACTOR=100;
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Your bagged lunch cost must be less than eating out.");
this.cats=null;
this.DS_SAVINGS=null;
this.sSchedule=new KJE.Repeating()
};
KJE.LunchSaverCalc.prototype.clear=function(){this.YEARS_TO_SAVE=0;
this.AMT_SAVE_MONTH=0;
this.ROR_INVEST=0;
this.EAT_OUT_PRICE=0;
this.BAGGED_PRICE=0;
this.NUMBER_BAGGED=0
};
KJE.LunchSaverCalc.prototype.calculate=function(n){var I=KJE;
var F=this.YEARS_TO_SAVE;
var G=this.AMT_SAVE_MONTH;
var A=this.ROR_INVEST;
var B=this.EAT_OUT_PRICE;
var L=this.BAGGED_PRICE;
var D=this.NUMBER_BAGGED;
var x=0;
var v=0;
var G=0;
G=(B-L)*D;
if(G<0){throw (this.MSG_ERROR1)
}x=KJE.ROR_MONTH(A/this.PERC_RESULTS_FACTOR);
v=KJE.FV_BEGIN(x,F*this.NBR_PERIODS,G);
var E=Math.round(F);
var z=0;
this.DS_SAVINGS=KJE.FloatArray(E);
this.cats=new Array(E);
if(n){var H=this.sSchedule;
H.clearRepeat();
H.addHeader(H.sReportCol("Year",1),H.sReportCol("Lunch Savings",2),H.sReportCol("Interest",3),H.sReportCol("Savings Total",4))
}var i=0;
var w=0;
var J=0;
var K=0;
var y=0;
for(var C=1;
C<=E;
C++){z=C-1;
this.cats[z]=KJE.MSG_YEAR_LBL+" "+I.number(C);
i=KJE.FV_BEGIN(x,C*this.NBR_PERIODS,G);
this.DS_SAVINGS[z]=(i);
if(n){H.addRepeat(this.cats[z],I.dollars(this.NBR_PERIODS*G),I.dollars(i-y-this.NBR_PERIODS*G),I.dollars(i))
}y=i
}this.ROR_PERIOD_PERC=x;
this.AMOUNT_SAVED_BTI=v;
this.AMT_SAVE_MONTH=G
};
KJE.LunchSaverCalc.prototype.formatReport=function(b){b.year("YEARS_TO_SAVE",this.YEARS_TO_SAVE);
b.dollars("AMT_SAVE_MONTH",this.AMT_SAVE_MONTH);
b.dollars("AMT_SAVE_YEAR",this.AMT_SAVE_MONTH*12);
b.returnRate("ROR_INVEST",this.ROR_INVEST/100);
b.returnRate("ROR_PERIOD_PERC",this.ROR_PERIOD_PERC);
b.dollars("AMOUNT_SAVED_BTI",this.AMOUNT_SAVED_BTI);
b.dollars("EAT_OUT_PRICE",this.EAT_OUT_PRICE);
b.dollars("BAGGED_PRICE",this.BAGGED_PRICE);
b.dollars("BAGGED_SAVINGS",this.EAT_OUT_PRICE-this.BAGGED_PRICE);
b.number("NUMBER_BAGGED",this.NUMBER_BAGGED);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CalcName="Lunch Savings Calculator";
KJE.CalcType="LunchSaver";
KJE.CalculatorTitleTemplate="After KJE1 years you could have KJE2.";
KJE.parseInputs=function(b){return b
};
KJE.initialize=function(){KJE.CalcControl=new KJE.LunchSaverCalc();
KJE.GuiControl=new KJE.LunchSaver(KJE.CalcControl)
};
KJE.LunchSaver=function(k){var l=KJE;
var n=KJE.gLegend;
var i=KJE.inputs.items;
this.bYears=false;
this.bRateofReturn=false;
this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Balance end of year");
KJE.NumberSlider("YEARS_TO_SAVE","Years to save",1,20,0);
KJE.DollarSlider("EAT_OUT_PRICE","Eating out lunch price",1,50,2,1);
KJE.DollarSlider("BAGGED_PRICE","Cost of bagged lunch",1,50,2,1);
KJE.InvestRateSlider("ROR_INVEST","Expected Rate of return");
KJE.NumberSlider("NUMBER_BAGGED","Bagged lunches per month",1,30,0);
KJE.Label("AMT_SAVE_MONTH","Monthly savings");
var j=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Lunch Savings Totals by Year"));
j._showItemLabel=true;
j._showItemLabelOnTop=true;
j._axisX._fSpacingPercent=0.1;
j._legend.setVisible(false);
j._bPopDetail=true;
var m=KJE.parameters.get("MSG_DROPPER_TITLE","Lunch Inputs:");
var o=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 years saving KJE2 per lunch at KJE3");
var p=function(){return m+KJE.subText(KJE.getKJEReplaced(o,i.YEARS_TO_SAVE.getFormatted(),l.dollars(k.BAGGED_SAVINGS,2),i.ROR_INVEST.getFormatted(),i.NUMBER_BAGGED.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,m,p),KJE.colorList[0])
};
KJE.LunchSaver.prototype.setValues=function(c){var d=KJE.inputs.items;
c.YEARS_TO_SAVE=d.YEARS_TO_SAVE.getValue();
c.ROR_INVEST=d.ROR_INVEST.getValue();
c.EAT_OUT_PRICE=d.EAT_OUT_PRICE.getValue();
c.BAGGED_PRICE=d.BAGGED_PRICE.getValue();
c.NUMBER_BAGGED=d.NUMBER_BAGGED.getValue()
};
KJE.LunchSaver.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
KJE.setTitleTemplate(i.number(h.YEARS_TO_SAVE),i.dollars(h.AMOUNT_SAVED_BTI));
g.removeAll();
g.setTitleTemplate(i.number(h.YEARS_TO_SAVE));
g.setGraphCategories(h.cats);
if(h.DS_SAVINGS.length<5){g._showItemLabel=true
}else{g._showItemLabel=false
}g.add(new KJE.gGraphDataSeries(h.DS_SAVINGS,this.MSG_GRAPH2,g.getColor(1)));
g.paint();
f.AMT_SAVE_MONTH.setText(i.dollars(h.AMT_SAVE_MONTH,2))
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-BAGGED_PRICE'><input id='KJE-BAGGED_PRICE' /></div> <div id='KJE-C-EAT_OUT_PRICE'><input id='KJE-EAT_OUT_PRICE' /></div> <div id='KJE-C-NUMBER_BAGGED'><input id='KJE-NUMBER_BAGGED' /></div> <div id='KJE-C-ROR_INVEST'><input id='KJE-ROR_INVEST' /></div> <div id='KJE-C-YEARS_TO_SAVE'><input id='KJE-YEARS_TO_SAVE' /></div> <div id='KJE-C-AMT_SAVE_MONTH'><div id='KJE-AMT_SAVE_MONTH'></div></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-BAGGED_PRICE' ><dt>Cost of bagged lunch</dt><dd>Average cost of bringing a bagged lunch from home. Make sure to include the total cost of your lunch. If you buy a drink (instead of packing it) make sure to include that amount here.</dd></div> <div id='KJE-D-EAT_OUT_PRICE' ><dt>Eating out lunch price</dt><dd>Average price of your lunch when you buy your meal.</dd></div> <div id='KJE-D-NUMBER_BAGGED' ><dt>Number of bagged lunches per month</dt><dd>The number of lunches you will bring from home each month. The average number of working days in a month is about 20.</dd></div> <div id='KJE-D-ROR_INVEST' ><dt>Expected rate of return</dt><dd>This is the annually compounded rate of return you expect from your investments. If you pay taxes on the interest, dividends or capital gains from these investments you may wish to enter your after-tax rate of return. <p>**ROR_DEFINITION**</dd></div> <div id='KJE-D-YEARS_TO_SAVE' ><dt>Years to save</dt><dd>The number of years you are going to save your lunch money.</dd></div> <div id='KJE-D-AMT_SAVE_MONTH' ><dt>Monthly savings</dt><dd>Total you should be able to save each month by bringing your lunches from home.</dd></div> ";
KJE.ReportText=' <!--HEADING "Lunch Savings" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Your lunch savings could be worth AMOUNT_SAVED_BTI after YEARS_TO_SAVE years. </h2> To save AMOUNT_SAVED_BTI, you need to bring NUMBER_BAGGED bagged lunches from home per month. This assumes that you save an average of BAGGED_SAVINGS per lunch, which equals AMT_SAVE_MONTH per month. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Cost of bagged lunch</th><td class="KJECell KJECell30">BAGGED_PRICE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Eating out lunch price</th><td class="KJECell">EAT_OUT_PRICE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Number of bagged lunches</th><td class="KJECell">NUMBER_BAGGED per month</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly lunch savings</th><td class="KJECell">AMT_SAVE_MONTH</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual lunch savings</th><td class="KJECell">AMT_SAVE_YEAR</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Expected rate of return</th><td class="KJECell">ROR_INVEST</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total savings after YEARS_TO_SAVE years</th><td class="KJECellStrong">AMOUNT_SAVED_BTI</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Lunch Savings by Year</h2> **REPEATING GROUP** ';
KJE.parameters.set("AMT_SAVE_MONTH",200);
KJE.parameters.set("BAGGED_PRICE",3);
KJE.parameters.set("EAT_OUT_PRICE",6.5);
KJE.parameters.set("NUMBER_BAGGED",20);
KJE.parameters.set("ROR_INVEST",KJE.Default.RORMarket);
KJE.parameters.set("YEARS_TO_SAVE",4);