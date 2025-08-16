KJE.CollegeSavingsCalc=function(){var c=KJE;
this.AGE_TO_ATTEND_SCHOOL=18;
this.YEARS_OF_SCHOOL=4;
this.CHILD_COUNT_MAX=4;
this.sPrefix=["First","Second","Third","Fourth","Fifth","Sixth","Seventh"];
this.sPrefixLower=["first","second","third","fourth","fifth","sixth","seventh"];
this.sPrefixCount=["one","two","three","four","five","six","seven"];
this.MSG_ROOM_AND_BOARD=KJE.parameters.get("MSG_ROOM_AND_BOARD","Room and board");
this.LBL_ROOM_AND_BOARD=KJE.parameters.get("LBL_ROOM_AND_BOARD","room and board");
this.MSG_ANNUAL_TUITION=KJE.parameters.get("MSG_ANNUAL_TUITION","Tuition");
this.LBL_ANNUAL_TUITION=KJE.parameters.get("LBL_ANNUAL_TUITION","tuition");
this.MSG_PERFECT=KJE.parameters.get("MSG_PERFECT","You will meet your savings goal!");
this.MSG_OVER=KJE.parameters.get("MSG_OVER","You will exceed your savings goal!");
this.MSG_UNDER=KJE.parameters.get("MSG_UNDER","You may need to make a few changes.");
this.MSG_SUMMARY=KJE.parameters.get("MSG_SUMMARY","Your CHILD_LBL will be entering school in CHILD_START_YEARS years. At that time, one year's LBL_ANNUAL_TUITION plus LBL_ROOM_AND_BOARD will have increased from CHILD_TOTAL_PER_YEAR to CHILD_FIRSTYR_COSTS. Total costs for your CHILD_LBL's education are estimated at CHILD_TOTAL_COSTS.");
this.MSG_SUMMARY=KJE.replace("LBL_ROOM_AND_BOARD",this.LBL_ROOM_AND_BOARD,KJE.replace("LBL_ANNUAL_TUITION",this.LBL_ANNUAL_TUITION,this.MSG_SUMMARY));
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Education age cannot be less than your child's current age.");
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Please enter expenses for at least one child.");
this.MSG_MAINTAIN=KJE.parameters.get("MSG_MAINTAIN","You should keep your monthly savings at KJE1.");
this.MSG_INCREASE=KJE.parameters.get("MSG_INCREASE","You should increase your monthly savings to KJE1.");
this.MSG_DECREASE=KJE.parameters.get("MSG_DECREASE","You could decrease your monthly savings to KJE1.");
this.CHILD=new Array(this.CHILD_COUNT_MAX);
this.CHILD_START_YEARS=KJE.IntArray(this.CHILD_COUNT_MAX);
this.AGE_OF_CHILD=KJE.IntArray(this.CHILD_COUNT_MAX);
this.AGE_START=KJE.IntArray(this.CHILD_COUNT_MAX);
this.CHILD_TOTAL_COSTS=KJE.FloatArray(this.CHILD_COUNT_MAX);
this.CHILD_FIRSTYR_COSTS=KJE.FloatArray(this.CHILD_COUNT_MAX);
this.CHILD_TOTAL_PER_YEAR=KJE.FloatArray(this.CHILD_COUNT_MAX);
this.CHILD_ANNUAL_TUITION=KJE.FloatArray(this.CHILD_COUNT_MAX);
this.CHILD_ROOM_AND_BOARD=KJE.FloatArray(this.CHILD_COUNT_MAX);
this.CHILD_SUMMARY=new Array(this.CHILD_COUNT_MAX);
this.MSG_SUMMARY_LBL=new Array(this.CHILD_COUNT_MAX);
this.CHILD_LBL=new Array(this.CHILD_COUNT_MAX);
this.MSG_CHILD=new Array(this.CHILD_COUNT_MAX);
for(var d=0;
d<this.CHILD_COUNT_MAX;
d++){this.CHILD_LBL[d]=KJE.parameters.get("CHILD_LBL"+c.number(d+1),this.sPrefixLower[d]+" child");
this.MSG_SUMMARY_LBL[d]=KJE.parameters.get("MSG_SUMMARY_LBL"+c.number(d+1),this.sPrefix[d]+" child summary");
this.MSG_CHILD[d]=KJE.parameters.get("MSG_CHILD"+c.number(d+1),"Child "+this.sPrefixCount[d])
}this.CHILD_COUNT=0;
this.TOTAL_COST=0;
this.CHANGE_REQUIRED="";
this.RESP_SHOW=KJE.parameters.get("RESP_SHOW",false);
this.RESP_CHECKED=KJE.parameters.get("RESP_CHECKED",false);
this.RESP_INCOME=0;
this.DS_SAVINGS=null;
this.DS_EXPENSES=null;
this.DR_SAVINGS=null;
this.DS_TOTAL_COST=null;
this.CS_TOTAL_COST=null;
this.cats=null;
this.sSchedule=new KJE.Repeating()
};
KJE.CollegeSavingsCalc.prototype.clear=function(){for(var b=0;
b<this.CHILD_COUNT_MAX;
b++){this.AGE_OF_CHILD[b]=0;
this.CHILD_ANNUAL_TUITION[b]=0;
this.CHILD_ROOM_AND_BOARD[b]=0;
this.AGE_START[b]=this.AGE_TO_ATTEND_SCHOOL
}this.COLLEGE_COST_INFLATION=0;
this.CURRENT_SAVINGS=0;
this.MONTHLY_ADDITIONS_TO_SAVINGS=0;
this.RATE_OF_RETURN=0;
this.INCOME_TAX_RATE=0
};
KJE.CollegeSavingsCalc.prototype.calculate=function(t){var B=KJE;
this.TOTAL_COST=0;
this.RESP_GRANT_AMT=0;
var x=this.RATE_OF_RETURN/100*(1-this.INCOME_TAX_RATE/100);
var A=this.COLLEGE_COST_INFLATION/100;
var i=0;
this.CHILD_COUNT=0;
this.YOUNGEST_CHILD=1000;
var y=0;
for(w=0;
w<this.CHILD_COUNT_MAX;
w++){this.CHILD_TOTAL_COSTS[w]=0;
this.CHILD_FIRSTYR_COSTS[w]=0;
this.CHILD_TOTAL_PER_YEAR[w]=this.CHILD_ANNUAL_TUITION[w]+this.CHILD_ROOM_AND_BOARD[w];
i+=this.CHILD_TOTAL_PER_YEAR[w];
if((this.AGE_START[w]-this.AGE_OF_CHILD[w])<0){throw (this.MSG_ERROR2)
}if(this.CHILD_TOTAL_PER_YEAR[w]>0){this.CHILD[w]=true;
this.CHILD_COUNT++;
this.CHILD_START_YEARS[w]=this.AGE_START[w]-this.AGE_OF_CHILD[w];
if(this.YOUNGEST_CHILD>this.AGE_OF_CHILD[w]){this.YOUNGEST_CHILD=this.AGE_OF_CHILD[w]
}if(y<this.AGE_START[w]+this.YEARS_OF_SCHOOL-this.AGE_OF_CHILD[w]){y=this.AGE_START[w]+this.YEARS_OF_SCHOOL-this.AGE_OF_CHILD[w]
}}}if(i<=0){throw (this.MSG_ERROR1)
}var D=Math.ceil(this.getMonthlySavings(x,this.CURRENT_SAVINGS,A,y));
if(D<this.MONTHLY_ADDITIONS_TO_SAVINGS){this.CHANGE_REQUIRED=KJE.getKJEReplaced(this.MSG_DECREASE,B.dollars(D));
this.MSG_RESULTS_STATEMENT=this.MSG_OVER
}else{if(D>this.MONTHLY_ADDITIONS_TO_SAVINGS){this.CHANGE_REQUIRED=KJE.getKJEReplaced(this.MSG_INCREASE,B.dollars(D));
this.MSG_RESULTS_STATEMENT=this.MSG_UNDER
}else{this.CHANGE_REQUIRED=KJE.getKJEReplaced(this.MSG_MAINTAIN,B.dollars(D));
this.MSG_RESULTS_STATEMENT=this.MSG_PERFECT
}}var n=Math.round(y);
this.DS_SAVINGS=KJE.FloatArray(n);
this.DR_SAVINGS=KJE.FloatArray(n);
this.DS_EXPENSES=KJE.FloatArray(n);
this.cats=KJE.FloatArray(n);
var E=this.CURRENT_SAVINGS;
var u=0;
var F=0;
var v=0;
for(C=0;
C<y;
C++){if(this.RESP_SHOW&&this.RESP_CHECKED){v=0;
for(w=0;
w<this.CHILD_COUNT_MAX;
w++){if(this.CHILD[w]==true){v+=KJE.Default.getRESPGrant(C,this.AGE_OF_CHILD[w],this.MONTHLY_ADDITIONS_TO_SAVINGS/this.CHILD_COUNT,this.RESP_INCOME)
}}}else{v=0
}if(C==0){this.RESP_GRANT_AMT=v
}this.RESP_CONTRIB_AMT=(KJE.Default.RESP_CONTRIB_MAX*this.CHILD_COUNT<this.MONTHLY_ADDITIONS_TO_SAVINGS*12?KJE.Default.RESP_CONTRIB_MAX*this.CHILD_COUNT:this.MONTHLY_ADDITIONS_TO_SAVINGS*12);
E=KJE.FV_BEGIN(KJE.ROR_PERIOD(x,12),12,this.MONTHLY_ADDITIONS_TO_SAVINGS+v/12)+E*(1+x);
for(w=0;
w<this.CHILD_COUNT_MAX;
w++){if(this.CHILD[w]&&C>=this.CHILD_START_YEARS[w]&&C<this.CHILD_START_YEARS[w]+4){u=KJE.FV_AMT(A,C,this.CHILD_TOTAL_PER_YEAR[w]);
E-=u;
F+=u;
this.CHILD_TOTAL_COSTS[w]+=u;
if(C==this.CHILD_START_YEARS[w]){this.CHILD_FIRSTYR_COSTS[w]=u
}}}this.DR_SAVINGS[C]=E;
this.DS_EXPENSES[C]=F;
this.TOTAL_COST+=F;
F=0
}this.DS_TOTAL_COST=KJE.FloatArray(this.CHILD_COUNT);
this.CS_TOTAL_COST=new Array(this.CHILD_COUNT);
var s=0;
for(w=0;
w<this.CHILD_COUNT_MAX;
w++){if(this.CHILD[w]==true){this.DS_TOTAL_COST[s]=(this.CHILD_TOTAL_COSTS[w]);
this.CS_TOTAL_COST[s]=this.MSG_CHILD[w];
s++
}}if(t){var z=this.sSchedule;
z.clearRepeat();
z.addHeader(z.sReportCol("<br />Year",1),z.sReportCol("Starting Savings<br />Balance",2),z.sReportCol("Savings Contributions<br /> and Interest",3),z.sReportCol("<br />Expenses",4),z.sReportCol("Ending Savings<br />Balance",5))
}var w=0;
for(var C=1;
C<=n;
C++){w=C-1;
this.cats[w]=""+C;
if(this.DR_SAVINGS[w]<0){this.DS_SAVINGS[w]=0
}else{this.DS_SAVINGS[w]=((this.DR_SAVINGS[w]))
}if(t){z.addRepeat(C,B.dollars(w<1?this.CURRENT_SAVINGS:this.DR_SAVINGS[w-1]),B.dollars(this.DR_SAVINGS[w]-(w<1?this.CURRENT_SAVINGS:this.DR_SAVINGS[w-1])+this.DS_EXPENSES[w]),B.dollars(this.DS_EXPENSES[w]),B.dollars(this.DR_SAVINGS[w]))
}}for(w=0;
w<this.CHILD_COUNT_MAX;
w++){if(this.CHILD[w]){this.CHILD_SUMMARY[w]=this.getSummary(w)
}else{this.CHILD_SUMMARY[w]=""
}}this.CALC_MONTHLY_SAVINGS_REQUIRED=D;
this.YEARS_BEFORE_DONE=y
};
KJE.CollegeSavingsCalc.prototype.formatReport=function(c){for(var d=0;
d<this.CHILD_COUNT_MAX;
d++){c.replace("CHILD_SUMMARY"+(d+1),this.CHILD_SUMMARY[d]);
c.dollars("AGE_OF_CHILD"+(d+1),this.AGE_OF_CHILD[d]);
c.age("AGE_START"+(d+1),this.AGE_START[d]);
c.dollars("CHILD_ANNUAL_TUITION"+(d+1),this.CHILD_ANNUAL_TUITION[d]);
c.dollars("CHILD_ROOM_AND_BOARD"+(d+1),this.CHILD_ROOM_AND_BOARD[d]);
c.dollars("CHILD_TOTAL_PER_YEAR"+(d+1),this.CHILD_TOTAL_PER_YEAR[d]);
c.year("CHILD_START_YEARS"+(d+1),this.CHILD_START_YEARS[d]);
c.dollars("CHILD_TOTAL_COSTS"+(d+1),this.CHILD_TOTAL_COSTS[d]);
c.dollars("CHILD_FIRSTYR_COSTS"+(d+1),this.CHILD_FIRSTYR_COSTS[d])
}c.replace("CHANGE_REQUIRED",this.CHANGE_REQUIRED);
c.inflationRate("COLLEGE_COST_INFLATION",this.COLLEGE_COST_INFLATION/100);
c.dollars("CURRENT_SAVINGS",this.CURRENT_SAVINGS);
c.dollars("MONTHLY_ADDITIONS_TO_SAVINGS",this.MONTHLY_ADDITIONS_TO_SAVINGS);
c.returnRate("RATE_OF_RETURN",this.RATE_OF_RETURN/100);
c.dollars("INCOME_TAX_RATE",this.INCOME_TAX_RATE);
c.dollars("CALC_MONTHLY_SAVINGS_REQUIRED",this.CALC_MONTHLY_SAVINGS_REQUIRED);
c.replace("MSG_RESULTS_STATEMENT",this.MSG_RESULTS_STATEMENT);
c.dollars("CALC_MONTHLY_SAVINGS_REQUIRED",this.CALC_MONTHLY_SAVINGS_REQUIRED);
c.year("YEARS_BEFORE_DONE",this.YEARS_BEFORE_DONE);
c.number("YOUNGEST_CHILD",this.YOUNGEST_CHILD);
c.dollars("TOTAL_COST",this.TOTAL_COST);
c.dollars("ANNUAL_ADDITIONS_TO_SAVINGS",this.MONTHLY_ADDITIONS_TO_SAVINGS*12);
if(this.RESP_SHOW){c.dollars("RESP_CONTRIB_AMT",this.RESP_CONTRIB_AMT);
c.replace("RESP_INCOME",KJE.Default.RESP_RANGES_DESC[this.RESP_INCOME]);
c.dollars("RESP_GRANT_AMT",this.RESP_GRANT_AMT);
c.dollars("RESP_GRANT_MAX",KJE.Default.RESP_GRANT_MAX);
c.dollars("RESP_CONTRIB_MAX",KJE.Default.RESP_CONTRIB_MAX);
c.percent("RESP_GRANT_PERCENT",KJE.Default.RESP_GRANT_PERCENT)
}c.replace("MSG_ANNUAL_TUITION",this.MSG_ANNUAL_TUITION);
c.replace("LBL_ANNUAL_TUITION",this.LBL_ANNUAL_TUITION);
c.replace("LBL_ROOM_AND_BOARD",this.LBL_ROOM_AND_BOARD);
c.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CollegeSavingsCalc.prototype.getSummary=function(e){var f=KJE;
var d=KJE.replace("CHILD_START_YEARS",f.number(this.CHILD_START_YEARS[e]),this.MSG_SUMMARY);
d=KJE.replace("CHILD_TOTAL_PER_YEAR",f.dollars(this.CHILD_TOTAL_PER_YEAR[e]),d);
d=KJE.replace("CHILD_FIRSTYR_COSTS",f.dollars(this.CHILD_FIRSTYR_COSTS[e]),d);
d=KJE.replace("CHILD_LBL",this.CHILD_LBL[e],d);
d=KJE.replace("CHILD_TOTAL_COSTS",f.dollars(this.CHILD_TOTAL_COSTS[e]),d);
return"<p><strong>"+this.MSG_SUMMARY_LBL[e]+"</strong><br />"+d
};
KJE.CollegeSavingsCalc.prototype.getMonthlySavings=function(o,i,n,j){var m=10000;
var k=5000;
var p=0;
if(this.getBalance(o,0,i,n,j)>=0){return 0
}for(var l=1;
l<50;
l++){p=this.getBalance(o,m,i,n,j);
if(p==0){return m
}else{if(p>0){m-=k
}else{m+=k
}}k=k/2
}return m
};
KJE.CollegeSavingsCalc.prototype.getCurrentSavings=function(m,l,h){var i=2000000;
var j=1000000;
var n=0;
for(var k=1;
k<50;
k++){n=this.getBalance(m,0,i,l,h);
if(n==0){return i
}else{if(n>0){i-=j
}else{i+=j
}}j=j/2
}return i
};
KJE.CollegeSavingsCalc.prototype.getBalance=function(x,t,n,y,u){var D=n;
var v=0;
var w=0;
var B=this.AGE_OF_CHILD;
var C=this.CHILD_COUNT;
var i=this.CHILD;
var r=this.CHILD_COUNT_MAX;
var z=this.CHILD_START_YEARS;
var s=this.CHILD_TOTAL_PER_YEAR;
for(var A=0;
A<u;
A++){if(this.RESP_SHOW&&this.RESP_CHECKED){v=0;
for(w=0;
w<this.CHILD_COUNT_MAX;
w++){if(i[w]==true){v+=KJE.Default.getRESPGrant(A,B[w],t/C,this.RESP_INCOME)
}}}else{v=0
}D=KJE.FV_BEGIN(KJE.ROR_PERIOD(x,12),12,t+v/12)+D*(1+x);
for(w=0;
w<r;
w++){if(i[w]&&A>=z[w]&&A<z[w]+4){D-=KJE.FV_AMT(y,A,s[w])
}}}return D
};
KJE.CollegeSavingsCalc.DefaultTuition=41540;
KJE.CollegeSavingsCalc.DefaultRoom=18880;
KJE.CollegeSavingsCalc.DefaultAgeStart=18;
KJE.CollegeSavingsCalc.DefaultInflation=3;
KJE.CalcName="College Savings Calculator";
KJE.CalcType="collegesavings";
KJE.CalculatorTitleTemplate="KJE1 KJE2";
KJE.initialize=function(){KJE.CalcControl=new KJE.CollegeSavingsCalc();
KJE.GuiControl=new KJE.CollegeSavings(KJE.CalcControl)
};
KJE.CollegeSavings=function(D){var E=KJE;
var i=KJE.gLegend;
var B=KJE.inputs.items;
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Balance");
this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Expenses");
this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Balance and Expenses by Year");
this.MSG_GRAPH4=KJE.parameters.get("MSG_GRAPH4","Year number");
this.MSG_GRAPH5=KJE.parameters.get("MSG_GRAPH5","Total Costs By Child");
var J=KJE.parameters.get("MSG_TOTAL","Total expenses");
KJE.SliderKnobExtraClass=(KJE.DropperColors?KJE.DropperColors[0]:false);
KJE.InflationRateSlider("COLLEGE_COST_INFLATION","Education cost inflation");
KJE.DollarSlider("CURRENT_SAVINGS","Current savings",0,1000000);
KJE.DollarSlider("MONTHLY_ADDITIONS_TO_SAVINGS","Monthly contributions",0,100000);
KJE.InvestRateSlider("RATE_OF_RETURN","Rate of return");
KJE.Label("MONTHLY_REQUIRED","Monthly contributions required");
KJE.DropBox("RESP_INCOME","Annual income range");
KJE.Checkbox("RESP_CHECKED","Include RESP",null,"Include Registered Education Savings Plan in calculations");
for(var x=0;
x<D.CHILD_COUNT_MAX;
x++){KJE.SliderKnobExtraClass=(KJE.DropperColors?KJE.DropperColors[x+1]:false);
KJE.InputItem.AltHelpName="AGE_OF_CHILD";
KJE.NumberSlider("AGE_OF_CHILD"+E.number(x+1),"Age of child "+D.sPrefixCount[x],0,(D.RESP_SHOW?25:25),0);
KJE.InputItem.AltHelpName="AGE_START";
KJE.NumberSlider("AGE_START"+E.number(x+1),KJE.parameters.get("MSG_AGE_START","Age to start education"),0,(D.RESP_SHOW?25:25),0);
KJE.InputItem.AltHelpName="CHILD_ANNUAL_TUITION";
KJE.DollarSlider("CHILD_ANNUAL_TUITION"+E.number(x+1),D.MSG_ANNUAL_TUITION,0,100000);
KJE.InputItem.AltHelpName="CHILD_ROOM_AND_BOARD";
KJE.DollarSlider("CHILD_ROOM_AND_BOARD"+E.number(x+1),D.MSG_ROOM_AND_BOARD,0,100000)
}var u=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],this.MSG_GRAPH3);
u._legend._iOrientation=(i.GRID_TOP_LEFT);
u._titleYAxis.setText(KJE.sCurrency);
u._titleXAxis.setText(this.MSG_GRAPH4);
var l=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH2",true,true,KJE.colorList[1],this.MSG_GRAPH5);
l._axisX._fSpacingPercent=0.3;
l._showItemLabel=true;
l._showItemLabelOnTop=true;
l._legend.setVisible(false);
l._titleXAxis.setText("");
l._titleYAxis.setText(KJE.sCurrency);
var v=KJE.parameters.get("MSG_DROPPER1","College Savings plan:");
var w=function(){return v+"|"+KJE.subText(J+" "+E.dollars(D.TOTAL_COST),"KJERightBold",KJE.subTextDropperContainer)
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,w,w),KJE.colorList[0]);
var y=KJE.parameters.get("MSG_ENTER_LBL1","College expenses child one:");
var F=function(){return y+"|"+KJE.subText(E.dollars(D.CHILD_TOTAL_COSTS[0]),"KJERightBold",KJE.subTextDropperContainer)
};
KJE.addDropper(new KJE.Dropper("CHILD1",true,F,F),KJE.colorList[0]);
var z=KJE.parameters.get("MSG_ENTER_LBL2","College expenses child two:");
var G=function(){return z+"|"+KJE.subText(E.dollars(D.CHILD_TOTAL_COSTS[1]),"KJERightBold",KJE.subTextDropperContainer)
};
KJE.addDropper(new KJE.Dropper("CHILD2",false,G,G),KJE.colorList[0]);
var A=KJE.parameters.get("MSG_ENTER_LBL3","College expenses child three:");
var H=function(){return A+"|"+KJE.subText(E.dollars(D.CHILD_TOTAL_COSTS[2]),"KJERightBold",KJE.subTextDropperContainer)
};
KJE.addDropper(new KJE.Dropper("CHILD3",false,H,H),KJE.colorList[0]);
var C=KJE.parameters.get("MSG_ENTER_LBL4","College expenses child four:");
var I=function(){return C+"|"+KJE.subText(E.dollars(D.CHILD_TOTAL_COSTS[3]),"KJERightBold",KJE.subTextDropperContainer)
};
KJE.addDropper(new KJE.Dropper("CHILD4",false,I,I),KJE.colorList[0])
};
KJE.CollegeSavings.prototype.setValues=function(h){var f=KJE.inputs.items;
h.COLLEGE_COST_INFLATION=f.COLLEGE_COST_INFLATION.getValue();
h.CURRENT_SAVINGS=f.CURRENT_SAVINGS.getValue();
h.MONTHLY_ADDITIONS_TO_SAVINGS=f.MONTHLY_ADDITIONS_TO_SAVINGS.getValue();
h.RATE_OF_RETURN=f.RATE_OF_RETURN.getValue();
h.INCOME_TAX_RATE=0;
for(var e=0;
e<h.CHILD_COUNT_MAX;
e++){var g=KJE.number(e+1);
h.AGE_OF_CHILD[e]=f["AGE_OF_CHILD"+g].getValue();
h.CHILD_ANNUAL_TUITION[e]=f["CHILD_ANNUAL_TUITION"+g].getValue();
h.CHILD_ROOM_AND_BOARD[e]=f["CHILD_ROOM_AND_BOARD"+g].getValue();
h.AGE_START[e]=f["AGE_START"+g].getValue()
}if(KJE.Default.CACollegeSavingsSetValues){KJE.Default.CACollegeSavingsSetValues(h)
}};
KJE.CollegeSavings.prototype.refresh=function(h){var i=KJE;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
var j=KJE.gGraphs[1];
KJE.setTitleTemplate(h.MSG_RESULTS_STATEMENT,KJE.subText(h.CHANGE_REQUIRED,"KJECenter"));
g.removeAll();
g.setGraphCategories(h.cats);
g.add(new KJE.gGraphDataSeries(h.DS_SAVINGS,this.MSG_GRAPH1,g.getColor(1),"",this.MSG_GRAPH1+" "+KJE.MSG_YEAR_LBL));
g.add(new KJE.gGraphDataSeries(h.DS_EXPENSES,this.MSG_GRAPH2,g.getColor(2),"",this.MSG_GRAPH2+" "+KJE.MSG_YEAR_LBL));
g.paint();
j.removeAll();
j.setGraphCategories(h.CS_TOTAL_COST);
j.add(new KJE.gGraphDataSeries(h.DS_TOTAL_COST,this.MSG_GRAPH1,g.getColor(1)));
j.paint();
f.MONTHLY_REQUIRED.setText(i.dollars(h.CALC_MONTHLY_SAVINGS_REQUIRED))
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-COLLEGE_COST_INFLATION'><input id='KJE-COLLEGE_COST_INFLATION' /></div> <div id='KJE-C-CURRENT_SAVINGS'><input id='KJE-CURRENT_SAVINGS' /></div> <div id='KJE-C-MONTHLY_ADDITIONS_TO_SAVINGS'><input id='KJE-MONTHLY_ADDITIONS_TO_SAVINGS' /></div> <div id='KJE-C-RATE_OF_RETURN'><input id='KJE-RATE_OF_RETURN' /></div> <div id='KJE-C-CALC_MONTHLY_SAVINGS_REQUIRED'><div id='KJE-CALC_MONTHLY_SAVINGS_REQUIRED'></div></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-CHILD1><div id=KJE-P-CHILD1>Input information:</div></div> <div id=KJE-E-CHILD1 > <fieldset class='KJEAccessibleFieldSet'><legend class='KJEAccessibleFieldSetLegend'>child 1</legend> <div id='KJE-C-AGE_OF_CHILD1'><input id='KJE-AGE_OF_CHILD1' /></div> <div id='KJE-C-AGE_START1'><input id='KJE-AGE_START1' /></div> <div id='KJE-C-CHILD_ANNUAL_TUITION1'><input id='KJE-CHILD_ANNUAL_TUITION1' /></div> <div id='KJE-C-CHILD_ROOM_AND_BOARD1'><input id='KJE-CHILD_ROOM_AND_BOARD1' /></div> </fieldset> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-CHILD2><div id=KJE-P-CHILD2>Input information:</div></div> <div id=KJE-E-CHILD2 > <fieldset class='KJEAccessibleFieldSet'><legend class='KJEAccessibleFieldSetLegend'>child 2</legend> <div id='KJE-C-AGE_OF_CHILD2'><input id='KJE-AGE_OF_CHILD2' /></div> <div id='KJE-C-AGE_START2'><input id='KJE-AGE_START2' /></div> <div id='KJE-C-CHILD_ANNUAL_TUITION2'><input id='KJE-CHILD_ANNUAL_TUITION2' /></div> <div id='KJE-C-CHILD_ROOM_AND_BOARD2'><input id='KJE-CHILD_ROOM_AND_BOARD2' /></div> <div class=KJEDropperSpacer></div> </fieldset> </div> <div id=KJE-D-CHILD3><div id=KJE-P-CHILD3>Input information:</div></div> <div id=KJE-E-CHILD3 > <fieldset class='KJEAccessibleFieldSet'><legend class='KJEAccessibleFieldSetLegend'>child 3</legend> <div id='KJE-C-AGE_OF_CHILD3'><input id='KJE-AGE_OF_CHILD3' /></div> <div id='KJE-C-AGE_START3'><input id='KJE-AGE_START3' /></div> <div id='KJE-C-CHILD_ANNUAL_TUITION3'><input id='KJE-CHILD_ANNUAL_TUITION3' /></div> <div id='KJE-C-CHILD_ROOM_AND_BOARD3'><input id='KJE-CHILD_ROOM_AND_BOARD3' /></div> <div class=KJEDropperSpacer></div> </fieldset> </div> <div id=KJE-D-CHILD4><div id=KJE-P-CHILD4>Input information:</div></div> <div id=KJE-E-CHILD4 > <fieldset class='KJEAccessibleFieldSet'><legend class='KJEAccessibleFieldSetLegend'>child 4</legend> <div id='KJE-C-AGE_OF_CHILD4'><input id='KJE-AGE_OF_CHILD4' /></div> <div id='KJE-C-AGE_START4'><input id='KJE-AGE_START4' /></div> <div id='KJE-C-CHILD_ANNUAL_TUITION4'><input id='KJE-CHILD_ANNUAL_TUITION4' /></div> <div id='KJE-C-CHILD_ROOM_AND_BOARD4'><input id='KJE-CHILD_ROOM_AND_BOARD4' /></div> <div class=KJEDropperSpacer></div> </fieldset> </div> **GRAPH1** **GRAPH2** ";
KJE.DefinitionText=" <div id='KJE-D-AGE_OF_CHILD' ><dt>Age of children</dt><dd>The current age of your children. The difference between their current age and the age they start college is the number of years you have to save.</dd></div> <div id='KJE-D-AGE_START' ><dt>Age to start education</dt><dd>The age your child will begin college. The default is 18, but this can be any age up to 25.</dd></div> <div id='KJE-D-CHILD_ANNUAL_TUITION' ><dt>Annual tuition</dt><dd>The current estimated cost of one year of tuition and books. This amount should be per child and be specific to the school they may be interested in attending. The average published costs of college for the 2023-24 school year (including tuition, room and board, books, supplies, transportation and other personal expenses) as reported by the College Board: <div class='KJEReportTableDiv'><table class='KJEReportTable KJEReportTableShrink'> <caption class='KJEHeaderRow KJEHeading'>U.S. Undergraduate College Costs for 2023-24 School Year<br /><div class=KJEFooter>Source: College Board's 2023 Trends in College Pricing, www.collegeboard.com</div></caption> <thead><tr class=KJEFooterRow><th class='KJEColumnHeader KJECell40' scope='col'>College Type </th><th class='KJEColumnHeader KJECell15' scope='col'>Tuition & Fees</th><th class='KJEColumnHeader KJECell15' scope='col'>Additional Expenses<sup>*</sup></th><th class='KJEColumnHeader KJECell15' scope='col'>Total</th><th class='KJEColumnHeader KJECell15' scope='col'>Change from 2022-23</th></tr></thead> <tbody class=\"KJEReportTBody\"> <tr class='KJEOddRow'><th class='KJELabel KJECellBorder KJELabelPad' scope='row'>Public 4-Year (in-state tuition)</th><td class='KJECell KJECellBorder'>$11,260</td><td class='KJECell KJECellBorder'>$17,580</td><td class='KJECell KJECellBorder'>$28,840</td><td class='KJECell'>$900</td></tr> <tr class='KJEEvenRow'><th class='KJELabel KJECellBorder KJELabelPad' scope='row'>Public 4-Year (out-state tuition)</th><td class='KJECell KJECellBorder'>$29,150</td><td class='KJECell KJECellBorder'>$17,580</td><td class='KJECell KJECellBorder'>$46,730</td><td class='KJECell'>$1,490</td></tr> <tr class='KJEOddRow'><th class='KJELabel KJECellBorder KJELabelPad' scope='row'>Private 4-Year</th><td class='KJECell KJECellBorder'>$41,540</td><td class='KJECell KJECellBorder'>$18,880</td><td class='KJECell KJECellBorder'>$60,420</td><td class='KJECell'>$2,850</td></tr> </tbody> </table></div> <div class=\"KJEFooter KJECenterText\"><sup>*</sup>This includes room and board, books, supplies, transportation and other personal expenses.</div> <p>For the purposes of this calculator all expenses are assumed to be due at the end of the year.</dd></div> <div id='KJE-D-CHILD_ROOM_AND_BOARD' ><dt>Room and board</dt><dd>The current estimated cost of one-year room, board and any other expenses not included in annual tuition. This could include room and board, books, supplies, transportation and other personal expenses. Like tuition, this amount should be per child and specific to the school they may be interested in attending. For the purposes of this calculator, all expenses are assumed to be due at the end of the year.</dd></div> <div id='KJE-D-COLLEGE_COST_INFLATION' ><dt>Education cost inflation</dt><dd>This is the percentage that you expect educational costs to increase per year. Data provided by The College Board's &quot;Trends in College Pricing 2023&quot; reported tuition and fees increased approximately 4.8% annually over the past 30 years. 2023 saw a smaller increase of approximately 2%.</dd></div> <div id='KJE-D-CURRENT_SAVINGS' ><dt>Current amount</dt><dd>The total amount you currently have saved for your children's education.</dd></div> <div id='KJE-D-MONTHLY_ADDITIONS_TO_SAVINGS' ><dt>Monthly contributions</dt><dd>The dollar amount you plan to save per month toward your children's education. All amounts are assumed to be added to your account at the beginning of the month.</dd></div> <div id='KJE-D-RATE_OF_RETURN' ><dt>Rate of return</dt><dd>This is the annually compounded rate of return you expect from your investments. This will also be the rate used if you end up with a negative balance and need to borrow money to meet your goal. **ROR_DEFINITION** </dd></div> ";
KJE.ReportText=' <!--HEADING "College Savings Plan" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>MSG_RESULTS_STATEMENT</h2>During the next YEARS_BEFORE_DONE years you will need to save about TOTAL_COST to cover educational expenses. MSG_RESULTS_STATEMENT CHANGE_REQUIRED<p>**GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Your Current Savings Plan</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Education cost inflation </th><td class="KJELabel KJECell40">COLLEGE_COST_INFLATION </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current savings </th><td class="KJELabel">CURRENT_SAVINGS </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly contributions </th><td class="KJELabel">MONTHLY_ADDITIONS_TO_SAVINGS </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Rate of return </th><td class="KJELabel">RATE_OF_RETURN </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total expenses </th><td class="KJELabel">TOTAL_COST</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECenter" colspan=2 scope="colgroup">CHANGE_REQUIRED</th></tr> </tfoot> </table> </div> <BR> <h2 class=\'KJEReportHeader KJEFontHeading\'>Educational Expenses</h2>The following educational costs assume that your children will attend a four-year program. If they are planning on attending school for a longer period of time, the cost will increase. **GRAPH** CHILD_SUMMARY1 CHILD_SUMMARY2 CHILD_SUMMARY3 CHILD_SUMMARY4 <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Savings and expenses by year</h2> **REPEATING GROUP** ';
KJE.parameters.set("COLLEGE_COST_INFLATION",KJE.CollegeSavingsCalc.DefaultInflation);
KJE.parameters.set("CURRENT_SAVINGS",0);
KJE.parameters.set("MONTHLY_ADDITIONS_TO_SAVINGS",250);
KJE.parameters.set("RATE_OF_RETURN",KJE.Default.RORMarket);
KJE.parameters.set("AGE_OF_CHILD1",9);
KJE.parameters.set("AGE_START1",KJE.CollegeSavingsCalc.DefaultAgeStart);
KJE.parameters.set("CHILD_ANNUAL_TUITION1",KJE.CollegeSavingsCalc.DefaultTuition);
KJE.parameters.set("CHILD_ROOM_AND_BOARD1",KJE.CollegeSavingsCalc.DefaultRoom);
KJE.parameters.set("AGE_OF_CHILD2",0);
KJE.parameters.set("AGE_START2",KJE.CollegeSavingsCalc.DefaultAgeStart);
KJE.parameters.set("CHILD_ANNUAL_TUITION2",0);
KJE.parameters.set("CHILD_ROOM_AND_BOARD2",0);
KJE.parameters.set("AGE_OF_CHILD3",0);
KJE.parameters.set("AGE_START3",KJE.CollegeSavingsCalc.DefaultAgeStart);
KJE.parameters.set("CHILD_ANNUAL_TUITION3",0);
KJE.parameters.set("CHILD_ROOM_AND_BOARD3",0);
KJE.parameters.set("AGE_OF_CHILD4",0);
KJE.parameters.set("AGE_START4",KJE.CollegeSavingsCalc.DefaultAgeStart);
KJE.parameters.set("CHILD_ANNUAL_TUITION4",0);
KJE.parameters.set("CHILD_ROOM_AND_BOARD4",0);