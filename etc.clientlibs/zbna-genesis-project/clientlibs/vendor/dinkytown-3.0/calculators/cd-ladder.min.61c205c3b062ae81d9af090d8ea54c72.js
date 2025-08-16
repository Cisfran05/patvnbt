KJE.parameters.set("MONTHLY_RATE1",0.03);
KJE.parameters.set("MONTHLY_RATE6",0.05);
KJE.parameters.set("MONTHLY_RATE12",0.1);
KJE.parameters.set("MONTHLY_RATE18",0.12);
KJE.parameters.set("MONTHLY_RATE24",0.15);
KJE.parameters.set("MONTHLY_RATE30",0.17);
KJE.parameters.set("MONTHLY_RATE36",0.2);
KJE.parameters.set("MONTHLY_RATE42",0.2);
KJE.parameters.set("MONTHLY_RATE48",0.3);
KJE.parameters.set("MONTHLY_RATE60",0.45);
KJE.CDLadderCalc=function(){this.TOTAL_TO_INVEST=0;
this.FUND_INDEX=KJE.Default.CD_MATURE_ANNUAL;
this.FUND_ACCESS=0;
this.OLD_FUND_ACCESS=0;
this.PERIODIC_AMOUNT_AVAILABLE=0;
this.CD_STARTING_AMOUNT=0;
this.MSG_LADDER_ROW=KJE.parameters.get("MSG_LADDER_ROW","<tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>qq</th><td class='KJECell KJECellBorder'>CD_TIME_LABELqq</td><td class='KJECell KJECellBorder '>CD_RATE_OF_RETURNqq</td><td class='KJECell KJECellBorder '>CD_APYqq</td><td class='KJECell KJECellBorder'>CD_STARTING_AMOUNT</td><td class='KJECell '>CD_FIRST_MATURITYqq</td></tr>");
this.MSG_LADDER_RESULT=KJE.parameters.get("MSG_LADDER_RESULT","You will have earned MSG_AMOUNT using CD Laddering.*");
this.MSG_MORE=KJE.parameters.get("MSG_MORE","more");
this.MSG_LESS=KJE.parameters.get("MSG_LESS","less");
this.MSG_CALC_AMOUNT=KJE.parameters.get("MSG_CALC_AMOUNT","CALC_AMOUNT MSG_CHANGE");
this.CALC_AMOUNT="";
this.LADDER_RESULT="";
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Longest maturity can't exceed 360 months (30 years)");
this.dRatesOfReturn=KJE.FloatArray(360);
for(var b=1;
b<=this.dRatesOfReturn.length;
b++){this.setPeriodRate(b,KJE.parameters.get("MONTHLY_RATE"+b,0))
}this.NUMBER_OF_CDS=-1;
this.OLD_NUMBER_OF_CDS=-1;
this.MIN_NUMBER_CDS=KJE.parameters.get("MIN_NUMBER_CDS",1);
this.CD_LADDER_TOTAL=0;
this.SINGLE_CD_TOTAL=0;
this.LADDER_DIFFERENCE=0;
this.COMPOUND_INDEX=KJE.Default.COMPOUND_ANNUALLY;
this.COMPOUND_DESC="";
this.CD_MAX_COUNT=10;
this.CD_RATE_OF_RETURN=KJE.FloatArray(this.CD_MAX_COUNT);
this.CD_MONTHS=new Array(this.CD_MAX_COUNT);
[];
this.CD_FINAL_BALANCE=KJE.FloatArray(this.CD_MAX_COUNT);
this.CD_FIRST_MATURITY=KJE.FloatArray(this.CD_MAX_COUNT);
this.CD_INTEREST_EARNED=KJE.FloatArray(this.CD_MAX_COUNT);
this.CD_APY=KJE.FloatArray(this.CD_MAX_COUNT);
this.CD_TIME_LABEL=new Array(this.CD_MAX_COUNT);
this.cats=null;
this.sSchedule=new KJE.Repeating()
};
KJE.CDLadderCalc.prototype.clear=function(){};
KJE.CDLadderCalc.prototype.calculate=function(p){var y=KJE;
var s=KJE.Default.COMPOUND_DESC[this.COMPOUND_INDEX];
var q=KJE.Default.COMPOUND_VALUE[this.COMPOUND_INDEX];
this.COMPOUND_DESC=KJE.Default.COMPOUND_SELECTIONS[this.COMPOUND_INDEX];
this.FUND_ACCESS=KJE.Default.CD_MATURE_VALUE[this.FUND_INDEX];
var u=this.TOTAL_TO_INVEST;
var i=Math.floor(u/this.PERIODIC_AMOUNT_AVAILABLE);
if(i<this.MIN_NUMBER_CDS){i=this.MIN_NUMBER_CDS
}if(i>this.CD_RATE_OF_RETURN.length){i=this.CD_RATE_OF_RETURN.length
}this.DR_BALANCE=KJE.FloatArray(i);
this.DR_SINGLE_BALANCE=KJE.FloatArray(i);
this.DR_CD_BALANCE=KJE.FloatArray(i);
this.CD_STARTING_AMOUNT=y.round(u/i,2);
for(var z=0;
z<this.CD_FINAL_BALANCE.length;
z++){this.CD_FINAL_BALANCE[z]=0;
this.CD_INTEREST_EARNED[z]=0;
this.CD_APY[z]=0;
this.CD_MONTHS[z]=0;
this.CD_TIME_LABEL[z]=""
}for(var z=0;
z<this.CD_MAX_COUNT;
z++){this.CD_MONTHS[z]=this.FUND_ACCESS*(z+1);
this.CD_TIME_LABEL[z]=KJE.getTermLabel(this.CD_MONTHS[z],false);
if(this.CD_MONTHS[z]>360&&z<i){throw (this.MSG_ERROR1)
}var x=this.getPeriodRate(this.CD_MONTHS[z]);
if((this.OLD_NUMBER_OF_CDS==-1&&this.CD_RATE_OF_RETURN[z])||(this.CD_RATE_OF_RETURN[z]>0&&this.CD_RATE_OF_RETURN[z]!=x&&this.OLD_NUMBER_OF_CDS==i&&this.OLD_FUND_ACCESS==this.FUND_ACCESS)){this.setPeriodRate(this.CD_MONTHS[z],this.CD_RATE_OF_RETURN[z])
}else{this.CD_RATE_OF_RETURN[z]=x
}}var n=(this.CD_RATE_OF_RETURN[i-1]/100)/q;
this.CD_LADDER_TOTAL=0;
for(var z=0;
z<i;
z++){var r=(this.CD_RATE_OF_RETURN[z]/100)/q;
this.CD_APY[z]=KJE.FV_AMT((this.CD_RATE_OF_RETURN[z]/100)/q,q,1)-1;
this.CD_FIRST_MATURITY[z]=y.round(KJE.FV_AMT(r,(q/12)*this.CD_MONTHS[z],this.CD_STARTING_AMOUNT),2);
if(z==(i-1)){this.CD_FINAL_BALANCE[z]=this.CD_FIRST_MATURITY[z]
}else{this.CD_FINAL_BALANCE[z]=y.round(KJE.FV_AMT(n,(q/12)*((i*this.FUND_ACCESS)-this.CD_MONTHS[z]),this.CD_FIRST_MATURITY[z]),2)
}this.CD_INTEREST_EARNED[z]=this.CD_FINAL_BALANCE[z]-this.CD_STARTING_AMOUNT;
this.CD_LADDER_TOTAL+=this.CD_FINAL_BALANCE[z]
}this.OLD_NUMBER_OF_CDS=i;
this.OLD_FUND_ACCESS=this.FUND_ACCESS;
for(var z=0;
z<i;
z++){this.DR_CD_BALANCE[z]=0;
for(var v=0;
v<i;
v++){if(z==i-1){this.DR_CD_BALANCE[z]+=this.CD_FINAL_BALANCE[v]
}else{if(v<=z){this.DR_CD_BALANCE[z]+=this.CD_FIRST_MATURITY[v];
if(v<z){this.DR_CD_BALANCE[z]+=y.round(KJE.FV_AMT(n,(q/12)*((z-v)*this.FUND_ACCESS),this.CD_FIRST_MATURITY[v])-this.CD_FIRST_MATURITY[v],2)
}}else{var x=(this.CD_RATE_OF_RETURN[v]/100)/q;
this.DR_CD_BALANCE[z]+=y.round(KJE.FV_AMT(x,(q/12)*((z+1)*this.FUND_ACCESS),this.CD_STARTING_AMOUNT),2)
}}}}var t=(this.CD_RATE_OF_RETURN[0]/100)/q;
this.SINGLE_CD_TOTAL=0;
for(var z=0;
z<i;
z++){this.DR_SINGLE_BALANCE[z]=y.round(KJE.FV_AMT(t,(q/12)*this.FUND_ACCESS,(z==0?this.TOTAL_TO_INVEST:this.DR_SINGLE_BALANCE[z-1])),2);
this.DR_BALANCE[z]=this.DR_CD_BALANCE[z]
}this.SINGLE_CD_TOTAL=this.DR_SINGLE_BALANCE[i-1];
if(p){var w=this.sSchedule;
w.clearRepeat();
w.addHeader(w.sReportCol("Month",1),w.sReportCol("Balance of Single CD",2),w.sReportCol("Balance of CD Ladder",3))
}this.cats=KJE.FloatArray(i);
for(var v=0;
v<i;
v++){this.cats[v]=""+this.CD_MONTHS[v];
if(p){w.addRepeat(y.number(this.CD_MONTHS[v]),y.dollars(this.DR_SINGLE_BALANCE[v],2),y.dollars(this.DR_BALANCE[v],2))
}}this.LADDER_DIFFERENCE=this.CD_LADDER_TOTAL-this.SINGLE_CD_TOTAL;
this.CALC_AMOUNT=KJE.replace("CALC_AMOUNT",(this.LADDER_DIFFERENCE>0?y.dollars(this.LADDER_DIFFERENCE,2):y.dollars(this.LADDER_DIFFERENCE*-1,2)),KJE.replace("MSG_CHANGE",(this.LADDER_DIFFERENCE>0?this.MSG_MORE:this.MSG_LESS),this.MSG_CALC_AMOUNT));
this.LADDER_RESULT=KJE.replace("MSG_TERM",this.CD_TIME_LABEL[i-1],KJE.replace("MSG_AMOUNT",this.CALC_AMOUNT,this.MSG_LADDER_RESULT));
this.sFreq=s;
this.NUMBER_OF_CDS=i
};
KJE.CDLadderCalc.prototype.formatReport=function(e){e.dollars("TOTAL_TO_INVEST",this.TOTAL_TO_INVEST);
e.replace("COMPOUND_DESC",this.COMPOUND_DESC);
e.number("NUMBER_OF_CDS",this.NUMBER_OF_CDS,0);
e.dollars("CD_LADDER_TOTAL",this.CD_LADDER_TOTAL);
e.dollars("SINGLE_CD_TOTAL",this.SINGLE_CD_TOTAL);
e.replace("CD_TIME_LONGEST",this.CD_TIME_LABEL[this.NUMBER_OF_CDS-1]);
e.number("FUND_ACCESS",this.FUND_ACCESS);
e.dollars("PERIODIC_AMOUNT_AVAILABLE",this.PERIODIC_AMOUNT_AVAILABLE);
e.replace("CALC_AMOUNT",this.CALC_AMOUNT);
e.replace("LADDER_RESULT",this.LADDER_RESULT);
var f="";
for(var d=0;
d<this.NUMBER_OF_CDS;
d++){f+=KJE.replace("qq",""+(d+1),this.MSG_LADDER_ROW)
}e.replace("<!--**CD_LADDER**-->",f);
for(var d=this.NUMBER_OF_CDS-1;
d>=0;
d--){e.returnRate("CD_RATE_OF_RETURN"+(d+1),this.CD_RATE_OF_RETURN[d]/100);
e.number("CD_MONTHS"+(d+1),this.CD_MONTHS[d],0);
e.dollars("CD_FINAL_BALANCE"+(d+1),this.CD_FINAL_BALANCE[d]);
e.dollars("CD_FIRST_MATURITY"+(d+1),this.CD_FIRST_MATURITY[d]);
e.dollars("CD_INTEREST_EARNED"+(d+1),this.CD_INTEREST_EARNED[d]);
e.percent("CD_APY"+(d+1),this.CD_APY[d],3);
e.replace("CD_TIME_LABEL"+(d+1),this.CD_TIME_LABEL[d])
}e.dollars("CD_STARTING_AMOUNT",this.CD_STARTING_AMOUNT);
e.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CDLadderCalc.prototype.setPeriodRate=function(d,c){if(d>360){return
}if(d<1){return
}if(c>20){return
}if(c<=0){return
}this.dRatesOfReturn[d-1]=c
};
KJE.CDLadderCalc.prototype.getPeriodRate=function(d){if(d>360){d=360
}if(d<=0){d=1
}d--;
for(var c=d;
c>=0;
c--){if(this.dRatesOfReturn[c]!=0){return this.dRatesOfReturn[c]
}}return this.dRatesOfReturn[0]
};
KJE.Default.COMPOUND_DAILY=0;
KJE.Default.COMPOUND_MONTHLY=1;
KJE.Default.COMPOUND_QRTLY=2;
KJE.Default.COMPOUND_SEMI=3;
KJE.Default.COMPOUND_ANNUALLY=4;
KJE.Default.COMPOUND_SELECTIONS=["compound daily","compound monthly","compound quarterly","compound semi-annually","compound annually"];
KJE.Default.COMPOUND_DESC=["Day","Month","Quarter","Semi-annual","Year"];
KJE.Default.COMPOUND_VALUE=[360,12,4,2,1];
KJE.Default.COMPOUND_INDEX=[0,1,2,3,4];
KJE.Default.CD_MATURE_ANNUAL=3;
KJE.Default.CD_MATURE_SELECTIONS=["3 months","6 months","9 months","12 months","18 months","24 months"];
KJE.Default.CD_MATURE_VALUE=[3,6,9,12,18,24];
KJE.Default.CD_MATURE_INDEX=[0,1,2,3,4,5];
KJE.CalcName="CD Ladder Calculator";
KJE.CalcType="CDLadder";
KJE.CalculatorTitle="CD Ladder Calculator";
KJE.parseInputs=function(c){var d=KJE.getDropBox("FUND_INDEX",KJE.parameters.get("FUND_INDEX",KJE.Default.CD_MATURE_ANNUAL),KJE.Default.CD_MATURE_INDEX,KJE.Default.CD_MATURE_SELECTIONS);
c=KJE.replace("**FUND_INDEX**",d,c);
d=KJE.getDropBox("COMPOUND_INDEX",KJE.parameters.get("COMPOUND_INDEX",KJE.Default.COMPOUND_ANNUALLY),KJE.Default.COMPOUND_INDEX,KJE.Default.COMPOUND_SELECTIONS);
c=KJE.replace("**COMPOUND_INDEX**",d,c);
c=KJE.replace("**MSG_LADDER_FOOTER**",KJE.parameters.get("MSG_LADDER_FOOTER","*Note that at the end of the time period shown, only a portion of your CD Ladder balance is liquid, while the entire Single CD balance is liquid."),c);
return c
};
KJE.initialize=function(){KJE.CalcControl=new KJE.CDLadderCalc();
KJE.GuiControl=new KJE.CDLadder(KJE.CalcControl)
};
KJE.CDLadder=function(m){var q=KJE;
var u=KJE.gLegend;
var p=KJE.inputs.items;
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","CD Ladder");
this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Single CD");
KJE.DollarSlider("TOTAL_TO_INVEST","Total to invest",KJE.parameters.get("CD_MINIMUM",500),100000000,0,0,4);
KJE.DollarSlider("PERIODIC_AMOUNT_AVAILABLE","Amount in each CD",KJE.parameters.get("CD_MINIMUM",500),KJE.parameters.get("CD_MAXIMUM",1000000));
KJE.DropBox("COMPOUND_INDEX","Interest is compounded");
KJE.DropBox("FUND_INDEX","Frequency of maturing CD");
KJE.Label("NUMBER_OF_CDS","CDs in ladder",null,null,"KJEBold");
var n=KJE.parameters.get("MSG_CD_RATE_OF_RETURN","CD interest rate");
for(var s=0;
s<m.CD_MAX_COUNT;
s++){KJE.PercentSlider("CD_RATE_OF_RETURN"+(s+1),n,0,20,2)
}var o=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],this.MSG_LADDER_RESULT);
o._legend._iOrientation=(u.TOP_RIGHT);
o._titleXAxis.setText(KJE.parameters.get("MSG_LABEL11","Months"));
var v=KJE.parameters.get("MSG_DROPPER_TITLE","CD Ladder inputs:");
var t=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Total to invest KJE1, Amount per CD KJE2, CDs mature every KJE3 months");
var r=function(){return v+KJE.subText(KJE.getKJEReplaced(t,p.TOTAL_TO_INVEST.getFormatted(),p.PERIODIC_AMOUNT_AVAILABLE.getFormatted(),q.number(m.FUND_ACCESS)),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,v,r),KJE.colorList[0]);
var l=KJE.parameters.get("MSG_DROPPER2_TITLE","CD Interest Rates:");
KJE.addDropper(new KJE.Dropper("INPUTS2",false,l,l),KJE.colorList[0]);
KJE.addDiv("FOOTER1",KJE.colorList[1])
};
KJE.CDLadder.prototype.setValues=function(d){var e=KJE.inputs.items;
d.COMPOUND_INDEX=Math.round(e.COMPOUND_INDEX.getValue());
d.FUND_INDEX=Math.round(e.FUND_INDEX.getValue());
d.TOTAL_TO_INVEST=e.TOTAL_TO_INVEST.getValue();
d.PERIODIC_AMOUNT_AVAILABLE=e.PERIODIC_AMOUNT_AVAILABLE.getValue();
for(var f=0;
f<d.CD_MAX_COUNT;
f++){d.CD_RATE_OF_RETURN[f]=e["CD_RATE_OF_RETURN"+(f+1)].getValue()
}};
KJE.CDLadder.prototype.refresh=function(j){var k=KJE;
var l=KJE.gLegend;
var g=KJE.inputs.items;
var h=KJE.gGraphs[0];
h.removeAll();
h.setGraphCategories(j.cats);
h.add(new KJE.gGraphDataSeries(j.DR_BALANCE,this.MSG_GRAPH1,h.getColor(1),null,this.MSG_GRAPH1+" "+KJE.MSG_MONTH_LBL));
h.add(new KJE.gGraphDataSeries(j.DR_SINGLE_BALANCE,this.MSG_GRAPH2,h.getColor(2),null,this.MSG_GRAPH2+" "+KJE.MSG_MONTH_LBL));
h.setTitle(j.LADDER_RESULT);
h.paint();
g.NUMBER_OF_CDS.setText(k.number(j.NUMBER_OF_CDS),true);
for(var i=0;
i<j.CD_MAX_COUNT;
i++){KJE.setLabelText(g["CD_RATE_OF_RETURN"+(i+1)]._label,j.CD_TIME_LABEL[i]+KJE.Colon+" ");
g["CD_RATE_OF_RETURN"+(i+1)].setValue(j.CD_RATE_OF_RETURN[i],true);
if(i<j.NUMBER_OF_CDS){g["CD_RATE_OF_RETURN"+(i+1)].enable()
}else{g["CD_RATE_OF_RETURN"+(i+1)].disable()
}}g.PERIODIC_AMOUNT_AVAILABLE.setValue(j.CD_STARTING_AMOUNT,true)
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-TOTAL_TO_INVEST'><input id='KJE-TOTAL_TO_INVEST' /></div> <div id='KJE-C-PERIODIC_AMOUNT_AVAILABLE'><input id='KJE-PERIODIC_AMOUNT_AVAILABLE' /></div> <div id='KJE-C-FUND_INDEX'>**FUND_INDEX**</div> <div id='KJE-C-COMPOUND_INDEX'>**COMPOUND_INDEX**</div> <div id='KJE-C-NUMBER_OF_CDS'><div id='KJE-NUMBER_OF_CDS'></div></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-CD_RATE_OF_RETURN1'><input id='KJE-CD_RATE_OF_RETURN1' /></div> <div id='KJE-C-CD_RATE_OF_RETURN2'><input id='KJE-CD_RATE_OF_RETURN2' /></div> <div id='KJE-C-CD_RATE_OF_RETURN3'><input id='KJE-CD_RATE_OF_RETURN3' /></div> <div id='KJE-C-CD_RATE_OF_RETURN4'><input id='KJE-CD_RATE_OF_RETURN4' /></div> <div id='KJE-C-CD_RATE_OF_RETURN5'><input id='KJE-CD_RATE_OF_RETURN5' /></div> <div id='KJE-C-CD_RATE_OF_RETURN6'><input id='KJE-CD_RATE_OF_RETURN6' /></div> <div id='KJE-C-CD_RATE_OF_RETURN7'><input id='KJE-CD_RATE_OF_RETURN7' /></div> <div id='KJE-C-CD_RATE_OF_RETURN8'><input id='KJE-CD_RATE_OF_RETURN8' /></div> <div id='KJE-C-CD_RATE_OF_RETURN9'><input id='KJE-CD_RATE_OF_RETURN9' /></div> <div id='KJE-C-CD_RATE_OF_RETURN10'><input id='KJE-CD_RATE_OF_RETURN10' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** <div id=KJE-D-FOOTER1><div class=KJECenter>**MSG_LADDER_FOOTER**</div></div> ";
KJE.DefinitionText=" <div id='KJE-D-OVERVIEW'><dt>Calculation note</dt><dd>To maximize the results of the CD Ladder, each maturing CD should be reinvested in a new CD with a term equal to the longest term CD. This strategy allows you to take advantage of the higher rates normally associated with longer-term CDs while maintaining frequent access to your funds.<p>For example: If you established a ladder with 6-month, 12-month, 18-month and 24-month terms, when the 6-month CD matures, invest the funds in a new 24-month CD. Similarly, when the 12-month CD matures, invest the funds in another new 24-month CD, and so on. At the end of two years you'll have four, 24-month CDs with a CD maturing every six months.</dd></div> <div id='KJE-D-TOTAL_TO_INVEST' ><dt>Total to invest</dt><dd>This is the total amount to invest in your CD Ladder.</dd></div> <div id='KJE-D-PERIODIC_AMOUNT_AVAILABLE' ><dt>Amount in each CD</dt><dd>How much you wish to invest in each CD in your ladder. The tool uses this amount to calculate the number of CDs in the ladder. If the amount that you enter isn't evenly divisible by the total you wish to put into your CD Ladder, the tool will automatically adjust it up to an evenly divisible amount.</dd></div> <div id='KJE-D-FUND_INDEX' ><dt>Frequency of Maturing CDs</dt><dd>How often you would like to have a CD mature. For example, if you choose six months, one of your CDs in your CD ladder will mature every six months.</dd></div> <div id='KJE-D-NUMBER_OF_CDS' ><dt>CDs in your Ladder</dt><dd>The number of CDs that will be in your CD ladder. Each CD will have a different maturity date, so that one of your CDs will mature at the frequency you specify. This calculator assumes that you redeposit all matured CDs into new CDs that have a term of the longest maturity in your original CD ladder.</dd></div> <div id='KJE-D-COMPOUND_INDEX' ><dt>Interest is compounded</dt><dd>The interest earned on your CDs is added to your CD balance at regular intervals. This is called \"compounding.\" This calculator allows you to choose the frequency that your CDs' interest income is compounded. The more frequently this occurs, the sooner your accumulated interest income will generate additional interest. You may wish to check with your local branch or account opening documents to find out how often interest is being compounded on your CDs.</dd></div> ";
KJE.ReportText=' <p><!--HEADING "CD Ladder Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>At the end of the time period shown, your CD Ladder balance will be CD_LADDER_TOTAL.</h2> At the end of CD_TIME_LONGEST, your balance using CD Laddering will be CD_LADDER_TOTAL and a portion of that will be liquid. Using a single short-term rollover CD, your balance will be SINGLE_CD_TOTAL and be entirely liquid. LADDER_RESULT **GRAPH** <p><div class="KJECenter">Note that at the end of the time period shown, only a portion of your CD Ladder balance is liquid, while the entire Single CD balance is liquid.</div></p> <!--hidestart--> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Total to invest </th><td class="KJECell KJECell40"> TOTAL_TO_INVEST </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Frequency of CDs maturing </th><td class="KJECell"> FUND_ACCESS months</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Amount in each CD </th><td class="KJECell"> PERIODIC_AMOUNT_AVAILABLE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>CDs in your ladder </th><td class="KJECell"> NUMBER_OF_CDS </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest is compounded </th><td class="KJECell"> COMPOUND_DESC </td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>CD Ladder </th><td class="KJECellStrong"> CD_LADDER_TOTAL </td></tr> </tfoot> </table> </div> <!--hideend--> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>CD Ladder</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell15">CD</th><th class="KJEHeading KJECell15">Term</th><th class="KJEHeading KJECell15">Rate</th><th class="KJEHeading KJECell15">APY</th><th class="KJEHeading KJECell20">Starting Amount</th><th class="KJEHeading KJECell20">Balance at Maturity</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <!--**CD_LADDER**--> </tbody> </table> </div> <BR> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>CD Ladder vs. Single Short-term Rollover CD</h2> **REPEATING GROUP** ';
KJE.parameters.set("COMPOUND_INDEX",KJE.Default.COMPOUND_MONTHLY);
KJE.parameters.set("FUND_INDEX",KJE.Default.CD_MATURE_ANNUAL);
KJE.parameters.set("PERIODIC_AMOUNT_AVAILABLE",20000);
KJE.parameters.set("TOTAL_TO_INVEST",100000);
KJE.parameters.set("MONTHLY_RATE1",0);
KJE.parameters.set("MONTHLY_RATE12",1.1);
KJE.parameters.set("MONTHLY_RATE18",1.1);
KJE.parameters.set("MONTHLY_RATE24",1.5);
KJE.parameters.set("MONTHLY_RATE30",1.5);
KJE.parameters.set("MONTHLY_RATE36",2);
KJE.parameters.set("MONTHLY_RATE42",2);
KJE.parameters.set("MONTHLY_RATE48",2.3);
KJE.parameters.set("MONTHLY_RATE6",0.6);
KJE.parameters.set("MONTHLY_RATE60",2.5);