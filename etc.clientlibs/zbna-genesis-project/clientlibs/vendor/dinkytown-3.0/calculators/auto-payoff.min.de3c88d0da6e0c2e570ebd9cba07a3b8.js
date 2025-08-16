KJE.AutoPayoffCalc=function(){this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Months remaining must be less original term.");
this.BY_YEAR=true;
this.AUTOLOAN_MONTHS_LEFT=0;
this.AUTOLOAN_MONTHS_ELAPSED=0;
this.aInterestPaid=null;
this.aNewInterestPaid=null;
this.aPrincipalBalance=null;
this.aNewPrincipalBalance=null;
this.sSchedule=new KJE.Repeating()
};
KJE.AutoPayoffCalc.prototype.clear=function(){this.AUTOLOAN_MONTHS_LEFT=0;
this.AUTOLOAN_MONTHS_LENGTH=0;
this.AUTOLOAN_AMT=0;
this.INCREASE_BY_AMT=0;
this.RATE=0
};
KJE.AutoPayoffCalc.prototype.calculate=function(J){var R=KJE;
var S=this.AUTOLOAN_MONTHS_LEFT;
var Z=this.AUTOLOAN_MONTHS_LENGTH;
var ad=this.AUTOLOAN_AMT;
var P=this.INCREASE_BY_AMT;
var U=this.RATE;
if(S>Z){throw (this.MSG_ERROR1)
}var L=U/(1200);
var F=R.round(KJE.PMT(L,Z,ad),2);
this.AUTOLOAN_MONTHS_LEFT=S;
this.AUTOLOAN_MONTHS_ELAPSED=Z-S;
var ab=0;
var n=ad;
var H=0;
var X=ad;
var Y=0;
var V=0;
var N=0;
var ac=0;
this.aInterestPaid=KJE.FloatArray(Z);
this.aNewInterestPaid=KJE.FloatArray(Z);
this.aPrincipalBalance=KJE.FloatArray(Z);
this.aNewPrincipalBalance=KJE.FloatArray(Z);
this.aPrincipalBalance[0]=ad;
this.aNewPrincipalBalance[0]=ad;
this.sCats=new Array(Z);
for(var p=1;
p<=Z;
p++){this.sCats[p-1]=R.number(p)
}if(J){var O=this.sSchedule;
O.clearRepeat();
O.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:O.sReportCol("Existing Payment Schedule",1),sFormat:"COLSPAN=3"},{sCell:KJE._sHeadingUnderline,sContent:O.sReportCol("Accelerated Payment Schedule",1),sFormat:"COLSPAN=3"});
if(this.BY_YEAR){O.addHeader(O.sReportCol("Year",7),O.sReportCol("Total<br />Payments",8),O.sReportCol("Total<br />Interest",9),O.sReportCol("Ending<br />Balance",10),O.sReportCol("Total<br />Payments",8),O.sReportCol("Total<br />Interest",9),O.sReportCol("Ending<br />Balance",10))
}else{O.addHeader("&nbsp;",O.sReportCol("Payment",4),O.sReportCol("Interest",5),O.sReportCol("Balance",6),O.sReportCol("Payment",4),O.sReportCol("Interest",5),O.sReportCol("Balance",6))
}O.addRepeat("&nbsp;","&nbsp;","&nbsp;",R.dollars(n,2),"&nbsp;","&nbsp;",R.dollars(X,2))
}var I=0;
var Q=0;
var i=0;
var aa=0;
var M=0;
var W=0;
var T=0;
for(var G=1;
G<=Z;
G++){Y=R.round(L*n,2);
V=R.round(L*X,2);
if(n==0){N=0
}else{N=F-Y;
if(G>this.AUTOLOAN_MONTHS_ELAPSED){ac=F+P-V
}else{ac=F-V
}if(n>0){n-=N
}}if(X==0){ac=0
}else{if(X>0){X-=ac;
T=G
}if(n<0){N=N+n;
n=0
}if(X<0){ac=ac+X;
X=0
}}ab+=Y;
H+=V;
I+=Y+N;
Q+=Y;
i=n;
aa+=V+ac;
M+=V;
W=X;
this.aInterestPaid[G]=ab;
this.aNewInterestPaid[G]=H;
this.aPrincipalBalance[G]=n;
this.aNewPrincipalBalance[G]=X;
if((G%12==0)){var K=Math.floor((G-1)/12);
if(J&&this.BY_YEAR){O.addRepeat(R.number(K+1),R.dollars(I,2),R.dollars(Q,2),R.dollars(i,2),R.dollars(aa,2),R.dollars(M,2),R.dollars(W,2))
}I=0;
Q=0;
i=0;
aa=0;
M=0;
W=0
}if(J&&!this.BY_YEAR){O.addRepeat(G,R.dollars(Y+N,2),R.dollars(Y,2),R.dollars(n,2),R.dollars(V+ac,2),R.dollars(V,2),R.dollars(X,2))
}}this.AUTOLOAN_INTEREST_TOTAL=ab;
this.AUTOLOAN_PAYMENT_TOTAL=ab+ad;
this.EARLY_PAYOFF_MONTHS=Z-T;
this.EARLY_PAYOFF_PI_PAYMENT=F+P;
this.EARLY_PAYOFF_INTEREST_TOTAL=H;
this.EARLY_PAYOFF_PAYMENT_TOTAL=H+ad;
this.EARLY_PAYOFF_SAVINGS=this.AUTOLOAN_PAYMENT_TOTAL-this.EARLY_PAYOFF_PAYMENT_TOTAL;
this.MONTHLY_RATE=L;
this.PI_PAYMENT=F;
this.MSG_EARLY_PAYOFF_MONTHS=KJE.getTermLabel(this.EARLY_PAYOFF_MONTHS)
};
KJE.AutoPayoffCalc.prototype.formatReport=function(b){b.number("AUTOLOAN_MONTHS_LEFT",this.AUTOLOAN_MONTHS_LEFT);
b.number("AUTOLOAN_MONTHS_LENGTH",this.AUTOLOAN_MONTHS_LENGTH);
b.dollars("AUTOLOAN_AMT",this.AUTOLOAN_AMT);
b.dollars("INCREASE_BY_AMT",this.INCREASE_BY_AMT);
b.percent("RATE",this.RATE/100,3);
b.percent("MONTHLY_RATE",this.MONTHLY_RATE,3);
b.number("AUTOLOAN_MONTHS_ELAPSED",this.AUTOLOAN_MONTHS_ELAPSED);
b.dollars("AUTOLOAN_INTEREST_TOTAL",this.AUTOLOAN_INTEREST_TOTAL);
b.dollars("AUTOLOAN_PAYMENT_TOTAL",this.AUTOLOAN_PAYMENT_TOTAL);
b.replace("MSG_EARLY_PAYOFF_MONTHS",this.MSG_EARLY_PAYOFF_MONTHS);
b.number("EARLY_PAYOFF_MONTHS",this.EARLY_PAYOFF_MONTHS);
b.dollars("EARLY_PAYOFF_PI_PAYMENT",this.EARLY_PAYOFF_PI_PAYMENT);
b.dollars("EARLY_PAYOFF_INTEREST_TOTAL",this.EARLY_PAYOFF_INTEREST_TOTAL);
b.dollars("EARLY_PAYOFF_PAYMENT_TOTAL",this.EARLY_PAYOFF_PAYMENT_TOTAL);
b.dollars("EARLY_PAYOFF_SAVINGS",this.EARLY_PAYOFF_SAVINGS);
b.dollars("PI_PAYMENT",this.PI_PAYMENT);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.CalcName="Auto Loan Early Payoff Calculator";
KJE.CalcType="autopayoff";
KJE.CalculatorTitleTemplate="Auto Loan repayment shortened by KJE1";
KJE.initialize=function(){KJE.CalcControl=new KJE.AutoPayoffCalc();
KJE.GuiControl=new KJE.AutoPayoff(KJE.CalcControl)
};
KJE.AutoPayoff=function(k){var l=KJE;
var n=KJE.gLegend;
var p=KJE.inputs.items;
this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Interest with prepayments");
this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Scheduled interest paid");
this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Balance with prepayments");
this.MSG_GRAPH4=KJE.parameters.get("MSG_GRAPH4","Scheduled principal balance");
KJE.MortgageRateSlider("RATE","Annual interest rate");
KJE.LoanAmtSlider("AUTOLOAN_AMT","Auto loan amount");
KJE.DollarSlider("INCREASE_BY_AMT","Additional monthly payment",0,10000);
KJE.NumberSlider("AUTOLOAN_MONTHS_LENGTH","Loan term (months)",1,360,0);
KJE.NumberSlider("AUTOLOAN_MONTHS_LEFT","Number of months remaining",1,360,0);
KJE.Label("PI_PAYMENT","Current payment");
KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","Monthly");
var j=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Auto Loan Balances and Interest"));
j._legend._iOrientation=(n.TOP_RIGHT);
j._titleXAxis.setText(KJE.parameters.get("MSG_LABEL9","Month of Loan"));
j._titleYAxis.setText(KJE.parameters.get("MSG_LABEL11","Dollars"));
var i=KJE.parameters.get("MSG_DROPPER","Auto Loan Payoff Inputs:");
var m=KJE.parameters.get("MSG_DROPPER_DOWN","Total savings KJE1");
var o=function(){return i+"|"+KJE.subText(KJE.getKJEReplaced(m,l.dollars(k.EARLY_PAYOFF_SAVINGS)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,o,o),KJE.colorList[0])
};
KJE.AutoPayoff.prototype.setValues=function(c){var d=KJE.inputs.items;
c.AUTOLOAN_MONTHS_LEFT=d.AUTOLOAN_MONTHS_LEFT.getValue();
c.AUTOLOAN_MONTHS_LENGTH=d.AUTOLOAN_MONTHS_LENGTH.getValue();
c.AUTOLOAN_AMT=d.AUTOLOAN_AMT.getValue();
c.INCREASE_BY_AMT=d.INCREASE_BY_AMT.getValue();
c.RATE=d.RATE.getValue();
c.BY_YEAR=d.BY_YEAR.getValue()
};
KJE.AutoPayoff.prototype.refresh=function(h){var i=KJE;
var j=KJE.gLegend;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
KJE.setTitleTemplate(h.MSG_EARLY_PAYOFF_MONTHS);
g.removeAll();
g.setGraphCategories(h.sCats);
g.add(new KJE.gGraphDataSeries(h.aNewInterestPaid,this.MSG_GRAPH1,g.getColor(1)));
g.add(new KJE.gGraphDataSeries(h.aInterestPaid,this.MSG_GRAPH2,g.getColor(2)));
g.add(new KJE.gGraphDataSeries(h.aNewPrincipalBalance,this.MSG_GRAPH3,g.getColor(3)));
g.add(new KJE.gGraphDataSeries(h.aPrincipalBalance,this.MSG_GRAPH4,g.getColor(4)));
g.paint();
f.PI_PAYMENT.setText(i.dollars(h.PI_PAYMENT,2))
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-AUTOLOAN_MONTHS_LEFT'><input id='KJE-AUTOLOAN_MONTHS_LEFT' /></div> <div id='KJE-C-AUTOLOAN_MONTHS_LENGTH'><input id='KJE-AUTOLOAN_MONTHS_LENGTH' /></div> <div id='KJE-C-AUTOLOAN_AMT'><input id='KJE-AUTOLOAN_AMT' /></div> <div id='KJE-C-INCREASE_BY_AMT'><input id='KJE-INCREASE_BY_AMT' /></div> <div id='KJE-C-RATE'><input id='KJE-RATE' /></div> <div id='KJE-C-PI_PAYMENT'><div id='KJE-PI_PAYMENT'></div></div> <div id='KJE-C-BY_YEAR'><fieldset id='KJE-FS-BY_YEAR'><input id='KJE-BY_YEAR1' type=radio name=BY_YEAR /><input id='KJE-BY_YEAR2' type=radio name=BY_YEAR /></fieldset></div> <div id='KJE-C-EARLY_PAYOFF_PI_PAYMENT'><div id='KJE-EARLY_PAYOFF_PI_PAYMENT'></div></div> <div id='KJE-C-SAVINGS'><div id='KJE-SAVINGS'></div></div>  <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-RATE' ><dt>Annual interest rate</dt><dd>Annual interest rate. Maximum interest rate is 20%.</dd></div> <div id='KJE-D-AUTOLOAN_MONTHS_LEFT' ><dt>Number of months remaining</dt><dd>Total number of months remaining on your original auto loan.</dd></div> <div id='KJE-D-AUTOLOAN_MONTHS_LENGTH' ><dt>Loan term (months)</dt><dd>Total length, or term, of your original auto loan in months.</dd></div> <div id='KJE-D-AUTOLOAN_AMT' ><dt>Auto loan amount</dt><dd>The original amount financed with your auto loan, not to be confused with the remaining balance or principal balance.</dd></div> <div id='KJE-D-INCREASE_BY_AMT' ><dt>Additional monthly payment</dt><dd>Your proposed extra payment per month. This payment will be used to reduce your principal balance.</dd></div> <div id='KJE-D-PI_PAYMENT' ><dt>Current payment</dt><dd>Monthly principal and interest payment based on your original loan amount, term and interest rate.</dd></div> <div id='KJE-D-EARLY_PAYOFF_PI_PAYMENT' ><dt>Monthly prepayment amount</dt><dd>Scheduled payment plus additional monthly payment.</dd></div> <div id='KJE-D-SAVINGS' ><dt>Total savings</dt><dd>Total amount you would save in interest if you made the accelerated payment until your loan was paid in full.</dd></div> ";
KJE.ReportText=' <!--HEADING "Auto Loan Payoff " HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Auto Loan repayment shortened by MSG_EARLY_PAYOFF_MONTHS.</h2>By increasing your auto loan payment by INCREASE_BY_AMT per month, you not only shorten your auto loan repayment, but it will also save you EARLY_PAYOFF_SAVINGS in interest. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Auto Loan Payoff Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Loan term</th><td class="KJECell" >AUTOLOAN_MONTHS_LENGTH Months</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Remaining</th><td class="KJECell" >AUTOLOAN_MONTHS_LEFT Months</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual interest rate</th><td class="KJECell" >RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current payment</th><td class="KJECell" >PI_PAYMENT per month</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Prepayment amount</th><td class="KJECell" >INCREASE_BY_AMT per month</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Prepayment shortens auto loan by</th><td class="KJECellStrong" >MSG_EARLY_PAYOFF_MONTHS</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Prepayment savings</th><td class="KJECellStrong" >EARLY_PAYOFF_SAVINGS</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("INCREASE_BY_AMT",100);
KJE.parameters.set("AUTOLOAN_AMT",20000);
KJE.parameters.set("AUTOLOAN_MONTHS_LEFT",60);
KJE.parameters.set("AUTOLOAN_MONTHS_LENGTH",60);
KJE.parameters.set("RATE",KJE.Default.RateAuto);