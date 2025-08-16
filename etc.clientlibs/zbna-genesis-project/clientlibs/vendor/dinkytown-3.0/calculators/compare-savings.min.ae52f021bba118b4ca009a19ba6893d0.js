KJE.CompareSavingsCalc=function(){this.COMPARE_COUNT=KJE.parameters.get("COMPARE_COUNT",3);
this.MSG_FLAT_TITLE=KJE.parameters.get("MSG_FLAT_TITLE","A Flat Fee May Save Between END_FEE2 and END_FEE3 over YEARS Years.");
this.MSG_AT_START_DESC=KJE.parameters.get("MSG_AT_START_DESC","at the start of each period");
this.MSG_AT_END_DESC=KJE.parameters.get("MSG_AT_END_DESC","at the end of each period");
this.MSG_START=KJE.parameters.get("MSG_START","start");
this.MSG_END=KJE.parameters.get("MSG_END","end");
this.bUseFees=KJE.parameters.get("USE_FEES",false);
this.SIMPLE=KJE.parameters.get("SIMPLE",true);
this.cats=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"];
this.ANNUAL_RATE=0;
this.COMPOUND_INDEX=KJE.parameters.get("COMPOUND_INDEX",KJE.Default.COMPOUND_ANNUALLY);
this.FREQ_INDEX=KJE.Default.COMPOUND_ANNUALLY;
this.PAYMENTS_AT_START=true;
this.FLAT_FEE1=0;
this.FLAT_FEE2=0;
this.FLAT_FEE_CUTOFF=0;
var b=this.COMPARE_COUNT;
if(b<2){b=2
}this.COMPARE_COUNT=b;
this.DR_INTEREST=new Array(b);
this.DR_TOTAL_INTEREST=new Array(b);
this.DR_BALANCE=new Array(b);
this.RATE_OF_RETURN=KJE.FloatArray(b);
this.RATE_OF_FEE=KJE.FloatArray(b);
this.FLAT_RATE_OF_FEE=KJE.FloatArray(b);
this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN=KJE.FloatArray(b);
this.TOTAL_AT_END_OF_INVESTMENT=KJE.FloatArray(b);
this.sSchedule=new KJE.Repeating();
this.Heading=new Array(b)
};
KJE.CompareSavingsCalc.prototype.clear=function(){this.DEPOSIT_FREQUENCY=1;
this.COMPOUND_INTEREST=1;
this.STARTING_AMOUNT=0;
this.ADDITIONAL_CONTRIBUTIONS=0;
this.YEARS=0;
var e=this.RATE_OF_RETURN;
var f=e.length;
for(var d=0;
d<f;
d++){e[d]=0
}};
KJE.CompareSavingsCalc.prototype.calculate=function(T){var an=KJE;
var af=this.STARTING_AMOUNT;
var ao=this.ADDITIONAL_CONTRIBUTIONS;
var R=this.YEARS;
var i=this.FLAT_FEE1;
var n=this.FLAT_FEE2;
var ak=this.FLAT_FEE_CUTOFF;
var aj=this.FLAT_RATE_OF_FEE;
var au=this.RATE_OF_FEE;
var ad=this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN;
var Y=this.TOTAL_AT_END_OF_INVESTMENT;
var ae=this.RATE_OF_RETURN;
var ag=this.DR_INTEREST;
var am=this.DR_TOTAL_INTEREST;
var ac=this.DR_BALANCE;
var V=this.COMPARE_COUNT;
for(var O=0;
O<V;
O++){ad[O]=0;
Y[O]=0
}var ap=KJE.Default.COMPOUND_FREQ[this.COMPOUND_INDEX];
var Q=KJE.Default.SAVE_FREQ[this.FREQ_INDEX];
this.COMPOUND_DESC=KJE.Default.COMPOUND_DESC[this.COMPOUND_INDEX];
this.FREQ_DESC=KJE.Default.SAVE_DESC[this.FREQ_INDEX];
var aa=0;
var ah=0;
var W=0;
var aq=100;
for(var O=0;
O<V;
O++){if(i>0&&n>0&&aj[O]){au[O]=(af>=ak?n:i)
}if(this.bUseFees){ae[O]=this.ANNUAL_RATE-(aj[O]?0:au[O])
}if(W<ae[O]){W=ae[O];
aa=O
}if(aq>ae[O]){aq=ae[O];
ah=O
}}W=ae[aa]/100;
aq=ae[ah]/100;
var al=Math.round(R);
for(var O=0;
O<V;
O++){ad[O]=af+(ao*Q*R);
ac[O]=KJE.FloatArray(al);
am[O]=KJE.FloatArray(al);
ag[O]=KJE.FloatArray(al);
ac[O]=KJE.FloatArray(al);
var M=0;
var S=0;
var ab=0;
var U=0;
var ai=0;
if(ap==Q){M=(ae[O]/Q)/100
}else{if(ap==1){ab=ae[O]/100
}else{ab=1/Math.pow((1+ae[O]/(ap*100)),(-1*ap))-1
}M=Math.pow(1+(ab),1/Q)-1
}var N=Q*R;
var at=0;
Y[O]=af;
for(var P=0;
P<N;
P++){if(this.PAYMENTS_AT_START){Y[O]+=ao;
S=an.round(M*Y[O],2);
U+=S;
Y[O]+=S
}else{S=an.round(M*Y[O],2);
U+=S;
Y[O]+=ao;
Y[O]+=S
}if(((P+1)%Q)==0){var ar=0;
if(i>0&&n>0&&aj[O]){ar=(Y[O]>=ak?n:i)
}Y[O]-=(aj[O]?ar:0);
U-=(aj[O]?ar:0);
ac[O][ai]=Y[O];
ag[O][ai]=U;
at+=U;
am[O][ai]=at;
U=0;
ai++
}}}var X=KJE.replace("END_FEE2",an.dollars(Y[0]-Y[1]),this.MSG_FLAT_TITLE);
X=KJE.replace("END_FEE3",an.dollars(Y[0]-Y[2]),X);
this.MSG_FLAT=KJE.replace("YEARS",an.number(R),X);
var O=0;
this.DIFFERENCE=(ac[aa][al-1]-ac[ah][al-1]);
if(T){var Z=this.sSchedule;
Z.clearRepeat();
for(var O=0;
O<V;
O++){this.Heading[O]={sCell:KJE._sHeadingUnderline,sContent:KJE.replace("RATE_OF_RETURN",an.percent(ae[O]/100,2),KJE.replace("PRODUCT_NAME",Z.sReportCol("",6),Z.sReportCol("RATE_OF_RETURN APY",5))),sFormat:"COLSPAN=2 scope='colgroup'"}
}Z.addHeader("&nbsp;","&nbsp;",this.Heading[0],this.Heading[1],(V>2?this.Heading[2]:null));
Z.addHeader(Z.sReportCol("Year",1),Z.sReportCol("Additions",2),Z.sReportCol("Interest",3),Z.sReportCol("Balance",4),Z.sReportCol("Interest",3),Z.sReportCol("Balance",4),(V>2?Z.sReportCol("Interest",3):null),(V>2?Z.sReportCol("Balance",4):null));
Z.addRepeat("&nbsp;","&nbsp;","&nbsp;",an.dollars(af,2),"&nbsp;",an.dollars(af,2),(V>2?"&nbsp;":null),(V>2?an.dollars(af,2):null));
for(var O=0;
O<al;
O++){Z.addRepeat((O+1),an.dollars(Q*ao,2),an.dollars(ag[0][O],2),an.dollars(ac[0][O],2),an.dollars(ag[1][O],2),an.dollars(ac[1][O],2),(V>2?an.dollars(ag[2][O],2):null),(V>2?an.dollars(ac[2][O],2):null))
}}this.COMPOUND_INTEREST=ap;
this.DEPOSIT_FREQUENCY=Q;
this.HIGH_RATE_INT=aa;
this.LOW_RATE_INT=ah;
this.HIGH_RATE=W;
this.LOW_RATE=aq
};
KJE.CompareSavingsCalc.prototype.formatReport=function(c){c.replace("DEPOSIT_TYPE",(this.PAYMENTS_AT_START?this.MSG_AT_START_DESC:this.MSG_AT_END_DESC));
c.replace("MSG_FLAT",this.MSG_FLAT);
c.percent("ANNUAL_RATE",this.ANNUAL_RATE/100,2);
c.dollars("STARTING_AMOUNT",this.STARTING_AMOUNT);
c.dollars("ADDITIONAL_CONTRIBUTIONS",this.ADDITIONAL_CONTRIBUTIONS);
c.replace("DEPOSIT_FREQUENCY",this.FREQ_DESC);
c.replace("YEARS",KJE.getTermLabel(this.YEARS*12,false));
c.percent("HIGH_RATE",this.HIGH_RATE,2);
c.percent("LOW_RATE",this.LOW_RATE,2);
c.percent("HIGH_FEE",this.RATE_OF_FEE[this.LOW_RATE_INT]/100,2);
if(this.FLAT_RATE_OF_FEE[this.HIGH_RATE_INT]){c.dollars("LOW_FEE",this.RATE_OF_FEE[this.HIGH_RATE_INT])
}else{c.percent("LOW_FEE",this.RATE_OF_FEE[this.HIGH_RATE_INT]/100)
}c.dollars("DIFFERENCE",this.DIFFERENCE);
c.replace("PAYMENT_TYPE",(this.PAYMENTS_AT_START?this.MSG_START:this.MSG_END));
for(var d=0;
d<this.RATE_OF_RETURN.length;
d++){c.returnRate("RATE_OF_RETURN"+(d+1),this.RATE_OF_RETURN[d]/100);
if(this.FLAT_RATE_OF_FEE[d]==true){c.dollars("RATE_OF_FEE"+(d+1),this.RATE_OF_FEE[d])
}else{c.percent("RATE_OF_FEE"+(d+1),this.RATE_OF_FEE[d]/100,2)
}c.dollars("TOTAL_AMOUNT_YOU_HAVE_PAID_IN"+(d+1),this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN[d]);
c.dollars("TOTAL_AT_END_OF_INVESTMENT"+(d+1),this.TOTAL_AT_END_OF_INVESTMENT[d])
}c.replace("COMPOUND_INTEREST",KJE.Default.COMPOUND_DESC[this.COMPOUND_INDEX]);
c.replace("COMPOUND_SELECTION_LOWER",KJE.Default.COMPOUND_SELECTIONS[this.COMPOUND_INDEX].toLowerCase());
c.dollars("TOTAL_HIGH_AMOUNT",this.TOTAL_AT_END_OF_INVESTMENT[this.HIGH_RATE_INT]);
c.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.Default.COMPOUND_DAILY=0;
KJE.Default.COMPOUND_MONTHLY=1;
KJE.Default.COMPOUND_QRTLY=2;
KJE.Default.COMPOUND_SEMI=3;
KJE.Default.COMPOUND_ANNUALLY=4;
KJE.Default.COMPOUND_INDEX=[KJE.Default.COMPOUND_DAILY,KJE.Default.COMPOUND_MONTHLY,KJE.Default.COMPOUND_QRTLY,KJE.Default.COMPOUND_SEMI,KJE.Default.COMPOUND_ANNUALLY];
KJE.Default.COMPOUND_DESC=KJE.parameters.get("ARRAY_COMPOUND_DESC",["compound daily","compound monthly","compound quarterly","compound semi-annually","compound annually"]);
KJE.Default.COMPOUND_SELECTIONS=KJE.parameters.get("ARRAY_COMPOUND_SELECTIONS",["Daily","Monthly","Quarterly","Semi-Annually","Annually"]);
KJE.Default.COMPOUND_FREQ=[360,12,4,2,1];
KJE.Default.SAVE_WEEKLY=0;
KJE.Default.SAVE_BIWEEKLY=1;
KJE.Default.SAVE_MONTHLY=2;
KJE.Default.SAVE_QUARTERLY=3;
KJE.Default.SAVE_YEARLY=4;
KJE.Default.SAVE_INDEX=[KJE.Default.SAVE_WEEKLY,KJE.Default.SAVE_BIWEEKLY,KJE.Default.SAVE_MONTHLY,KJE.Default.SAVE_QUARTERLY,KJE.Default.SAVE_YEARLY];
KJE.Default.SAVE_DESC=KJE.parameters.get("ARRAY_SAVE_DESC",["every week","every two weeks","per month","per quarter","per year"]);
KJE.Default.SAVE_FREQ=[52,26,12,4,1];
KJE.CalcName="Compare Savings Rates Calculator";
KJE.CalcType="CompareSavings";
KJE.parseInputs=function(c){var d=KJE.getDropBox("FREQ_INDEX",KJE.parameters.get("FREQ_INDEX",KJE.Default.SAVE_MONTHLY),KJE.Default.SAVE_INDEX,KJE.Default.SAVE_DESC);
c=KJE.replace("**FREQ_INDEX**",d,c);
d=KJE.getDropBox("COMPOUND_INDEX",KJE.parameters.get("COMPOUND_INDEX",KJE.Default.COMPOUND_ANNUALLY),KJE.Default.COMPOUND_INDEX,KJE.Default.COMPOUND_DESC);
c=KJE.replace("**COMPOUND_INTEREST**",d,c);
return c
};
KJE.initialize=function(){KJE.CalcControl=new KJE.CompareSavingsCalc();
KJE.GuiControl=new KJE.CompareSavings(KJE.CalcControl)
};
KJE.CompareSavings=function(l){KJE.CalculatorTitleTemplate=KJE.parameters.get("TITLE_TEMPLATE",(l.bUseFees?"An annual fee of KJE5 produces a difference of KJE4.":"A rate of KJE2 earns KJE4 more than KJE1."));
var t=KJE;
var w=KJE.gLegend;
var r=KJE.inputs.items;
KJE.DollarSlider("STARTING_AMOUNT","Starting amount",0,10000000,0,0,2);
KJE.DropBox("FREQ_INDEX","Contribution frequency");
if(!l.SIMPLE){KJE.DropBox("COMPOUND_INDEX","Contribution frequency");
KJE.NbrDropBox("ADDITIONAL_CONTRIBUTIONS","Additional contributions",0,1000000,0,t.FMT_DOLLARS,"DEPOSIT_INDEX")
}else{KJE.DollarSlider("ADDITIONAL_CONTRIBUTIONS","Additional contributions",0,1000000,0,0,6)
}KJE.NumberSlider("YEARS","Years",1,40,0);
if(l.bUseFees){KJE.InvestRateSlider("ANNUAL_RATE","Annualized rate of return")
}KJE.InputItem.AltHelpName="RATE_OF_RETURN";
for(var p=0;
p<l.COMPARE_COUNT;
p++){KJE.InvestRateSlider("RATE_OF_RETURN"+(p+1),"Annual percentage yield "+(p+1))
}KJE.InputItem.AltHelpName=null;
KJE.Checkbox("PAYMENTS_AT_START","Make deposits",true,"At beginning of the period (uncheck for the end of the period)");
this.GRAPH_LABEL_2=KJE.parameters.get("MSG_GRAPH_LABEL_2","Balance for RATE_OF_RETURN");
var q=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_LABEL_1","Balance by Year"));
q._legend._iOrientation=(w.TOP_RIGHT);
q._showItemLabelOnTop=true;
var x=KJE.parameters.get("MSG_DROPPER_TITLE",l.bUseFees?"Current investment plan:":"Current savings plan:");
var v=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Starting amount KJE1, Additional contribution of KJE2 KJE3 for KJE4 years.");
var u=function(){return x+KJE.subText(KJE.getKJEReplaced(v,r.STARTING_AMOUNT.getFormatted(),r.ADDITIONAL_CONTRIBUTIONS.getFormatted(),r.FREQ_INDEX.getFormatted(),r.YEARS.getFormatted()),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,x,u),KJE.colorList[0]);
var i=KJE.parameters.get("MSG_DROPPER2_TITLE",l.bUseFees?"Compare annual fees:":"Compare savings rates:");
var s=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE",l.bUseFees?"Net return of KJE1 - KJE2 - KJE3":"KJE1 - KJE2 - KJE3");
var o=function(){return i+KJE.subText(KJE.getKJEReplaced(s,t.percent(l.RATE_OF_RETURN[0]/100,3),t.percent(l.RATE_OF_RETURN[1]/100,3),t.percent(l.RATE_OF_RETURN[2]/100,3)),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS2",true,i,o),KJE.colorList[0])
};
KJE.CompareSavings.prototype.setValues=function(f){var e=KJE.inputs.items;
f.PAYMENTS_AT_START=e.PAYMENTS_AT_START.getValue();
f.FREQ_INDEX=e.FREQ_INDEX.getValue();
if(!f.SIMPLE){f.COMPOUND_INDEX=e.COMPOUND_INDEX.getValue()
}f.ADDITIONAL_CONTRIBUTIONS=e.ADDITIONAL_CONTRIBUTIONS.getValue();
for(var d=0;
d<f.COMPARE_COUNT;
d++){if(f.bUseFees){f.RATE_OF_FEE[d]=e["RATE_OF_RETURN"+(d+1)].getValue()
}else{f.RATE_OF_RETURN[d]=e["RATE_OF_RETURN"+(d+1)].getValue()
}}if(f.bUseFees){f.ANNUAL_RATE=e.ANNUAL_RATE.getValue()
}f.STARTING_AMOUNT=e.STARTING_AMOUNT.getValue();
f.YEARS=e.YEARS.getValue()
};
KJE.CompareSavings.prototype.refresh=function(k){var l=KJE;
var m=KJE.gLegend;
var h=KJE.inputs.items;
var i=KJE.gGraphs[0];
KJE.setTitleTemplate(l.percent(k.LOW_RATE,2),l.percent(k.HIGH_RATE,2),KJE.getTermLabel(k.YEARS*12,false),l.dollars(k.DIFFERENCE,2),l.percent(k.RATE_OF_FEE[k.HIGH_RATE_INT]/100,2),l.percent(k.RATE_OF_FEE[k.LOW_RATE_INT]/100,2));
i.removeAll();
i.setGraphCategories(k.cats);
if(k.DR_BALANCE[0].length>2){i._showItemLabel=false
}else{i._showItemLabel=true
}for(var n=0;
n<k.COMPARE_COUNT;
n++){var j=KJE.replace("RATE_OF_RETURN",l.percent(k.RATE_OF_RETURN[n]/100,2),this.GRAPH_LABEL_2);
i.add(new KJE.gGraphDataSeries(k.DR_BALANCE[n],j,i.getColor(n+1),null,j+" "+KJE.MSG_YEAR_LBL))
}i.paint()
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-STARTING_AMOUNT'><input id='KJE-STARTING_AMOUNT' /></div> <div id='KJE-C-YEARS'><input id='KJE-YEARS' /></div> <div id='KJE-C-ADDITIONAL_CONTRIBUTIONS'><input id='KJE-ADDITIONAL_CONTRIBUTIONS' /></div> <div id='KJE-C-FREQ_INDEX'>**FREQ_INDEX**</div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-RATE_OF_RETURN1'><input id='KJE-RATE_OF_RETURN1' /></div> <div id='KJE-C-RATE_OF_RETURN2'><input id='KJE-RATE_OF_RETURN2' /></div> <div id='KJE-C-RATE_OF_RETURN3'><input id='KJE-RATE_OF_RETURN3' /></div> <div id='KJE-C-PAYMENTS_AT_START'><input id='KJE-PAYMENTS_AT_START' type=checkbox name='PAYMENTS_AT_START' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-STARTING_AMOUNT' ><dt>Starting amount</dt><dd>The starting balance or current amount you have invested or saved. If you haven't started saving yet, set the amount to '$0'.</dd></div> <div id='KJE-D-YEARS' ><dt>Years</dt><dd>The total number of years you are planning to save or invest.</dd></div> <div id='KJE-D-ADDITIONAL_CONTRIBUTIONS' ><dt>Additional contributions</dt><dd>The amount that you plan on adding to your savings or investment regularly.</dd></div> <div id='KJE-D-FREQ_INDEX' ><dt>Contribution frequency</dt><dd>How often your additional contributions will occur. Your choices are weekly (52 times per year), every other week (26 times per year), monthly, quarterly or annually. </dd></div> <div id='KJE-D-RATE_OF_RETURN'><dt>Annual percentage yield (APY)</dt><dd>The annual rate of return for each savings account. **ROR_DEFINITION**</dd></div> <div id='KJE-D-PAYMENTS_AT_START' ><dt>Make deposits at beginning of the period</dt><dd>Check this box to have all additional contributions happen at the beginning of each period. Uncheck this box for the end of the period. Making contributions at the beginning of each period allows your money to begin earning a return immediately increasing your return. </dd></div> ";
KJE.ReportText=' <!--HEADING "Compare Savings Rates" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>A rate of HIGH_RATE earns DIFFERENCE more over YEARS than LOW_RATE. </h2>Your total savings balance would be TOTAL_HIGH_AMOUNT if you save ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY for YEARS, making deposits at the PAYMENT_TYPE of each period. This includes a starting balance of STARTING_AMOUNT and a HIGH_RATE annual rate of return. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell40" scope="col">&nbsp; </th><th class="KJEHeading KJECell20" scope=\'col\'>Rate 1</th><th class="KJEHeading KJECell20" scope=\'col\'>Rate 2</th><th class="KJEHeading KJECell20" scope=\'col\'>Rate 3</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Starting amount </th><td class="KJECell KJECellBorder" > STARTING_AMOUNT </td><td class="KJECell KJECellBorder" > STARTING_AMOUNT </td><td class="KJECell" > STARTING_AMOUNT </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Number of years to save </th><td class="KJECell KJECellBorder" >YEARS </td><td class="KJECell KJECellBorder" >YEARS </td><td class="KJECell" >YEARS </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Additional contributions </th><td class="KJECell KJECellBorder"> ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY, at the PAYMENT_TYPE of each period</td><td class="KJECell KJECellBorder"> ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY, at the PAYMENT_TYPE of each period </td><td class="KJECell"> ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY, at the PAYMENT_TYPE of each period </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual percentage yield (APY) </th><td class="KJECell KJECellBorder"> RATE_OF_RETURN1</td><td class="KJECell KJECellBorder"> RATE_OF_RETURN2</td><td class="KJECell"> RATE_OF_RETURN3</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total amount you will have contributed </th><td class="KJECellStrong KJECellBorder" > TOTAL_AMOUNT_YOU_HAVE_PAID_IN1 </td><td class="KJECellStrong KJECellBorder" > TOTAL_AMOUNT_YOU_HAVE_PAID_IN2 </td><td class="KJECellStrong" > TOTAL_AMOUNT_YOU_HAVE_PAID_IN3 </td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total at end of investment </th><td class="KJECellStrong KJECellBorder" >TOTAL_AT_END_OF_INVESTMENT1</td><td class="KJECellStrong KJECellBorder" >TOTAL_AT_END_OF_INVESTMENT2</td><td class="KJECellStrong" >TOTAL_AT_END_OF_INVESTMENT3</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Savings Balance by Year</h2> **REPEATING GROUP** ';
KJE.parameters.set("ADDITIONAL_CONTRIBUTIONS",50);
KJE.parameters.set("COMPOUND_INDEX",KJE.Default.COMPOUND_ANNUALLY);
KJE.parameters.set("FREQ_INDEX",KJE.Default.SAVE_MONTHLY);
KJE.parameters.set("MSG_RATE_OF_RETURN1","Annual percentage yield 1");
KJE.parameters.set("MSG_RATE_OF_RETURN2","Annual percentage yield 2");
KJE.parameters.set("MSG_RATE_OF_RETURN3","Annual percentage yield 3");
KJE.parameters.set("RATE_OF_RETURN1",KJE.Default.RORSave);
KJE.parameters.set("RATE_OF_RETURN2",KJE.Default.RORSave+0.5);
KJE.parameters.set("RATE_OF_RETURN3",KJE.Default.RORSave+1);
KJE.parameters.set("SIMPLE",true);
KJE.parameters.set("STARTING_AMOUNT",1000);
KJE.parameters.set("YEARS",10);