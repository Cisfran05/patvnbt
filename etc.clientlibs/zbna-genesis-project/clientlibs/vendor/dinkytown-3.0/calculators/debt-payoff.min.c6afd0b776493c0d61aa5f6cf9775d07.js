KJE.DebtPayoffCalc=function(){this.CC_MIN=KJE.parameters.get("KJE_CC_MIN_PAYMENTAMOUNT",15);
var d=this._iCCCount=5;
this.INTEREST_CURRENT=0;
this.CURRENT_PAYOFF="";
this.CURRENT_PAYOFF_MONTHS=0;
this.PAYOFF="";
this.FIRST_YEARS_INTEREST=0;
this.CC_NAME=new Array(d);
for(var c=0;
c<d;
c++){this.CC_NAME[c]=" "+KJE.parameters.get("CC_NAME_"+(c+1),KJE.parameters.get("MSG_CREDIT_CARD","Credit card")+" #"+(c+1))
}this.CC_BALANCE=KJE.FloatArray(d);
this.CC_RATE=KJE.FloatArray(d);
this.CC_PAYMENT_MINIMUM=KJE.FloatArray(d);
this.CC_PAYMENT=KJE.FloatArray(d);
this.CC_OWED=KJE.FloatArray(d);
this.CC_TOTAL_PAYMENTS=KJE.FloatArray(d);
this.CC_PAYOFF=new Array(d);
this.CC_PAYOFF_LONG=new Array(d);
this.ccBal=KJE.FloatArray(d);
this.MSG_PAYOFF_30=KJE.parameters.get("MSG_PAYOFF_30","more than 30 years");
this.sSchedule=new KJE.Repeating()
};
KJE.DebtPayoffCalc.prototype.clear=function(){};
KJE.DebtPayoffCalc.prototype.calculate=function(G){var S=KJE;
var u=0;
var p=0;
var O=0;
var q=0;
for(var L=0;
L<this._iCCCount;
L++){this.CC_PAYMENT[L]=this.CCPayment(this.CC_BALANCE[L],this.CC_PAYMENT_MINIMUM[L]/100);
q=S.round(this.CC_BALANCE[L]*(this.CC_RATE[L]/1200),2);
if(this.CC_PAYMENT[L]>(this.CC_BALANCE[L]+q)){this.CC_PAYMENT[L]=(this.CC_BALANCE[L]+q)
}}for(var x=0;
x<this._iCCCount;
x++){this.CC_OWED[x]=0;
this.CC_PAYOFF[x]="";
this.CC_PAYOFF_LONG[x]="";
this.CC_TOTAL_PAYMENTS[x]=0;
if(this.CC_BALANCE[x]>0){u+=this.CC_PAYMENT[x]
}O+=this.CC_BALANCE[x];
p+=this.CC_BALANCE[x]*this.CC_RATE[x]
}if(p>0&&O>0){p=(p/100)/O
}else{p=0
}var V=1;
this.DS_PAYMENTS=KJE.FloatArray(V);
this.DS_PAYMENTS_BLD=KJE.FloatArray(V);
this.DS_INTEREST=KJE.FloatArray(V);
this.DS_INTEREST_BLD=KJE.FloatArray(V);
this.DS_MONTHS=KJE.FloatArray(V);
this.DS_MONTHS_BLD=KJE.FloatArray(V);
var K=Math.round(362);
var n=0;
var i=0;
this.DR_BALANCE=KJE.FloatArray(K);
this.DR_PRINCIPAL=KJE.FloatArray(K);
this.DR_INTEREST=KJE.FloatArray(K);
this.INTEREST_CURRENT=0;
var I=O;
var q=0;
var T=0;
var y=0;
var M=KJE.FloatArray(this.CC_PAYOFF.length);
var x=0;
var U=this.ccBal;
for(x=0;
(x<362);
x++){for(var L=0;
L<this._iCCCount;
L++){if(this.CC_PAYMENT[L]>0){if(x==0){U[L]=this.CC_BALANCE[L]
}q=S.round(U[L]*(this.CC_RATE[L]/1200),2);
T=this.CCPayment(U[L],this.CC_PAYMENT_MINIMUM[L]/100);
y=((T-q)>U[L]?U[L]:T-q);
this.CC_OWED[L]+=q;
U[L]-=y;
if(U[L]<=0&&this.CC_PAYOFF[L]==("")){this.CC_PAYOFF[L]=x+" "+KJE.MSG_MONTHS_LBL;
this.CC_PAYOFF_LONG[L]=KJE.getTermLabel(x,false);
M[L]=x
}if(x<K){this.DR_BALANCE[x]+=U[L];
this.DR_INTEREST[x]+=q;
this.DR_PRINCIPAL[x]+=y
}I+=U[L]
}}if(I<=0&&n==0){n=x+1
}}this.INTEREST_CURRENT=0;
for(var x=0;
x<this._iCCCount;
x++){this.INTEREST_CURRENT+=this.CC_OWED[x]
}for(var P=0;
P<M.length;
P++){if(M[P]==0&&this.CC_BALANCE[P]>0){n=0;
break
}else{if(n<M[P]){n=M[P]
}}}if(n==0&&O>0){n=362;
this.CURRENT_PAYOFF=this.MSG_PAYOFF_30;
this.PAYOFF="30 + "+this.MSG_YEARS_LBL
}else{this.CURRENT_PAYOFF=KJE.getTermLabel(n);
this.PAYOFF=n+" "+this.MSG_MONTHS
}this.CURRENT_PAYOFF_MONTHS=n;
this.DS_PAYMENTS[0]=(u);
this.DS_PAYMENTS_BLD[0]=S.dollars(u,2);
this.DS_INTEREST[0]=(this.INTEREST_CURRENT);
this.DS_INTEREST_BLD[0]=S.dollars(this.INTEREST_CURRENT,2);
this.DS_MONTHS[0]=n;
this.DS_MONTHS_BLD[0]=S.number(n)+" "+this.MSG_PAYOFF_MONTH+this.MSG_PAYOFF_PLURAL;
if(n==362){this.DS_MONTHS_BLD[0]=" > "+this.DS_MONTHS_BLD[0]
}if(G){var R=this.sSchedule;
R.clearRepeat();
R.addHeader("&nbsp;",R.sReportCol("Payment",4),R.sReportCol("Interest",1),R.sReportCol("Principal",2),R.sReportCol("Balance",3));
R.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",S.dollars(O,2))
}var Q=0;
K=(n);
var H=12;
if(K>=120){H=12
}this.FIRST_YEARS_INTEREST=0;
for(var J=0;
J<12&&J<this.DR_INTEREST.length;
J++){this.FIRST_YEARS_INTEREST+=this.DR_INTEREST[J]
}var N=Math.floor(n/H)+1;
this.cats=KJE.FloatArray(N);
this.DS_BALANCE=KJE.FloatArray(N);
this.cats[Q]="0";
this.DS_BALANCE[Q]=(O);
for(x=1;
x<=this.DS_BALANCE.length-1;
x++){this.cats[x]=""
}Q=1;
for(x=1;
x<=(N-1)*H;
x++){i=x-1;
if(x%H==0){this.cats[Q]=""+(K<120?Q*H:Q);
this.DS_BALANCE[Q]=(((this.DR_BALANCE.length>i?this.DR_BALANCE[i]:0)));
Q++
}if(G){if(x<=120){R.addRepeat(x,S.dollars(this.DR_INTEREST[i]+this.DR_PRINCIPAL[i],2),S.dollars(this.DR_INTEREST[i],2),S.dollars(this.DR_PRINCIPAL[i],2),S.dollars(this.DR_BALANCE[i],2))
}}}for(var F=0;
F<this.CC_PAYOFF.length;
F++){if(this.CC_PAYOFF[F]==("")&&this.CC_BALANCE[F]>0){this.CC_PAYOFF[F]="30 + "+KJE.MSG_YEARS_LBL;
this.CC_PAYOFF_LONG[F]=this.MSG_PAYOFF_30
}this.CC_TOTAL_PAYMENTS[F]=this.CC_OWED[F]+this.CC_BALANCE[F]
}this.CC_MONTHLY_PAYMENT=u;
this.CC_AVERAGE_RATE=p;
this.CC_OUTSTANDING_BALANCE=O;
this.TOTAL_PAYMENTS=this.INTEREST_CURRENT+this.CC_OUTSTANDING_BALANCE
};
KJE.DebtPayoffCalc.prototype.formatReport=function(g){g.dollars("CC_OUTSTANDING_BALANCE",this.CC_OUTSTANDING_BALANCE);
g.dollars("CC_MONTHLY_PAYMENT",this.CC_MONTHLY_PAYMENT);
g.percent("CC_AVERAGE_RATE",this.CC_AVERAGE_RATE,2);
g.replace("CURRENT_PAYOFF",this.CURRENT_PAYOFF);
g.dollars("INTEREST_CURRENT",this.INTEREST_CURRENT);
g.dollars("CURRENT_BALANCE",this.TOTAL_PAYMENTS);
g.replace("MSG_TITLE",(this.MSG_TITLE));
g.dollars("FIRST_YEARS_INTEREST",this.FIRST_YEARS_INTEREST);
var h="<tr class=KJEEvenRow><th class='KJELabel KJECellBorder '>CC_NAME</th><td class='KJECell KJECellBorder'>CC_BALANCE</td><td class='KJECell KJECellBorder'>CC_RATE</td><td class='KJECell KJECellBorder'>CC_PAYMENT</td><td class='KJECell KJECellBorder'>CC_OWED</td><td class='KJECell KJECellBorder'>CC_TOTAL_PAYMENTS</td><td class='KJECell'>CC_PAYOFF</td></tr>";
var l="";
var j=0;
for(var i=0;
i<this.CC_BALANCE.length;
i++){if(this.CC_BALANCE[i]>0){var k=KJE.replace("CC_BALANCE",KJE.dollars(this.CC_BALANCE[i]),h);
k=KJE.replace("CC_RATE",KJE.percent(this.CC_RATE[i]/100,2),k);
k=KJE.replace("CC_PAYMENT_MINIMUM",KJE.dollars(this.CC_PAYMENT_MINIMUM[i]),k);
k=KJE.replace("CC_PAYMENT",KJE.dollars(this.CC_PAYMENT[i]),k);
k=KJE.replace("CC_OWED",KJE.dollars(this.CC_OWED[i]),k);
k=KJE.replace("CC_PAYOFF",this.CC_PAYOFF[i],k);
k=KJE.replace("CC_NAME",this.CC_NAME[i],k);
k=KJE.replace("CC_TOTAL_PAYMENTS",KJE.dollars(this.CC_TOTAL_PAYMENTS[i]),k);
j++;
if(j%2==1){k=KJE.replace("KJEEvenRow","KJEOddRow",k)
}l+=k
}}l="<tbody class='KJEReportTBody'>"+l+"</tbody>";
g.dollars("TOTAL_PAYMENTS",this.TOTAL_PAYMENTS);
g.replace("<!--PAYOFF_ITEMS-->",l);
g.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.DebtPayoffCalc.prototype.CCPayment=function(f,d){var e=KJE.round(d*f,2);
e=(e<this.CC_MIN?this.CC_MIN:e);
return(f<=0?0:e)
};
KJE.CalcName="Credit Card Minimum Payment Calculator";
KJE.CalcType="DebtPayoff2";
KJE.CalculatorTitleTemplate="Total amount paid including interest by making minimum payments: KJE1";
KJE.initialize=function(){KJE.CalcControl=new KJE.DebtPayoffCalc();
KJE.GuiControl=new KJE.DebtPayoff(KJE.CalcControl)
};
KJE.DebtPayoff=function(l){var v=KJE;
var y=KJE.gLegend;
var u=KJE.inputs.items;
for(var w=0;
w<l._iCCCount;
w++){KJE.InputItem.AltHelpName="CC_BALANCE";
KJE.DollarSlider("CC_BALANCE"+(w+1),KJE.parameters.get("MSG_CC_BALANCE","Credit card balance"),0,1000000,2,0,2);
KJE.InputItem.AltHelpName="CC_RATE";
KJE.PercentSlider("CC_RATE"+(w+1),KJE.parameters.get("MSG_CC_RATE","Credit card rate"),0,KJE.Default.RateCardMax,2,1);
KJE.InputItem.AltHelpName="CC_PAYMENT_MINIMUM";
KJE.InvestRateSlider("CC_PAYMENT_MINIMUM"+(w+1),KJE.parameters.get("MSG_CC_PAYMENT_MINIMUM","Minimum payment"));
KJE.InputItem.AltHelpName="CC_PAYMENT";
KJE.Label("CC_PAYMENT"+(w+1),KJE.parameters.get("MSG_CC_PAYMENT","Monthly payment"));
KJE.InputItem.AltHelpName="CC_PAYOFF";
KJE.Label("CC_PAYOFF"+(w+1),KJE.parameters.get("MSG_CC_PAYOFF","Balance payoff"));
KJE.InputItem.AltHelpName="CC_TOTAL_PAYMENTS";
KJE.Label("CC_TOTAL_PAYMENTS"+(w+1),KJE.parameters.get("MSG_CC_TOTAL_PAYMENTS","Total payments"))
}KJE.InputItem.AltHelpName=null;
var t=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Debt payoff is estimated at KJE1"));
t._iArea=KJE.gGraphLine.AREA_FIRST_ONLY;
t._legend.setVisible(false);
var z=KJE.parameters.get("MSG_DROPPER_TITLE","Credit Card");
var x=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Monthly Payment: KJE1");
var n=function(){return z+" #1 |"+KJE.subText(KJE.getKJEReplaced(x,v.dollars(l.CC_PAYMENT[0])),"KJERightBold")
};
var p=function(){return z+" #2 |"+KJE.subText(KJE.getKJEReplaced(x,v.dollars(l.CC_PAYMENT[1])),"KJERightBold")
};
var q=function(){return z+" #3 |"+KJE.subText(KJE.getKJEReplaced(x,v.dollars(l.CC_PAYMENT[2])),"KJERightBold")
};
var r=function(){return z+" #4 |"+KJE.subText(KJE.getKJEReplaced(x,v.dollars(l.CC_PAYMENT[3])),"KJERightBold")
};
var s=function(){return z+" #5 |"+KJE.subText(KJE.getKJEReplaced(x,v.dollars(l.CC_PAYMENT[4])),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS1",true,n,n),KJE.colorList[0]);
KJE.addDropper(new KJE.Dropper("INPUTS2",false,p,p),KJE.colorList[0]);
KJE.addDropper(new KJE.Dropper("INPUTS3",false,q,q),KJE.colorList[0]);
KJE.addDropper(new KJE.Dropper("INPUTS4",false,r,r),KJE.colorList[0]);
KJE.addDropper(new KJE.Dropper("INPUTS5",false,s,s),KJE.colorList[0])
};
KJE.DebtPayoff.prototype.setValues=function(d){var e=KJE.inputs.items;
for(var f=0;
f<d._iCCCount;
f++){d.CC_BALANCE[f]=e["CC_BALANCE"+(f+1)].getValue();
d.CC_RATE[f]=e["CC_RATE"+(f+1)].getValue();
d.CC_PAYMENT_MINIMUM[f]=e["CC_PAYMENT_MINIMUM"+(f+1)].getValue()
}};
KJE.DebtPayoff.prototype.refresh=function(j){var k=KJE;
var l=KJE.gLegend;
var g=KJE.inputs.items;
var h=KJE.gGraphs[0];
KJE.setTitleTemplate(k.dollars(j.TOTAL_PAYMENTS),k.dollars(j.INTEREST_CURRENT));
h.removeAll();
if(j.CURRENT_PAYOFF_MONTHS<120){h._titleXAxis.setText(KJE.MSG_MONTH_LBL)
}else{h._titleXAxis.setText(KJE.MSG_YEAR_LBL)
}h.setGraphCategories(j.cats);
h.setTitleTemplate(j.CURRENT_PAYOFF);
h.add(new KJE.gGraphDataSeries(j.DS_BALANCE,"Balance",h.getColor(1)));
h.paint();
for(var i=0;
i<j._iCCCount;
i++){g["CC_PAYMENT"+(i+1)].setText(j.CC_PAYMENT[i]>0?k.dollars(j.CC_PAYMENT[i],2):"");
g["CC_PAYOFF"+(i+1)].setText(j.CC_PAYOFF[i]);
g["CC_TOTAL_PAYMENTS"+(i+1)].setText(j.CC_TOTAL_PAYMENTS[i]>0?k.dollars(j.CC_TOTAL_PAYMENTS[i],2):"")
}};
KJE.InputScreenText=" <div id=KJE-D-INPUTS1><div id=KJE-P-INPUTS1>Input information:</div></div> <div id=KJE-E-INPUTS1 > <div id='KJE-C-CC_BALANCE1'><input id='KJE-CC_BALANCE1' /></div> <div id='KJE-C-CC_RATE1'><input id='KJE-CC_RATE1' /></div> <div id='KJE-C-CC_PAYMENT_MINIMUM1'><input id='KJE-CC_PAYMENT_MINIMUM1' /></div> <div id='KJE-C-CC_PAYMENT1'><div id='KJE-CC_PAYMENT1'></div></div> <div id='KJE-C-CC_PAYOFF1'><div id='KJE-CC_PAYOFF1'></div></div> <div id='KJE-C-CC_TOTAL_PAYMENTS1'><div id='KJE-CC_TOTAL_PAYMENTS1'></div></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-CC_BALANCE2'><input id='KJE-CC_BALANCE2' /></div> <div id='KJE-C-CC_RATE2'><input id='KJE-CC_RATE2' /></div> <div id='KJE-C-CC_PAYMENT_MINIMUM2'><input id='KJE-CC_PAYMENT_MINIMUM2' /></div> <div id='KJE-C-CC_PAYMENT2'><div id='KJE-CC_PAYMENT2'></div></div> <div id='KJE-C-CC_PAYOFF2'><div id='KJE-CC_PAYOFF2'></div></div> <div id='KJE-C-CC_TOTAL_PAYMENTS2'><div id='KJE-CC_TOTAL_PAYMENTS2'></div></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS3><div id=KJE-P-INPUTS3>Input information:</div></div> <div id=KJE-E-INPUTS3 > <div id='KJE-C-CC_BALANCE3'><input id='KJE-CC_BALANCE3' /></div> <div id='KJE-C-CC_RATE3'><input id='KJE-CC_RATE3' /></div> <div id='KJE-C-CC_PAYMENT_MINIMUM3'><input id='KJE-CC_PAYMENT_MINIMUM3' /></div> <div id='KJE-C-CC_PAYMENT3'><div id='KJE-CC_PAYMENT3'></div></div> <div id='KJE-C-CC_PAYOFF3'><div id='KJE-CC_PAYOFF3'></div></div> <div id='KJE-C-CC_TOTAL_PAYMENTS3'><div id='KJE-CC_TOTAL_PAYMENTS3'></div></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS4><div id=KJE-P-INPUTS4>Input information:</div></div> <div id=KJE-E-INPUTS4 > <div id='KJE-C-CC_BALANCE4'><input id='KJE-CC_BALANCE4' /></div> <div id='KJE-C-CC_RATE4'><input id='KJE-CC_RATE4' /></div> <div id='KJE-C-CC_PAYMENT_MINIMUM4'><input id='KJE-CC_PAYMENT_MINIMUM4' /></div> <div id='KJE-C-CC_PAYMENT4'><div id='KJE-CC_PAYMENT4'></div></div> <div id='KJE-C-CC_PAYOFF4'><div id='KJE-CC_PAYOFF4'></div></div> <div id='KJE-C-CC_TOTAL_PAYMENTS4'><div id='KJE-CC_TOTAL_PAYMENTS4'></div></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS5><div id=KJE-P-INPUTS5>Input information:</div></div> <div id=KJE-E-INPUTS5 > <div id='KJE-C-CC_BALANCE5'><input id='KJE-CC_BALANCE5' /></div> <div id='KJE-C-CC_RATE5'><input id='KJE-CC_RATE5' /></div> <div id='KJE-C-CC_PAYMENT_MINIMUM5'><input id='KJE-CC_PAYMENT_MINIMUM5' /></div> <div id='KJE-C-CC_PAYMENT5'><div id='KJE-CC_PAYMENT5'></div></div> <div id='KJE-C-CC_PAYOFF5'><div id='KJE-CC_PAYOFF5'></div></div> <div id='KJE-C-CC_TOTAL_PAYMENTS5'><div id='KJE-CC_TOTAL_PAYMENTS5'></div></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-CC_BALANCE' ><dt>Credit card balance</dt><dd>Your current balance on your credit card.</dd></div> <div id='KJE-D-CC_RATE' ><dt>Credit card rate</dt><dd>Interest rate for your credit card. The length of time to pay off this credit card may be much greater than calculated if you enter a low promotional interest rate that is only good for a short period of time.</dd></div> <div id='KJE-D-CC_PAYMENT_MINIMUM' ><dt>Minimum payment</dt><dd>This is the percent of your outstanding balance that will be used to calculate your minimum payment for the month. Your monthly payment is calculated as the percent of your current outstanding balance you entered, but will never be less than 15. Your monthly payment will decrease as your balance is paid down. This can greatly increase the length of time it takes to pay off your credit cards.</dd></div> <div id='KJE-D-CC_PAYMENT' ><dt>Monthly payment</dt><dd>This is your initial monthly payment. For credit cards, this is calculated as your minimum payment. Your monthly payment is calculated as the percent of your current outstanding balance you entered. Your monthly payment will decrease as your balance is paid down. This can greatly increase the length of time it takes to pay off your credit cards.</dd></div> <div id='KJE-D-CC_PAYOFF' ><dt>Balance payoff</dt><dd>This is the total length of time required to pay off this credit card debit if you use only minimum payments. Your monthly payment is calculated as the percent of your current outstanding balance you entered. Your monthly payment will decrease as your balance is paid down. This can greatly increase the length of time it takes to pay off your credit cards.</dd></div> <div id='KJE-D-CC_TOTAL_PAYMENTS' ><dt>Total payments</dt><dd>This is the total you will pay to pay of this credit card debt if you use only minimum payments. Your monthly payment is calculated as the percent of your current outstanding balance you entered. Your monthly payment will decrease as your balance is paid down. This can greatly increase the length of time it takes to pay off your credit cards.</dd></div> ";
KJE.ReportText=' <!--HEADING "Credit Card Minimum Payments" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Minimum payments will take CURRENT_PAYOFF to payoff your debt.</h2>You owe a total of CC_OUTSTANDING_BALANCE having a total monthly payment of CC_MONTHLY_PAYMENT. If you continue to make the minimum payments it will take you CURRENT_PAYOFF to payoff this debt. The total interest paid will be INTEREST_CURRENT. **GRAPH** <div class=KJEReportTableDiv><table class=\'KJEReportTable KJEReportTableShrink\'><caption class=\'KJEHeaderRow KJEHeading\'>Debt Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><td class="KJEHeading KJECell40">&nbsp;</td><th class="KJEHeading KJECell10" scope=\'col\'>Balance</th><th class="KJEHeading KJECell10" scope=\'col\'>Interest Rate</th><th class="KJEHeading KJECell10" scope=\'col\'>Monthly Payment</th><th class="KJEHeading KJECell10" scope=\'col\'>Interest Paid</th><th class="KJEHeading KJECell10" scope=\'col\'>Total Payments</th><th class="KJEHeading KJECell10" scope=\'col\'>Time to Payoff</th></tr> </thead> <!--PAYOFF_ITEMS--> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Totals</th><td class="KJECellStrong KJECellBorder">CC_OUTSTANDING_BALANCE</td><td class="KJECellStrong KJECellBorder">CC_AVERAGE_RATE</td><td class="KJECellStrong KJECellBorder">CC_MONTHLY_PAYMENT</td><td class="KJECellStrong KJECellBorder">INTEREST_CURRENT</td><td class="KJECellStrong KJECellBorder">CURRENT_BALANCE</td><td class="KJECellStrong">CURRENT_PAYOFF</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Credit Card Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("CC_BALANCE1",5000);
KJE.parameters.set("CC_BALANCE2",0);
KJE.parameters.set("CC_BALANCE3",0);
KJE.parameters.set("CC_BALANCE4",0);
KJE.parameters.set("CC_BALANCE5",0);
KJE.parameters.set("CC_PAYMENT1",178.75);
KJE.parameters.set("CC_PAYMENT2",0);
KJE.parameters.set("CC_PAYMENT3",0);
KJE.parameters.set("CC_PAYMENT4",0);
KJE.parameters.set("CC_PAYMENT_MINIMUM1",4);
KJE.parameters.set("CC_PAYMENT_MINIMUM2",4);
KJE.parameters.set("CC_PAYMENT_MINIMUM3",4);
KJE.parameters.set("CC_PAYMENT_MINIMUM4",4);
KJE.parameters.set("CC_PAYMENT_MINIMUM5",4);
KJE.parameters.set("CC_RATE1",18.9);
KJE.parameters.set("CC_RATE2",0);
KJE.parameters.set("CC_RATE3",0);
KJE.parameters.set("CC_RATE4",0);
KJE.parameters.set("CC_RATE5",0);