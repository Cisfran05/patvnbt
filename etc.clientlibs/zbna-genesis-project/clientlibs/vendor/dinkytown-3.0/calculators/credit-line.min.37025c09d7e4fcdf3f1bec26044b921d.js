KJE.CreditLineCalc=function(){this.LOAN_TO_VALUE_RATIO_DECIMALS=0;
this.MAX_OF_LOANS=0;
this.MAXIMUM_OF_LOANS_POSSIBLE=null;
this.YOUR_CREDIT_LIMIT=null;
this.LOAN_TO_VALUE=null;
this.NOEDIT_LOAN_TO_VALUE=KJE.parameters.get("NOEDIT_LOAN_TO_VALUE",false);
this.LOAN_TO_VALUE1=KJE.parameters.get("LOAN_TO_VALUE1",0.8);
this.LOAN_TO_VALUE2=KJE.parameters.get("LOAN_TO_VALUE2",0.9);
this.LOAN_TO_VALUE3=KJE.parameters.get("LOAN_TO_VALUE3",1);
this.XAXIS_FACTOR=KJE.parameters.get("XAXIS_FACTOR",1);
this.SCENARIO_NUMBER=0;
this.MSG_LEGEND_START=KJE.parameters.get("MSG_LEGEND_START","Loan to value");
this.MSG_LEGEND_END=KJE.parameters.get("MSG_LEGEND_END","");
this.MSG_LINE_OF_CREDIT=KJE.parameters.get("MSG_LINE_OF_CREDIT","Line of Credit");
this.LOCATION="";
this.DS_CREDITLINES=null;
this.cats=new Array(20);
this.sSchedule=new KJE.Repeating()
};
KJE.CreditLineCalc.prototype.clear=function(){this.APPRAISED_VALUE_OF_YOUR_HOME=0;
this.MORTGAGES_YOU_OWE=0;
this.LOAN_TO_VALUE_RATIO=0
};
KJE.CreditLineCalc.prototype.calculate=function(p){var v=KJE;
var y=this.APPRAISED_VALUE_OF_YOUR_HOME;
var q=this.MORTGAGES_YOU_OWE;
var n=this.LOAN_TO_VALUE_RATIO/100;
var z=0;
if((n==this.LOAN_TO_VALUE1)||(n==this.LOAN_TO_VALUE2)||(n==this.LOAN_TO_VALUE3)){z=(this.LOAN_TO_VALUE3<0?2:3);
this.LOAN_TO_VALUE=KJE.FloatArray(z);
this.LOAN_TO_VALUE[0]=this.LOAN_TO_VALUE1;
this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE2;
if(this.LOAN_TO_VALUE3){this.LOAN_TO_VALUE[2]=this.LOAN_TO_VALUE3
}if(n==this.LOAN_TO_VALUE1){this.SCENARIO_NUMBER=0
}if(n==this.LOAN_TO_VALUE2){this.SCENARIO_NUMBER=1
}if(n==this.LOAN_TO_VALUE3){this.SCENARIO_NUMBER=2
}}else{z=(this.LOAN_TO_VALUE3<0?3:4);
this.LOAN_TO_VALUE=KJE.FloatArray(z);
this.LOAN_TO_VALUE[0]=this.LOAN_TO_VALUE1;
this.LOAN_TO_VALUE[1]=n;
this.LOAN_TO_VALUE[2]=this.LOAN_TO_VALUE2;
if(this.LOAN_TO_VALUE3){this.LOAN_TO_VALUE[3]=this.LOAN_TO_VALUE3
}this.SCENARIO_NUMBER=1;
if(n<this.LOAN_TO_VALUE1){this.LOAN_TO_VALUE[0]=n;
this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE1;
this.SCENARIO_NUMBER=0
}else{if(n<this.LOAN_TO_VALUE2){}else{if(n<this.LOAN_TO_VALUE3||this.LOAN_TO_VALUE3==-1){this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE2;
this.LOAN_TO_VALUE[2]=n;
if(this.LOAN_TO_VALUE3){this.LOAN_TO_VALUE[3]=this.LOAN_TO_VALUE3
}this.SCENARIO_NUMBER=2
}else{this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE2;
this.LOAN_TO_VALUE[2]=this.LOAN_TO_VALUE3;
this.LOAN_TO_VALUE[3]=n;
this.SCENARIO_NUMBER=3
}}}}this.MAXIMUM_OF_LOANS_POSSIBLE=KJE.FloatArray(z);
this.YOUR_CREDIT_LIMIT=KJE.FloatArray(z);
this.DS_CREDITLINES=new Array(z);
this.MAX_OF_LOANS=(n*y);
var u=this.MAX_OF_LOANS-q;
if(u<0){u=0
}var i=Math.round(20);
var r=4000;
var w=4000*i/2;
if((y-10000)<((i/2)*r)){}if(p&&!this.NOEDIT_LOAN_TO_VALUE){var t=this.sSchedule;
t.clearRepeat();
t.addHeader("&nbsp;",t.sReportCol("Maximum Loans",1),t.sReportCol("Current Mortgages",2),t.sReportCol("Credit Line",3))
}for(var s=0;
s<z;
s++){this.MAXIMUM_OF_LOANS_POSSIBLE[s]=y*this.LOAN_TO_VALUE[s];
this.YOUR_CREDIT_LIMIT[s]=this.MAXIMUM_OF_LOANS_POSSIBLE[s]-q;
this.DS_CREDITLINES[s]=KJE.FloatArray(i);
if(this.YOUR_CREDIT_LIMIT[s]<0){this.YOUR_CREDIT_LIMIT[s]=0
}if(p&&!this.NOEDIT_LOAN_TO_VALUE){t.addRepeat(this.getL2V(this.LOAN_TO_VALUE[s]),v.dollars(this.MAXIMUM_OF_LOANS_POSSIBLE[s]),v.dollars(q),v.dollars(this.YOUR_CREDIT_LIMIT[s]))
}for(var x=0;
x<i;
x++){this.DS_CREDITLINES[s][x]=((this.LOAN_TO_VALUE[s]*(y+r*x-w))-q);
if(this.DS_CREDITLINES[s][x]<0){this.DS_CREDITLINES[s][x]=0
}if(x==(i-1)&&this.DS_CREDITLINES[s][x]==0){this.DS_CREDITLINES[s][x]=1
}this.cats[x]=v.dollars((y+r*x-w)/KJE.gScaleLabelFactor[this.XAXIS_FACTOR])
}}this.NUMBER_OF_SENARIOS=z;
this.CREDIT_LIMIT=u
};
KJE.CreditLineCalc.prototype.formatReport=function(c){for(var d=0;
d<this.YOUR_CREDIT_LIMIT.length;
d++){c.dollars("CREDIT_LIMIT"+(d+1),this.YOUR_CREDIT_LIMIT[d])
}c.dollars("APPRAISED_VALUE_OF_YOUR_HOME",this.APPRAISED_VALUE_OF_YOUR_HOME);
c.dollars("MORTGAGES_YOU_OWE",this.MORTGAGES_YOU_OWE);
c.percent("LOAN_TO_VALUE_RATIO",this.LOAN_TO_VALUE_RATIO/100,this.LOAN_TO_VALUE_RATIO_DECIMALS);
c.percent("LOAN_TO_VALUE1",this.LOAN_TO_VALUE1,this.LOAN_TO_VALUE_RATIO_DECIMALS);
c.percent("LOAN_TO_VALUE2",this.LOAN_TO_VALUE2,this.LOAN_TO_VALUE_RATIO_DECIMALS);
c.percent("LOAN_TO_VALUE3",this.LOAN_TO_VALUE3,this.LOAN_TO_VALUE_RATIO_DECIMALS);
c.dollars("CREDIT_LIMIT",this.CREDIT_LIMIT);
c.dollars("MAX_OF_LOANS",this.MAX_OF_LOANS);
c.replace("LOCATION",this.LOCATION);
c.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CreditLineCalc.prototype.getL2V=function(b){return this.MSG_LEGEND_START+" "+KJE.percent(b,this.LOAN_TO_VALUE_RATIO_DECIMALS)+(this.MSG_LEGEND_END.length>1?" ":"")+this.MSG_LEGEND_END
};
KJE.CalcName="Home Equity Line of Credit Calculator";
KJE.CalcType="creditline";
KJE.CalculatorTitleTemplate="You may qualify for a KJE1 credit line.";
KJE.parseInputs=function(c){if(KJE.Default.STATE_INDEX){var d=KJE.getDropBox("STATE_LOCATION",KJE.parameters.get("STATE_LOCATION",0),KJE.Default.STATE_INDEX,KJE.Default.STATE_SELECTIONS);
c=KJE.replace("**STATE_LOCATION**",d,c)
}return c
};
KJE.initialize=function(){KJE.CalcControl=new KJE.CreditLineCalc();
KJE.GuiControl=new KJE.CreditLine(KJE.CalcControl)
};
KJE.CreditLine=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Appraised value ")+(KJE.gScaleLabel[h.XAXIS_FACTOR]!=""?" ("+KJE.gScaleLabel[h.XAXIS_FACTOR]+KJE.sCurrency+")":"");
this.MSG_RESULTS=KJE.parameters.get("MSG_RESULTS","How was this calculated?  Your credit line is based on the amount of debt that can be secured by value of your home. This amount is calculated as the appraised value of your home times the loan to value ratio.");
if(KJE.Default.STATE_INDEX){KJE.DropBox("STATE_LOCATION","State of residence");
this.MSG_TITLE_CHOOSE=KJE.parameters.set("MSG_TITLE_CHOOSE","Please choose a state to begin")
}KJE.DollarSlider("APPRAISED_VALUE_OF_YOUR_HOME","Appraised value of your home",0,10000000);
KJE.DollarSlider("MORTGAGES_YOU_OWE","Outstanding home loans",0,10000000);
KJE.PercentSlider("LOAN_TO_VALUE_RATIO","Loan to value ratio limit",1,KJE.parameters.get("LOAN_TO_VALUE_RATIO_MAX",200),h.LOAN_TO_VALUE_RATIO_DECIMALS);
this.MSG_GRAPH_TITLE=KJE.parameters.get("MSG_GRAPH_TITLE","What if my appraised value changes?");
var g=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],this.MSG_GRAPH_TITLE);
g._legend._iOrientation=(j.TOP_RIGHT);
g._titleXAxis.setText(this.MSG_GRAPH1);
g._titleYAxis.setText(KJE.parameters.get("MSG_YAXIS_TITLE",""));
KJE.addDiv("INPUTS",KJE.colorList[0])
};
KJE.CreditLine.prototype.setValues=function(f){var e=KJE.inputs.items;
f.APPRAISED_VALUE_OF_YOUR_HOME=e.APPRAISED_VALUE_OF_YOUR_HOME.getValue();
f.MORTGAGES_YOU_OWE=e.MORTGAGES_YOU_OWE.getValue();
if(KJE.Default.STATE_INDEX){var d=e.STATE_LOCATION.getValue();
f.LOAN_TO_VALUE_RATIO=KJE.Default.STATE_RATIOS[d];
f.LOCATION=KJE.Default.STATE_SELECTIONS[d];
if(d==0){KJE.InComplete=true
}}else{f.LOAN_TO_VALUE_RATIO=e.LOAN_TO_VALUE_RATIO.getValue()
}};
KJE.CreditLine.prototype.refresh=function(j){var k=KJE;
var l=KJE.gLegend;
var g=KJE.inputs.items;
var h=KJE.gGraphs[0];
h.removeAll();
if(j.LOAN_TO_VALUE_RATIO==0){KJE.CalculatorTitleShow=this.MSG_TITLE_CHOOSE;
h.setTitle(" ")
}else{KJE.setTitleTemplate(k.dollars(j.CREDIT_LIMIT));
h.setGraphCategories(j.cats);
h.setTitle(this.MSG_GRAPH_TITLE);
if(j.NOEDIT_LOAN_TO_VALUE){h.add(new KJE.gGraphDataSeries(j.DS_CREDITLINES[j.SCENARIO_NUMBER],j.getL2V(j.LOAN_TO_VALUE[j.SCENARIO_NUMBER]),h.getColor(1)))
}else{for(var i=(j.NUMBER_OF_SENARIOS-1);
i>=0;
i--){h.add(new KJE.gGraphDataSeries(j.DS_CREDITLINES[i],j.getL2V(j.LOAN_TO_VALUE[i]),h.getColor(i+1)))
}}if(j.DS_CREDITLINES[j.NUMBER_OF_SENARIOS-1][19]!=1){h._axisY._bAutoMinimum=true;
h._axisY._axisMinimum=0;
h._axisY._bAutoMaximum=true
}else{h._axisY._bAutoMinimum=false;
h._axisY._axisMinimum=0;
h._axisY._bAutoMaximum=false;
h._axisY._axisMaximum=1000
}if(KJE.Default.STATE_INDEX){g.LOAN_TO_VALUE_RATIO.setText(k.percent(j.LOAN_TO_VALUE_RATIO/100,j.LOAN_TO_VALUE_RATIO_DECIMALS),true)
}}h.paint()
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS> <div id='KJE-C-APPRAISED_VALUE_OF_YOUR_HOME'><input id='KJE-APPRAISED_VALUE_OF_YOUR_HOME' /></div> <div id='KJE-C-MORTGAGES_YOU_OWE'><input id='KJE-MORTGAGES_YOU_OWE' /></div> <div id='KJE-C-LOAN_TO_VALUE_RATIO'><input id='KJE-LOAN_TO_VALUE_RATIO' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-APPRAISED_VALUE_OF_YOUR_HOME' ><dt>Appraised value of your home</dt><dd>Current appraised value of your home.</dd></div> <div id='KJE-D-MORTGAGES_YOU_OWE' ><dt>Outstanding home loans</dt><dd>Total amount of all outstanding home loan balances, including your first mortgage, second mortgage(s), and any other debt that is secured by your home.</dd></div> <div id='KJE-D-LOAN_TO_VALUE_RATIO' ><dt>Loan-to-value ratio limit</dt><dd>Loan-to-value ratio limit is the maximum loan-to-value ratio (LTV) your lender will allow. LTV is the percentage of your home's appraised value that is borrowed, including all outstanding mortgages and home equity loans and lines secured by your home. For example, a lender's 80% LTV limit for a home appraised at $400,000 would mean a HELOC applicant could have no more than $320,000 in total outstanding home loan balances. Remember, the $320,000 limit would include all existing loans secured by your home plus your new HELOC.</dd></div> ";
KJE.ReportText=' <!--HEADING "Home Equity Line of Credit Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>You may qualify for a CREDIT_LIMIT home equity credit line.</h2> This is based on a maximum debt secured by your home of MAX_OF_LOANS, which is the appraised value of your home times the loan-to-value ratio limit. (APPRAISED_VALUE_OF_YOUR_HOME X LOAN_TO_VALUE_RATIO) **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Appraised value of your home </th><td class="KJECell">APPRAISED_VALUE_OF_YOUR_HOME </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Outstanding home loans </th><td class="KJECell">MORTGAGES_YOU_OWE </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan-to-value ratio limit </th><td class="KJECell">LOAN_TO_VALUE_RATIO </td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Maximum debt to be secured by your home </th><td class="KJECellStrong">MAX_OF_LOANS </td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Line of credit </th><td class="KJECellStrong">CREDIT_LIMIT</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Credit line available for alternate loan-to-value ratio limits</h2> **REPEATING GROUP** ';
KJE.parameters.set("APPRAISED_VALUE_OF_YOUR_HOME",150000);
KJE.parameters.set("LOAN_TO_VALUE_RATIO",80);
KJE.parameters.set("MORTGAGES_YOU_OWE",110000);