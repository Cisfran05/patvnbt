KJE.PayoffCCCalc=function(){this.SHOW_MAX=KJE.parameters.get("SHOW_MAX",120);
this.PAYOFF_MONTHS_CHANGE=12;
this.CURRENT_MONTHLY_MSG="";
this.MSG_MORE_THAN360=KJE.parameters.get("MSG_MORE_THAN360","more than 360 months");
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Your first purchase must be before your pay off goal.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Your second purchase must be before your pay off goal.");
this.MSG_ERROR3=KJE.parameters.get("MSG_ERROR3","Your third purchase must be before your pay off goal.");
this.MSG_ERROR4=KJE.parameters.get("MSG_ERROR4","Your fourth purchase must be before your pay off goal.");
this.MSG_ERROR5=KJE.parameters.get("MSG_ERROR5","Your current balance is less than your monthly payment.");
this.DS_BALANCE=null;
this.DS_BALANCE2=null;
this.DS_CHANGE_PAYOFF=KJE.FloatArray(5);
this.CS_CHANGE_PAYOFF=new Array(5);
this.cats=null;
this.sSchedule=new KJE.Repeating()
};
KJE.PayoffCCCalc.prototype.clear=function(){this.CURRENT_BALANCE=0;
this.MONTHLY_CHARGES=0;
this.CURRENT_MONTHLY_PAYMENT=0;
this.ANNUAL_FEE=0;
this.INTEREST_RATE=0;
this.RATE_CHANGE_PER_YEAR=0;
this.MONTHS_TO_PAYOFF_GOAL=0;
this.DRAW_ONE=0;
this.MONTHS_FROM_NOW_ONE=0;
this.DRAW_TWO=0;
this.MONTHS_FROM_NOW_TWO=0;
this.DRAW_THREE=0;
this.MONTHS_FROM_NOW_THREE=0;
this.DRAW_FOUR=0;
this.MONTHS_FROM_NOW_FOUR=0
};
KJE.PayoffCCCalc.prototype.calculate=function(v){var G=KJE;
var x=this.CURRENT_BALANCE;
var z=this.MONTHLY_CHARGES;
var u=this.CURRENT_MONTHLY_PAYMENT;
var K=this.ANNUAL_FEE;
var I=this.INTEREST_RATE;
var w=this.RATE_CHANGE_PER_YEAR;
var L=this.MONTHS_TO_PAYOFF_GOAL;
if(this.MONTHS_FROM_NOW_ONE>L){throw (this.MSG_ERROR1)
}if(this.MONTHS_FROM_NOW_TWO>L){throw (this.MSG_ERROR2)
}if(this.MONTHS_FROM_NOW_THREE>L){throw (this.MSG_ERROR3)
}if(this.MONTHS_FROM_NOW_FOUR>L){throw (this.MSG_ERROR3)
}if(x<=u){throw (this.MSG_ERROR5)
}var B=this.getPayment(x,z,L,K,I/100,w/100);
var H=this.getPayoffMonths(x,z,u,K,I/100,w/100);
this.TOTAL_DRAWS=this.DRAW_ONE+this.DRAW_TWO+this.DRAW_THREE+this.DRAW_FOUR;
var y=L;
if(L<25){y=12
}else{if(L<61){y=24
}else{y=36
}}for(var A=0;
A<5;
A++){this.CS_CHANGE_PAYOFF[A]=G.number(y)+" "+KJE.MSG_MONTHS_LBL;
this.DS_CHANGE_PAYOFF[A]=this.getPayment(x,z,y,K,I/100,w/100);
y+=this.PAYOFF_MONTHS_CHANGE
}var n=0;
var E=0;
var J=B-u;
var C=Math.round(H);
if(C>this.SHOW_MAX){C=this.SHOW_MAX-1
}this.DS_BALANCE=KJE.FloatArray(C+1);
this.DS_BALANCE2=KJE.FloatArray(C+1);
this.cats=new Array(C+1);
if(v){var F=this.sSchedule;
F.clearRepeat();
var D=F.sReportCol("Charges",1);
if(z==0){D=F.sReportCol("Principal",2)
}F.addHeader(F.sReportCol(" # ",3),F.sReportCol("Payment",4),F.sReportCol("Interest",5),D,F.sReportCol("Balance",6));
F.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",G.dollars(x))
}this.getEndingBalance2(x,z,Math.round(H),u,K,I/100,w/100,B,this.DS_BALANCE,this.DS_BALANCE2,this.cats,v,this.sSchedule);
if(H>359){this.CURRENT_MONTHLY_MSG=this.MSG_MORE_THAN360
}else{this.CURRENT_MONTHLY_MSG=G.number(H)+" "+KJE.MSG_MONTHS_LBL
}this.INTEREST_IN_YEAR_ONE=n;
this.TOTAL_INTEREST=E;
this.CALCULATED_MONTHS_TO_PAYOFF=H;
this.CALCULATED_MONTHLY_PAYMENT=B;
this.CALCULATED_PAYMENT_INCREASE=J
};
KJE.PayoffCCCalc.prototype.formatReport=function(b){b.dollars("CURRENT_BALANCE",this.CURRENT_BALANCE);
b.dollars("MONTHLY_CHARGES",this.MONTHLY_CHARGES);
b.dollars("CURRENT_MONTHLY_PAYMENT",this.CURRENT_MONTHLY_PAYMENT);
b.dollars("ANNUAL_FEE",this.ANNUAL_FEE);
b.loanRate("INTEREST_RATE",this.INTEREST_RATE/100);
b.percent("RATE_CHANGE_PER_YEAR",this.RATE_CHANGE_PER_YEAR/100,2);
b.number("MONTHS_TO_PAYOFF_GOAL",this.MONTHS_TO_PAYOFF_GOAL);
b.dollars("DRAW_ONE",this.DRAW_ONE);
b.dollars("DRAW_TWO",this.DRAW_TWO);
b.dollars("DRAW_THREE",this.DRAW_THREE);
b.dollars("DRAW_FOUR",this.DRAW_FOUR);
b.number("MONTHS_FROM_NOW_ONE",this.MONTHS_FROM_NOW_ONE);
b.number("MONTHS_FROM_NOW_TWO",this.MONTHS_FROM_NOW_TWO);
b.number("MONTHS_FROM_NOW_THREE",this.MONTHS_FROM_NOW_THREE);
b.number("MONTHS_FROM_NOW_FOUR",this.MONTHS_FROM_NOW_FOUR);
b.dollars("INTEREST_IN_YEAR_ONE",this.INTEREST_IN_YEAR_ONE);
b.dollars("TOTAL_INTEREST",this.TOTAL_INTEREST);
b.number("CALCULATED_MONTHS_TO_PAYOFF",this.CALCULATED_MONTHS_TO_PAYOFF);
b.dollars("CALCULATED_MONTHLY_PAYMENT",this.CALCULATED_MONTHLY_PAYMENT);
b.dollars("CALCULATED_PAYMENT_INCREASE",this.CALCULATED_PAYMENT_INCREASE);
b.replace("CURRENT_MONTHLY_MSG",this.CURRENT_MONTHLY_MSG);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.PayoffCCCalc.prototype.getEndingBalance2=function(i,N,F,P,z,G,H,B,D,E,M,n,O){var y=i;
var Q=i;
var J=G/12;
var K=0;
var A=0;
var L=0;
var R=0;
D[0]=Q;
E[0]=y;
M[0]=KJE.number(0);
if(0==this.MONTHS_FROM_NOW_ONE){Q+=this.DRAW_ONE;
y+=this.DRAW_ONE
}if(0==this.MONTHS_FROM_NOW_TWO){Q+=this.DRAW_TWO;
y+=this.DRAW_TWO
}if(0==this.MONTHS_FROM_NOW_THREE){Q+=this.DRAW_THREE;
y+=this.DRAW_THREE
}if(0==this.MONTHS_FROM_NOW_FOUR){Q+=this.DRAW_FOUR;
y+=this.DRAW_FOUR
}for(var C=1;
C<=F;
C++){var I=C-1;
if((C-1)%12==0&&C>1){J+=(H/12)
}if(C%12==0&&C>1){Q+=z;
y+=z
}K=0;
if(C==this.MONTHS_FROM_NOW_ONE){K+=this.DRAW_ONE
}if(C==this.MONTHS_FROM_NOW_TWO){K+=this.DRAW_TWO
}if(C==this.MONTHS_FROM_NOW_THREE){K+=this.DRAW_THREE
}if(C==this.MONTHS_FROM_NOW_FOUR){K+=this.DRAW_FOUR
}K+=N;
Q+=K;
y+=K;
A=Q*J;
Q+=A;
y+=y*J;
Q-=P;
y-=B;
if(n&&I<D.length){L=Q;
R=P;
if(L<0){R=Q+P;
L=0
}if(N>0){O.addRepeat(C,KJE.dollars(R),KJE.dollars(A),KJE.dollars(K),KJE.dollars(L))
}else{O.addRepeat(C,KJE.dollars(R),KJE.dollars(A),KJE.dollars(R-A),KJE.dollars(L))
}}if(C<D.length){if(y>=0){E[C]=y
}else{E[C]=(0)
}if(Q>=0){D[C]=Q
}else{D[C]=(0)
}M[C]=KJE.number(C)
}}return Q
};
KJE.PayoffCCCalc.prototype.getPayment=function(y,G,H,E,C,x){var A=32768;
var w=16384;
var i=0;
if(G==0&&E==0&&x==0&&(this.DRAW_ONE+this.DRAW_TWO+this.DRAW_THREE+this.DRAW_FOUR)==0){return KJE.PMT(C/12,H,y)
}var n=y;
var t=C/12;
var u=0;
var z=0;
var D=0;
var v=0;
for(var F=1;
F<50;
F++){n=y;
t=C/12;
u=0;
z=0;
D=0;
v=0;
if(0==this.MONTHS_FROM_NOW_ONE){n+=this.DRAW_ONE
}if(0==this.MONTHS_FROM_NOW_TWO){n+=this.DRAW_TWO
}if(0==this.MONTHS_FROM_NOW_THREE){n+=this.DRAW_THREE
}if(0==this.MONTHS_FROM_NOW_FOUR){n+=this.DRAW_FOUR
}for(var B=1;
B<=H;
B++){if((B-1)%12==0&&B>1){t+=(x/12)
}if(B%12==0&&B>1){n+=E
}u=0;
if(B==this.MONTHS_FROM_NOW_ONE){u+=this.DRAW_ONE
}if(B==this.MONTHS_FROM_NOW_TWO){u+=this.DRAW_TWO
}if(B==this.MONTHS_FROM_NOW_THREE){u+=this.DRAW_THREE
}if(B==this.MONTHS_FROM_NOW_FOUR){u+=this.DRAW_FOUR
}u+=G;
n+=u;
z=n*t;
n+=z;
n-=A
}i=n;
if(i==0){return A
}else{if(i<0){A-=w
}else{A+=w
}}w=w/2
}return A
};
KJE.PayoffCCCalc.prototype.getPayoffMonths=function(y,G,A,E,C,x){var H=256;
var w=128;
var i=0;
var n=y;
var t=C/12;
var u=0;
var z=0;
var D=0;
var v=0;
for(var F=1;
F<50;
F++){n=y;
t=C/12;
u=0;
z=0;
D=0;
v=0;
if(0==this.MONTHS_FROM_NOW_ONE){n+=this.DRAW_ONE
}if(0==this.MONTHS_FROM_NOW_TWO){n+=this.DRAW_TWO
}if(0==this.MONTHS_FROM_NOW_THREE){n+=this.DRAW_THREE
}if(0==this.MONTHS_FROM_NOW_FOUR){n+=this.DRAW_FOUR
}for(var B=1;
B<=H;
B++){if((B-1)%12==0&&B>1){t+=(x/12)
}if(B%12==0&&B>1){n+=E
}u=0;
if(B==this.MONTHS_FROM_NOW_ONE){u+=this.DRAW_ONE
}if(B==this.MONTHS_FROM_NOW_TWO){u+=this.DRAW_TWO
}if(B==this.MONTHS_FROM_NOW_THREE){u+=this.DRAW_THREE
}if(B==this.MONTHS_FROM_NOW_FOUR){u+=this.DRAW_FOUR
}u+=G;
n+=u;
z=n*t;
n+=z;
n-=A
}i=n;
if(i==0){return H
}else{if(i<0){H-=w
}else{H+=w
}}w=w/2
}if(H>360){H=360
}return H
};
KJE.CalcName="Credit Card Pay Off Calculator";
KJE.CalcType="payoffcc";
KJE.CalculatorTitleTemplate="KJE1 a month will pay off balance in KJE2 months.";
KJE.initialize=function(){KJE.CalcControl=new KJE.PayoffCCCalc();
KJE.GuiControl=new KJE.PayoffCC(KJE.CalcControl)
};
KJE.PayoffCC=function(l){var q=KJE;
var s=KJE.gLegend;
var o=KJE.inputs.items;
this.MSG_REMAINING=KJE.parameters.get("MSG_REMAINING","");
this.MSG_MONTHLY_PAYMENT=KJE.parameters.get("MSG_MONTHLY_PAYMENT","Monthly Payment");
this.MSG_NUMBER_OF_MONTHS=KJE.parameters.get("MSG_NUMBER_OF_MONTHS","Payment to pay off balance in ");
this.MSG_MONTHS=KJE.parameters.get("MSG_MONTHS",KJE.MSG_MONTHS_LBL);
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Current payment ");
this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","New payment ");
this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Balance after payment");
this.MSG_TITLE_TOTAL=KJE.parameters.get("MSG_TITLE_TOTAL","");
KJE.DollarSlider("CURRENT_BALANCE","Current balance",0,1000000);
KJE.PercentSlider("INTEREST_RATE","Interest rate (APR)",0,30,2);
KJE.NumberSlider("MONTHS_TO_PAYOFF_GOAL","Payoff goal (in months)",1,120,0);
KJE.DollarSlider("CURRENT_MONTHLY_PAYMENT","Current monthly payment",0,10000);
KJE.DollarSlider("MONTHLY_CHARGES","Additional monthly charges",0,10000);
KJE.DollarSlider("ANNUAL_FEE","Annual fee",0,200);
KJE.InputItem.AltHelpName="DRAW";
KJE.DollarSlider("DRAW_ONE","Major purchase 1",0,10000);
KJE.DollarSlider("DRAW_TWO","Major purchase 2",0,10000);
KJE.InputItem.AltHelpName="MONTHS_FROM_NOW";
KJE.NumberSlider("MONTHS_FROM_NOW_ONE","Months before purchase 1",0,36,0);
KJE.NumberSlider("MONTHS_FROM_NOW_TWO","Months before purchase 2",0,36,0);
KJE.InputItem.AltHelpName=null;
var m=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Credit Card Payoff by Month"));
m._legend._iOrientation=(s.TOP_RIGHT);
m._titleXAxis.setText(this.MSG_MONTHS);
var n=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Alternate Payoff Scenarios"));
n._legend.setVisible(false);
n._bPopDetail=true;
n._titleYAxis.setText(this.MSG_MONTHLY_PAYMENT);
n._showItemLabel=true;
n._showItemLabelOnTop=true;
n._axisX._fSpacingPercent=0.1;
var t=KJE.parameters.get("MSG_DROPPER_TITLE","Credit card information:");
KJE.addDropper(new KJE.Dropper("INPUTS",true,t,t),KJE.colorList[0]);
var k=KJE.parameters.get("MSG_DROPPER2_TITLE","Planned major purchases:");
var p=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE","KJE1");
var r=function(){return k+"|"+KJE.subText(KJE.getKJEReplaced(p,q.dollars(l.TOTAL_DRAWS)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS2",false,r,r),KJE.colorList[0])
};
KJE.PayoffCC.prototype.setValues=function(c){var d=KJE.inputs.items;
c.CURRENT_BALANCE=d.CURRENT_BALANCE.getValue();
c.MONTHLY_CHARGES=d.MONTHLY_CHARGES.getValue();
c.CURRENT_MONTHLY_PAYMENT=d.CURRENT_MONTHLY_PAYMENT.getValue();
c.ANNUAL_FEE=d.ANNUAL_FEE.getValue();
c.INTEREST_RATE=d.INTEREST_RATE.getValue();
c.MONTHS_TO_PAYOFF_GOAL=d.MONTHS_TO_PAYOFF_GOAL.getValue();
c.DRAW_ONE=d.DRAW_ONE.getValue();
c.MONTHS_FROM_NOW_ONE=d.MONTHS_FROM_NOW_ONE.getValue();
c.DRAW_TWO=d.DRAW_TWO.getValue();
c.MONTHS_FROM_NOW_TWO=d.MONTHS_FROM_NOW_TWO.getValue();
c.RATE_CHANGE_PER_YEAR=0;
c.DRAW_THREE=0;
c.MONTHS_FROM_NOW_THREE=0;
c.DRAW_FOUR=0;
c.MONTHS_FROM_NOW_FOUR=0;
c.RATE_CHANGE_PER_YEAR=0
};
KJE.PayoffCC.prototype.refresh=function(i){var j=KJE;
var k=KJE.gLegend;
var g=KJE.inputs.items;
var h=KJE.gGraphs[0];
var l=KJE.gGraphs[1];
KJE.setTitleTemplate(j.dollars(i.CALCULATED_MONTHLY_PAYMENT),j.number(i.MONTHS_TO_PAYOFF_GOAL));
l.removeAll();
l.setGraphCategories(i.CS_CHANGE_PAYOFF);
l.add(new KJE.gGraphDataSeries(i.DS_CHANGE_PAYOFF,this.MSG_NUMBER_OF_MONTHS,h.getColor(1)));
l.paint();
h.removeAll();
h.setGraphCategories(i.cats);
h.add(new KJE.gGraphDataSeries(i.DS_BALANCE,this.MSG_GRAPH1,h.getColor(1),j.dollars(i.CURRENT_MONTHLY_PAYMENT),this.MSG_GRAPH3));
h.add(new KJE.gGraphDataSeries(i.DS_BALANCE2,this.MSG_GRAPH2,h.getColor(2),j.dollars(i.CALCULATED_MONTHLY_PAYMENT),this.MSG_GRAPH3));
h.paint()
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-CURRENT_BALANCE'><input id='KJE-CURRENT_BALANCE' /></div> <div id='KJE-C-INTEREST_RATE'><input id='KJE-INTEREST_RATE' /></div> <div id='KJE-C-MONTHS_TO_PAYOFF_GOAL'><input id='KJE-MONTHS_TO_PAYOFF_GOAL' /></div> <div id='KJE-C-CURRENT_MONTHLY_PAYMENT'><input id='KJE-CURRENT_MONTHLY_PAYMENT' /></div> <div id='KJE-C-MONTHLY_CHARGES'><input id='KJE-MONTHLY_CHARGES' /></div> <div id='KJE-C-ANNUAL_FEE'><input id='KJE-ANNUAL_FEE' /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-DRAW_ONE'><input id='KJE-DRAW_ONE' /></div> <div id='KJE-C-MONTHS_FROM_NOW_ONE'><input id='KJE-MONTHS_FROM_NOW_ONE' /></div> <div id='KJE-C-DRAW_TWO'><input id='KJE-DRAW_TWO' /></div> <div id='KJE-C-MONTHS_FROM_NOW_TWO'><input id='KJE-MONTHS_FROM_NOW_TWO' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** **GRAPH2** ";
KJE.DefinitionText=" <div id='KJE-D-CURRENT_BALANCE' ><dt>Current balance</dt><dd>Current outstanding balance on your credit card.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate (APR)</dt><dd>The annual interest rate being charged for this credit card.</dd></div> <div id='KJE-D-MONTHS_TO_PAYOFF_GOAL' ><dt>Payoff goal (in months)</dt><dd>Your goal for paying off this credit card. This is the number of months by which you would like to have completely paid off this credit card balance.</dd></div> <div id='KJE-D-CURRENT_MONTHLY_PAYMENT' ><dt>Current monthly payment</dt><dd>The amount you are currently paying per month on this credit card. Please enter the amount you actually pay, not the minimum payment. This amount is used to calculate how long it will take you to pay off your balance.</dd></div> <div id='KJE-D-MONTHLY_CHARGES' ><dt>Additional monthly charges</dt><dd>Total new charges you expect to put on this credit card per month.</dd></div> <div id='KJE-D-ANNUAL_FEE' ><dt>Annual fee</dt><dd>Your annual fee for this credit card, if any.</dd></div> <div id='KJE-D-DRAW' ><dt>Major purchase</dt><dd>If you expect a major purchase beyond your normal charges, enter the amount to be spent here.</dd></div> <div id='KJE-D-MONTHS_FROM_NOW' ><dt>Months before purchase</dt><dd>Number of months before your major purchase will occur.</dd></div> ";
KJE.ReportText=' <h2 class=\'KJEReportHeader KJEFontHeading\'>CALCULATED_MONTHLY_PAYMENT per month could pay off your credit card in MONTHS_TO_PAYOFF_GOAL months.</h2> To pay off your credit card balance of CURRENT_BALANCE in MONTHS_TO_PAYOFF_GOAL months you need to pay CALCULATED_MONTHLY_PAYMENT per month based on the information you entered. This includes your additional monthly purchases of MONTHLY_CHARGES and your major purchases. This assumes no additional charges such as late fees. If you keep your monthly payment at CURRENT_MONTHLY_PAYMENT it will take CURRENT_MONTHLY_MSG to pay off this credit card. **GRAPH** **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Current balance </th><td class="KJECell KJECell40">CURRENT_BALANCE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Planned additional monthly charges </th><td class="KJECell " >MONTHLY_CHARGES </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Major purchase 1 </th><td class="KJECell ">DRAW_ONE in MONTHS_FROM_NOW_ONE month(s)</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Major purchase 2 </th><td class="KJECell ">DRAW_TWO in MONTHS_FROM_NOW_TWO month(s)</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual fee </th><td class="KJECell ">ANNUAL_FEE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate </th><td class="KJECell ">INTEREST_RATE </td></tr> </tbody> <!-- <tr class=KJEOddRow><th class="KJELabel " COLSPAN=2 scope="colgroup">Payment required to meet goal of MONTHS_TO_PAYOFF_GOAL months is CALCULATED_MONTHLY_PAYMENT.</th></tr> <tr class=KJEEvenRow><th class="KJELabel " COLSPAN=2 scope="colgroup">Keeping your monthly payment at CURRENT_MONTHLY_PAYMENT will take CURRENT_MONTHLY_MSG.</th></tr>--> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment schedule with your current payment of CURRENT_MONTHLY_PAYMENT</h2> **REPEATING GROUP** ';
KJE.parameters.set("ANNUAL_FEE",35);
KJE.parameters.set("CURRENT_BALANCE",2000);
KJE.parameters.set("CURRENT_MONTHLY_PAYMENT",125);
KJE.parameters.set("DRAW_ONE",0);
KJE.parameters.set("DRAW_TWO",0);
KJE.parameters.set("INTEREST_RATE",17.5);
KJE.parameters.set("MONTHLY_CHARGES",100);
KJE.parameters.set("MONTHS_FROM_NOW_ONE",0);
KJE.parameters.set("MONTHS_FROM_NOW_TWO",0);
KJE.parameters.set("MONTHS_TO_PAYOFF_GOAL",24);