KJE.Default.PAY_WEEKLY=0;
KJE.Default.PAY_ACCEL_WEEK=1;
KJE.Default.PAY_ACCEL_BI=2;
KJE.Default.PAY_BIWEEKLY=3;
KJE.Default.PAY_2XMONTHLY=4;
KJE.Default.PAY_MONTHLY=5;
KJE.Default.PAY_QUARTERLY=6;
KJE.Default.PAY_SEMIANNUAL=7;
KJE.Default.PAY_ANNUAL=8;
KJE.Default.getPayDrop=function(o,h,k){KJE.Default.PAY_PERIOD_IDs=KJE.parameters.get("ARRAY_PAY_PERIODS_IDS",[KJE.Default.PAY_WEEKLY,KJE.Default.PAY_ACCEL_WEEK,KJE.Default.PAY_ACCEL_BI,KJE.Default.PAY_BIWEEKLY,KJE.Default.PAY_2XMONTHLY,KJE.Default.PAY_MONTHLY]);
KJE.Default.PAY_PERIODS=KJE.parameters.get("ARRAY_PAY_PERIODS",["weekly","accelerated weekly","accelerated bi-weekly","bi-weekly","semi-monthly","monthly","quarterly","semi-annual","annual"]);
KJE.Default.PAY_PERIODS_TITLE=KJE.parameters.get("ARRAY_PAY_PERIODS_TITLE",["Weekly","Accelerated weekly","Accelerated bi-weekly","Bi-weekly","Semi-monthly","Monthly","Quarterly","Semi-annual","Annual"]);
KJE.Default.PAY_FREQUENCY=[52,12,12,26,24,12,4,2,1];
KJE.Default.PAY_FREQUENCY_ACCELERATED=[52,52,26,26,24,12,4,2,1];
KJE.Default.PAY_ACCELERATED=[false,true,true,false,false,false,false,false,false];
var j=KJE.Default.PAY_PERIOD_IDs;
var l=j.length;
var m=KJE.Default.PAY_PERIODS_TITLE;
var n=new Array(l);
for(i=0;
i<l;
i++){n[i]=m[j[i]]
}return KJE.getDropBox(o,KJE.parameters.get(o,(!h?KJE.Default.PAY_MONTHLY:h)),j,n,k)
};
KJE.CompareLoanCalc=function(){this.SHOW_APR=true;
this.bIO=KJE.parameters.get("INTEREST_ONLY",false);
this.ADDITIONAL_OUTPUT=KJE.parameters.get("ADDITIONAL_OUTPUT","");
this.TITLE_MESSAGE=KJE.parameters.get("TITLE_MESSAGE","MSG_LOANBEST_LOAN_BY_APR provides the lowest Annual Percentage Rate (APR) of BEST_LOAN_APR.");
this.COMPARE_TYPE=KJE.parameters.get("COMPARE_TYPE","MORTGAGE");
this.SHOW_ZERO_INTEREST_RATE=KJE.parameters.get("SHOW_ZERO_INTEREST_RATE",true);
this.SHOW_PAYMENT_TYPES=false;
if(this.COMPARE_TYPE=="CAMORTGAGE"||this.COMPARE_TYPE=="CALOAN"){this.SHOW_PAYMENT_TYPES=true
}this.SHOW_PAYMENT_TYPES=KJE.parameters.get("SHOW_PAYMENT_TYPES",this.SHOW_PAYMENT_TYPES);
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","At least one loan must have an amount.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Years to amortize cannot be less than the loan term.");
var d=this.LOAN_COUNT=KJE.parameters.get("LOAN_COUNT",3);
this.IO_TERM=KJE.FloatArray(d);
[];
this.LOAN_AMOUNT=KJE.FloatArray(d);
this.INTEREST_RATE=KJE.FloatArray(d);
this.NEW_INTEREST_RATE=KJE.FloatArray(d);
this.LOAN_TERM=KJE.FloatArray(d);
this.LOAN_TERM_ENTERED=KJE.FloatArray(d);
this.PAYMENT_TYPE=KJE.IntArray(d);
this.AMORTIZATION=KJE.FloatArray(d);
this.AMORTIZATION_ENTERED=KJE.FloatArray(d);
this.CLOSING_COSTS=KJE.FloatArray(d);
this.MONTHLY_LOAN_PAYMENT=KJE.FloatArray(d);
this.ANNUAL_PERCENTAGE_RATE=KJE.FloatArray(d);
this.BALLOON_PAYMENT=KJE.FloatArray(d);
this.PAYMENTS_PER_YEAR=KJE.IntArray(d);
[];
this.PAYMENT_TYPE_DESC=new Array(d);
[];
this.PAYMENT_TYPE_TITLE=new Array(d);
[];
this.LOAN_PAYMENT=KJE.FloatArray(d);
this.TOTAL_PAYMENTS=KJE.FloatArray(d);
this.TOTAL_INTEREST=KJE.FloatArray(d);
this.LOAN_NAME=new Array(d);
for(var c=0;
c<d;
c++){this.LOAN_NAME[c]=KJE.parameters.get("MSG_LOAN"+(c+1),"Loan "+(c+1))
}this.MSG_NA=KJE.parameters.get("MSG_NA","n/a");
this.ORIGINATION_FEE=KJE.FloatArray(d);
this.COMMITMENT_FEE=KJE.FloatArray(d);
this.OTHER_FEES=KJE.FloatArray(d);
this.OTHER_COSTS=KJE.FloatArray(d);
this.BEST_LOAN_BY_APR=0;
this.BEST_LOAN_APR=0;
this.BEST_LOAN_BY_PAYMENT=0;
this.BEST_LOAN_PAYMENT=0;
this.DS_PAYMENTS=null;
this.DS_APR=null;
this.cats=null
};
KJE.CompareLoanCalc.prototype.clear=function(){var d=this.LOAN_COUNT;
for(var c=0;
c<d;
c++){this.LOAN_AMOUNT[c]=0;
this.INTEREST_RATE[c]=0;
this.AMORTIZATION[c]=0;
this.ORIGINATION_FEE[c]=0;
this.COMMITMENT_FEE[c]=0;
this.OTHER_FEES[c]=0;
this.OTHER_COSTS[c]=0;
this.PAYMENT_TYPE[c]=KJE.Default.PAY_MONTHLY
}};
KJE.CompareLoanCalc.prototype.calculate=function(M){var T=KJE;
var I=this.LOAN_COUNT;
var p=this.LOAN_AMOUNT;
var Y=this.INTEREST_RATE;
var ab=this.AMORTIZATION;
var R=this.NEW_INTEREST_RATE;
var L=this.PAYMENT_TYPE;
var Q=this.CLOSING_COSTS;
var K=this.MONTHLY_LOAN_PAYMENT;
var F=this.LOAN_PAYMENT;
var J=this.ANNUAL_PERCENTAGE_RATE;
var W=this.BALLOON_PAYMENT;
var X=this.PAYMENTS_PER_YEAR;
var P=this.LOAN_TERM;
var S=this.bIO;
for(var n=0;
n<I;
n++){Q[n]=0;
K[n]=0;
J[n]=0;
W[n]=0;
X[n]=12;
this.PAYMENT_TYPE_DESC[n]=KJE.Default.PAY_PERIODS[L[n]];
this.PAYMENT_TYPE_TITLE[n]=(KJE.lang=="FR"?this.PAYMENT_TYPE_DESC[n]:KJE.Default.PAY_PERIODS_TITLE[L[n]]);
this.AMORTIZATION_ENTERED[n]=this.AMORTIZATION[n];
this.LOAN_TERM_ENTERED[n]=this.LOAN_TERM[n]
}if(p[0]+p[1]+p[2]<=0){throw (this.MSG_ERROR1)
}var V=0;
for(var n=0;
n<I;
n++){if(S){var O=ab[n];
P[n]=KJE.Default.IO_TERMS[O]+KJE.Default.IO_AMORTS[O];
ab[n]=P[O];
this.IO_TERM[n]=KJE.Default.IO_TERMS[O]
}X[n]=KJE.Default.PAY_FREQUENCY[L[n]];
R[n]=(this.COMPARE_TYPE==("CAMORTGAGE")?(Math.pow(1+(Y[n]/200),(1/(X[n]/2)))-1)*(X[n]*100):Y[n]);
Q[n]=this.ORIGINATION_FEE[n]+this.COMMITMENT_FEE[n]+this.OTHER_FEES[n]+this.OTHER_COSTS[n];
if(KJE.Default.PAY_ACCELERATED[L[n]]){if(S){F[n]=T.round((R[n]/1200)*p[n],2)
}else{F[n]=T.round(KJE.PMT(R[n]/1200,ab[n]*12,p[n]),2)
}X[n]=KJE.Default.PAY_FREQUENCY_ACCELERATED[L[n]];
R[n]=(this.COMPARE_TYPE==("CAMORTGAGE")?(Math.pow(1+(Y[n]/200),(1/(X[n]/2)))-1)*(X[n]*100):Y[n]);
F[n]=T.round(((F[n]*13)/X[n]),2);
K[n]=(F[n]*X[n])/12;
ab[n]=KJE.PERIODS(R[n]/(X[n]*100),F[n],p[n])/X[n];
if(P[n]>ab[n]){P[n]=ab[n]
}}else{if(S){F[n]=T.round((R[n]/(X[n]*100))*p[n],2)
}else{F[n]=T.round(KJE.PMT(R[n]/(X[n]*100),ab[n]*X[n],p[n]),2)
}if(X[n]==12){K[n]=F[n]
}else{K[n]=(F[n]*X[n])/12
}}if(this.COMPARE_TYPE==("CAMORTGAGE")){if(Q[n]==0){J[n]=KJE.FV_AMT(Y[n]/200,2,1)-1
}else{var H=0;
var U=0;
var ae=p[n];
var ac=0;
for(var G=0;
G<X[n]*P[n];
G++){U+=ae;
var aa=ae*(R[n]/(X[n]*100));
ae=ae+aa-F[n];
ac++;
H+=aa;
if(ae<=0){break
}}if(U>0&&ac>0){U=U/ac;
var Z=T.round(ac/X[n],2);
J[n]=(((Q[n]+H)/(U*Z)));
J[n]=KJE.FV_AMT(J[n]/X[n],X[n],1)-1
}else{J[n]=0
}}}else{J[n]=KJE.APR(ab[n]*X[n],F[n],R[n]/(X[n]*100),p[n],Q[n])*X[n]
}W[n]=0;
if(ab[n]!=P[n]){W[n]=p[n];
if(ab[n]>P[n]){for(var ad=0;
ad<P[n]*12;
ad++){W[n]=W[n]+(W[n]*R[n]/1200)-K[n]
}W[n]+=K[n]
}else{throw (this.MSG_ERROR2)
}}if(p[n]<=0){Q[n]=0;
K[n]=0;
J[n]=0;
W[n]=0;
this.TOTAL_PAYMENTS[n]=0;
this.TOTAL_INTEREST[n]=0
}else{V++;
this.TOTAL_PAYMENTS[n]=F[n]*P[n]*X[n]+W[n];
this.TOTAL_INTEREST[n]=this.TOTAL_PAYMENTS[n]-p[n];
if(Y[n]==0){this.TOTAL_INTEREST[n]=0;
this.TOTAL_PAYMENTS[n]=p[n]
}}}this.DS_PAYMENTS=KJE.FloatArray(V);
this.DS_APR=KJE.FloatArray(V);
this.cats=new Array(V);
this.BEST_LOAN_BY_APR=10000000;
this.BEST_LOAN_APR=10000000;
this.BEST_LOAN_BY_PAYMENT=10000000;
this.BEST_LOAN_PAYMENT=10000000;
var N=0;
for(var n=0;
n<this.LOAN_COUNT;
n++){if(p[n]>0){this.DS_PAYMENTS[N]=K[n];
this.DS_APR[N]=J[n];
this.cats[N++]=this.LOAN_NAME[n];
if(this.BEST_LOAN_APR>J[n]){this.BEST_LOAN_BY_APR=n+1;
this.BEST_LOAN_APR=J[n]
}if(this.BEST_LOAN_PAYMENT>K[n]){this.BEST_LOAN_BY_PAYMENT=n+1;
this.BEST_LOAN_PAYMENT=K[n]
}}}this.MONTHLY_LOAN_PAYMENT=K;
this.ANNUAL_PERCENTAGE_RATE=J
};
KJE.CompareLoanCalc.prototype.formatReport=function(h){h.show("<SHOW_APR>","<END_SHOW_APR>",this.SHOW_APR);
h.replace("ADDITIONAL_OUTPUT",this.ADDITIONAL_OUTPUT);
var f=0;
for(var g=1;
g<=this.LOAN_COUNT;
g++){var e=g-1;
h.dollars("LOAN_AMOUNT"+g,this.LOAN_AMOUNT[e]);
if(this.INTEREST_RATE[e]>0||this.SHOW_ZERO_INTEREST_RATE){f++;
h.loanRate("INTEREST_RATE"+g,this.INTEREST_RATE[e]/100);
h.number("LOAN_TERM_ENTERED"+g,this.LOAN_TERM_ENTERED[e]);
h.replace("LOAN_TERM"+g,KJE.number(this.LOAN_TERM[e],(KJE.Default.PAY_ACCELERATED[this.PAYMENT_TYPE[e]]?1:0))+" "+KJE.MSG_YEARS_LBL);
h.dollars("MONTHLY_LOAN_PAYMENT"+g,this.MONTHLY_LOAN_PAYMENT[e])
}else{h.replace("INTEREST_RATE"+g,"");
h.replace("LOAN_TERM_ENTERED"+g,"");
h.replace("LOAN_TERM"+g,"");
h.replace("MONTHLY_LOAN_PAYMENT"+g,"")
}h.number("AMORTIZATION_ENTERED"+g,this.AMORTIZATION_ENTERED[e]);
h.replace("ACCEL_AMORTIZATION"+g,(KJE.Default.PAY_ACCELERATED[this.PAYMENT_TYPE[e]]?"<br>"+Fmt.number(this.AMORTIZATION[e],1)+" "+KJE.MSG_YEARS_LBL+" "+this.PAYMENT_TYPE_DESC[e]:""));
h.number("AMORTIZATION"+g,this.AMORTIZATION[e],1);
h.dollars("ORIGINATION_FEE"+g,this.ORIGINATION_FEE[e]);
h.dollars("COMMITMENT_FEE"+g,this.COMMITMENT_FEE[e]);
h.dollars("OTHER_FEES"+g,this.OTHER_FEES[e]);
h.dollars("OTHER_COSTS"+g,this.OTHER_COSTS[e]);
h.dollars("CLOSING_COSTS"+g,this.CLOSING_COSTS[e]);
h.dollars("LOAN_PAYMENT"+g,this.LOAN_PAYMENT[e]);
h.percent("ANNUAL_PERCENTAGE_RATE"+g,this.ANNUAL_PERCENTAGE_RATE[e],3);
h.dollars("BALLOON_PAYMENT"+g,this.BALLOON_PAYMENT[e]);
h.dollars("TOTAL_INTEREST"+g,this.TOTAL_INTEREST[e]);
h.dollars("TOTAL_PAYMENTS"+g,this.TOTAL_PAYMENTS[e]);
h.dollars("TOTAL_INTEREST_FEES"+g,this.TOTAL_INTEREST[e]+this.CLOSING_COSTS[e]);
h.dollars("TOTAL_PAYMENTS_FEES"+g,this.TOTAL_PAYMENTS[e]+this.CLOSING_COSTS[e]);
h.number("IO_TERM"+g,this.IO_TERM[e],0);
h.number("IO_REMAINING_TERM"+g,25-this.IO_TERM[e],0);
h.replace("MSG_LOAN"+g,this.LOAN_NAME[e])
}if(this.SHOW_ZERO_INTEREST_RATE||f>=this.LOAN_COUNT){h.replace("TITLE_MESSAGE",this.TITLE_MESSAGE);
h.dollars("BEST_LOAN_PAYMENT",this.BEST_LOAN_PAYMENT);
h.percent("BEST_LOAN_APR",this.BEST_LOAN_APR,3);
h.number("BEST_LOAN_BY_APR",this.BEST_LOAN_BY_APR);
h.number("BEST_LOAN_BY_PAYMENT",this.BEST_LOAN_BY_PAYMENT)
}else{h.replace("TITLE_MESSAGE","");
h.replace("BEST_LOAN_PAYMENT","");
h.replace("BEST_LOAN_APR","");
h.replace("BEST_LOAN_BY_APR","");
h.replace("BEST_LOAN_BY_PAYMENT","")
}for(var g=1;
g<=this.LOAN_COUNT;
g++){var e=g-1;
h.replace("MSG_LOAN"+g,this.LOAN_NAME[e])
}};
KJE.CalcName="Loan Comparison Calculator";
KJE.CalcType="compareloan";
KJE.CalculatorTitle="Loan Comparison Calculator";
KJE.parameters.getSet("PAYMENT_TYPE1",KJE.Default.PAY_MONTHLY);
KJE.parameters.getSet("PAYMENT_TYPE2",KJE.Default.PAY_MONTHLY);
KJE.parameters.getSet("PAYMENT_TYPE3",KJE.Default.PAY_MONTHLY);
KJE.parameters.getSet("PAYMENT_TYPE4",KJE.Default.PAY_MONTHLY);
KJE.parameters.getSet("PAYMENT_TYPE5",KJE.Default.PAY_MONTHLY);
KJE.parameters.getSet("PAYMENT_TYPE6",KJE.Default.PAY_MONTHLY);
KJE.parameters.getSet("LOAN_TERM1",5);
KJE.parameters.getSet("LOAN_TERM2",5);
KJE.parameters.getSet("LOAN_TERM3",5);
KJE.parameters.getSet("LOAN_COUNT",3);
KJE.parseInputs=function(e){var f=KJE.parameters.get("INTEREST_ONLY",false);
var h=KJE.parameters.get("LOAN_COUNT",3);
for(var g=1;
g<=h;
g++){if(f){e=KJE.replace("**AMORTIZATION"+g+"**",KJE.getDropBox("AMORTIZATION"+g,KJE.parameters.get("AMORTIZATION"+g,0),KJE.Default.IO_ID,KJE.Default.IO_ITEMS),e)
}else{e=KJE.replace("**LOAN_TERM"+g+"**",KJE.getMortgageTermDrop("LOAN_TERM"+g,30),e);
e=KJE.replace("**AMORTIZATION"+g+"**",KJE.getMortgageTermDrop("AMORTIZATION"+g,30),e)
}if(KJE.Default.getPayDrop){e=KJE.replace("**PAYMENT_TYPE"+g+"**",KJE.Default.getPayDrop("PAYMENT_TYPE"+g,KJE.Default.PAY_MONTHLY),e)
}}return e
};
KJE.initialize=function(){KJE.CalcControl=new KJE.CompareLoanCalc();
KJE.GuiControl=new KJE.CompareLoan(KJE.CalcControl)
};
KJE.CompareLoan=function(l){var r=KJE;
var v=KJE.gLegend;
var p=KJE.inputs.items;
var n=l.COMPARE_TYPE=="CAMORTGAGE";
this.MSG_PAYMENT=KJE.parameters.get("MSG_PAYMENT",n?"Loan amount":"Loan Payment");
var o=l.LOAN_COUNT;
var w=new Array(o);
for(var t=1;
t<=o;
t++){KJE.InputItem.AltHelpName="LOAN_AMOUNT";
KJE.MortgageAmtSlider("LOAN_AMOUNT"+t,KJE.parameters.get("MSG_LOAN_AMOUNT",n?"Mortgage amount":"Loan amount"));
KJE.InputItem.AltHelpName="INTEREST_RATE";
KJE.MortgageRateSlider("INTEREST_RATE"+t,KJE.parameters.get("MSG_INTEREST_RATE","Interest rate"));
KJE.InputItem.AltHelpName="LOAN_TERM";
KJE.MortgageTermDropBoxSlider("LOAN_TERM"+t,KJE.parameters.get("MSG_LOAN_TERM",n?"Mortgage term":"Loan term"));
KJE.InputItem.AltHelpName="AMORTIZATION";
if(l.bIO){KJE.DropBox("AMORTIZATION"+t,KJE.parameters.get("MSG_AMORTIZATION",n?"Mortgage amortization":"Loan amortization"))
}else{KJE.MortgageTermDropBoxSlider("AMORTIZATION"+t,KJE.parameters.get("MSG_AMORTIZATION",n?"Mortgage amortization":"Loan amortization"))
}KJE.InputItem.AltHelpName="ORIGINATION_FEE";
KJE.Slider("ORIGINATION_FEE"+t,KJE.parameters.get("MSG_ORIGINATION_FEE","Origination fee"),0,10000000,0,r.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
KJE.InputItem.AltHelpName="COMMITMENT_FEE";
KJE.Slider("COMMITMENT_FEE"+t,KJE.parameters.get("MSG_COMMITMENT_FEE","Commitment fee"),0,10000000,0,r.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
KJE.InputItem.AltHelpName="OTHER_FEES";
KJE.Slider("OTHER_FEES"+t,KJE.parameters.get("MSG_OTHER_FEES",(l.COMPARE_TYPE=="CALOAN"||l.COMPARE_TYPE=="CAMORTGAGE"?"Fees":"Other fees")),0,10000000,0,r.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
KJE.InputItem.AltHelpName="OTHER_COSTS";
KJE.Slider("OTHER_COSTS"+t,KJE.parameters.get("MSG_OTHER_COSTS","Other costs"),0,10000000,0,r.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));
KJE.InputItem.AltHelpName="ANNUAL_PERCENTAGE_RATE";
KJE.Label("ANNUAL_PERCENTAGE_RATE"+t,KJE.parameters.get("MSG_ANNUAL_PERCENTAGE_RATE","Apr"),null,null,"KJEBold");
KJE.InputItem.AltHelpName="BALLOON_PAYMENT";
KJE.Label("BALLOON_PAYMENT"+t,KJE.parameters.get("MSG_BALLOON_PAYMENT","Balloon payment"));
KJE.InputItem.AltHelpName="MONTHLY_PAYMENT";
KJE.Label("MONTHLY_PAYMENT"+t,KJE.parameters.get("MSG_MONTHLY_PAYMENT","Equivalent monthly payment"));
KJE.InputItem.AltHelpName="CLOSING_COSTS";
KJE.Label("CLOSING_COSTS"+t,KJE.parameters.get("MSG_CLOSING_COSTS","Closing costs"));
KJE.InputItem.AltHelpName="PAYMENT_TYPE";
KJE.DropBox("PAYMENT_TYPE"+t,KJE.parameters.get("MSG_PAYMENT_TYPE","Payment type"));
w[t-1]=l.LOAN_NAME[t-1]+KJE.Colon
}var q=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_MONTHLY_PAYMENTS",l.SHOW_PAYMENT_TYPES?"Equivalent Monthly Payments":"Monthly Payments"));
q._legend.setVisible(false);
q._legend._iOrientation=(v.TOP_RIGHT);
q._bPopDetail=true;
q._showItemLabel=true;
var u=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 payment KJE2");
var s=new Array(o);
s[0]=function(){return w[0]+"|"+KJE.subText(KJE.getKJEReplaced(u,l.PAYMENT_TYPE_TITLE[0],r.dollars(l.LOAN_PAYMENT[0],2)),"KJERightBold")
};
s[1]=function(){return w[1]+"|"+KJE.subText(KJE.getKJEReplaced(u,l.PAYMENT_TYPE_TITLE[1],r.dollars(l.LOAN_PAYMENT[1],2)),"KJERightBold")
};
s[2]=function(){return w[2]+"|"+KJE.subText(KJE.getKJEReplaced(u,l.PAYMENT_TYPE_TITLE[2],r.dollars(l.LOAN_PAYMENT[2],2)),"KJERightBold")
};
if(o>3){s[3]=function(){return w[3]+"|"+KJE.subText(KJE.getKJEReplaced(u,l.PAYMENT_TYPE_TITLE[3],r.dollars(l.LOAN_PAYMENT[3],2)),"KJERightBold")
}
}if(o>4){s[4]=function(){return w[4]+"|"+KJE.subText(KJE.getKJEReplaced(u,l.PAYMENT_TYPE_TITLE[4],r.dollars(l.LOAN_PAYMENT[4],2)),"KJERightBold")
}
}if(o>5){s[5]=function(){return w[5]+"|"+KJE.subText(KJE.getKJEReplaced(u,l.PAYMENT_TYPE_TITLE[5],r.dollars(l.LOAN_PAYMENT[5],2)),"KJERightBold")
}
}for(t=0;
t<o;
t++){KJE.addDropper(new KJE.Dropper("INPUT_LOAN"+(t+1),false,s[t],s[t]),KJE.colorList[0])
}};
KJE.CompareLoan.prototype.setValues=function(k){var g=KJE.inputs.items;
for(var j=1;
j<=k.LOAN_COUNT;
j++){var m=j-1;
k.LOAN_AMOUNT[m]=g["LOAN_AMOUNT"+j].getValue();
k.INTEREST_RATE[m]=g["INTEREST_RATE"+j].getValue();
var l=g["LOAN_TERM"+j]._inputType!=KJE.TypeNone;
var h=g["AMORTIZATION"+j]._inputType!=KJE.TypeNone;
if(l){k.LOAN_TERM[m]=g["LOAN_TERM"+j].getValue()
}if(h){k.AMORTIZATION[m]=g["AMORTIZATION"+j].getValue()
}if(!l){k.LOAN_TERM[m]=k.AMORTIZATION[m]
}if(!h){k.AMORTIZATION[m]=k.LOAN_TERM[m]
}k.ORIGINATION_FEE[m]=g["ORIGINATION_FEE"+j].getValue();
k.COMMITMENT_FEE[m]=g["COMMITMENT_FEE"+j].getValue();
k.OTHER_FEES[m]=g["OTHER_FEES"+j].getValue();
k.OTHER_COSTS[m]=g["OTHER_COSTS"+j].getValue();
k.OTHER_COSTS[m]=g["OTHER_COSTS"+j].getValue();
k.PAYMENT_TYPE[m]=g["PAYMENT_TYPE"+j].getValue()
}};
KJE.CompareLoan.prototype.refresh=function(l){var m=KJE;
var n=KJE.gLegend;
var h=KJE.inputs.items;
var j=KJE.gGraphs[0];
j.removeAll();
j.setGraphCategories(l.cats);
if(l.DS_PAYMENTS.length>3){j._legend.setVisible(true);
j._axisX.setVisible(false)
}else{j._legend.setVisible(false);
j._axisX.setVisible(true)
}j.add(new KJE.gGraphDataSeries(l.DS_PAYMENTS,this.MSG_PAYMENT,j.getColor(1)));
j.paint();
for(var k=1;
k<=l.LOAN_COUNT;
k++){var o=k-1;
if(h["ANNUAL_PERCENTAGE_RATE"+k]){h["ANNUAL_PERCENTAGE_RATE"+k].setText(m.percent(l.ANNUAL_PERCENTAGE_RATE[o],3))
}if(h["BALLOON_PAYMENT"+k]){h["BALLOON_PAYMENT"+k].setText(l.BALLOON_PAYMENT[o]>0?m.dollars(l.BALLOON_PAYMENT[o],2):l.MSG_NA)
}if(h["CLOSING_COSTS"+k]){h["CLOSING_COSTS"+k].setText(m.dollars(l.CLOSING_COSTS[o]))
}if(h["MONTHLY_PAYMENT"+k]){h["MONTHLY_PAYMENT"+k].setText(m.dollars(l.MONTHLY_LOAN_PAYMENT[o],2))
}}};
KJE.InputScreenText=" <div id=KJE-D-INPUT_LOAN1><div id=KJE-P-INPUT_LOAN1>Input information:</div></div> <div id=KJE-E-INPUT_LOAN1 > <fieldset ID='KJE-FS-INPUT_LOAN1' class=\"KJEAccessibleFieldSet\"> <legend class=\"KJEAccessibleFieldSetLegend\">Loan 1</legend> <div id='KJE-C-LOAN_AMOUNT1'><input id='KJE-LOAN_AMOUNT1' /></div> <div id='KJE-C-INTEREST_RATE1'><input id='KJE-INTEREST_RATE1' /></div> <div id=\"KJE-C-LOAN_TERM1\">**LOAN_TERM1**</div> <div id=\"KJE-C-AMORTIZATION1\">**AMORTIZATION1**</div> <div id='KJE-C-ORIGINATION_FEE1'><input id='KJE-ORIGINATION_FEE1' /></div> <div id='KJE-C-COMMITMENT_FEE1'><input id='KJE-COMMITMENT_FEE1' /></div> <div id='KJE-C-OTHER_FEES1'><input id='KJE-OTHER_FEES1' /></div> <div id='KJE-C-OTHER_COSTS1'><input id='KJE-OTHER_COSTS1' /></div> <div id='KJE-C-CLOSING_COSTS1'><div id='KJE-CLOSING_COSTS1'></div></div> <div id='KJE-C-BALLOON_PAYMENT1'><div id='KJE-BALLOON_PAYMENT1'></div></div> <div id='KJE-C-ANNUAL_PERCENTAGE_RATE1'><div id='KJE-ANNUAL_PERCENTAGE_RATE1'></div></div> <div class=KJEDropperSpacer></div> </fieldset> </div> <div id=KJE-D-INPUT_LOAN2><div id=KJE-P-INPUT_LOAN2>Input information:</div></div> <div id=KJE-E-INPUT_LOAN2 > <fieldset ID='KJE-FS-INPUT_LOAN2' class=\"KJEAccessibleFieldSet\"> <legend class=\"KJEAccessibleFieldSetLegend\">Loan 2</legend> <div id='KJE-C-LOAN_AMOUNT2'><input id='KJE-LOAN_AMOUNT2' /></div> <div id='KJE-C-INTEREST_RATE2'><input id='KJE-INTEREST_RATE2' /></div> <div id=\"KJE-C-LOAN_TERM2\">**LOAN_TERM2**</div> <div id=\"KJE-C-AMORTIZATION2\">**AMORTIZATION2**</div> <div id='KJE-C-ORIGINATION_FEE2'><input id='KJE-ORIGINATION_FEE2' /></div> <div id='KJE-C-COMMITMENT_FEE2'><input id='KJE-COMMITMENT_FEE2' /></div> <div id='KJE-C-OTHER_FEES2'><input id='KJE-OTHER_FEES2' /></div> <div id='KJE-C-OTHER_COSTS2'><input id='KJE-OTHER_COSTS2' /></div> <div id='KJE-C-CLOSING_COSTS2'><div id='KJE-CLOSING_COSTS2'></div></div> <div id='KJE-C-BALLOON_PAYMENT2'><div id='KJE-BALLOON_PAYMENT2'></div></div> <div id='KJE-C-ANNUAL_PERCENTAGE_RATE2'><div id='KJE-ANNUAL_PERCENTAGE_RATE2'></div></div> <div class=KJEDropperSpacer></div> </fieldset> </div> <div id=KJE-D-INPUT_LOAN3><div id=KJE-P-INPUT_LOAN3>Input information:</div></div> <div id=KJE-E-INPUT_LOAN3 > <fieldset ID='KJE-FS-INPUT_LOAN3' class=\"KJEAccessibleFieldSet\"> <legend class=\"KJEAccessibleFieldSetLegend\">Loan 3</legend> <div id='KJE-C-LOAN_AMOUNT3'><input id='KJE-LOAN_AMOUNT3' /></div> <div id='KJE-C-INTEREST_RATE3'><input id='KJE-INTEREST_RATE3' /></div> <div id=\"KJE-C-LOAN_TERM3\">**LOAN_TERM3**</div> <div id=\"KJE-C-AMORTIZATION3\">**AMORTIZATION3**</div> <div id='KJE-C-ORIGINATION_FEE3'><input id='KJE-ORIGINATION_FEE3' /></div> <div id='KJE-C-COMMITMENT_FEE3'><input id='KJE-COMMITMENT_FEE3' /></div> <div id='KJE-C-OTHER_FEES3'><input id='KJE-OTHER_FEES3' /></div> <div id='KJE-C-OTHER_COSTS3'><input id='KJE-OTHER_COSTS3' /></div> <div id='KJE-C-CLOSING_COSTS3'><div id='KJE-CLOSING_COSTS3'></div></div> <div id='KJE-C-BALLOON_PAYMENT3'><div id='KJE-BALLOON_PAYMENT3'></div></div> <div id='KJE-C-ANNUAL_PERCENTAGE_RATE3'><div id='KJE-ANNUAL_PERCENTAGE_RATE3'></div></div> <div class=KJEDropperSpacer></div> </fieldset> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-LOAN_AMOUNT' ><dt>Loan amount</dt><dd>The total dollar amount for this loan.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate</dt><dd>The interest rate on this loan.</dd></div> <div id='KJE-D-LOAN_TERM' ><dt>Loan term</dt><dd>The number of years over which you will repay this loan. The most common terms are 15 years and 30 years. If this loan has a 'balloon' payment, the loan term will be shorter than the number of years to amortize the loan. For example, a loan with a 5-year term amortized over 30 years will have the same monthly payment as a 30-year loan with the same interest rate. The difference is the 30-year loan will have equal payments for 30 years. The 5-year loan will have equal payments for 5 years and then a very large, or balloon, payment for the remaining balance.</dd></div> <div id='KJE-D-AMORTIZATION' ><dt>Amortization</dt><dd>The number of years used in calculating the monthly payment. Loans that are amortized over a longer period than their loan term have a balloon payment. See 'Loan term' for more information.</dd></div> <div id='KJE-D-ORIGINATION_FEE' ><dt>Origination fee</dt><dd>The dollar amount charged as a loan origination fee, which is included in the annual percentage rate (APR) calculation. For many loans a 1% origination fee is common. For example, a 1% fee on a $120,000 loan would cost $1,200.</dd></div> <div id='KJE-D-COMMITMENT_FEE' ><dt>Commitment fee</dt><dd>An upfront fee included in the APR calculation.</dd></div> <div id='KJE-D-OTHER_FEES' ><dt>Other fees</dt><dd>Fees included in the APR calculation. These fees can vary by lender but, at a minimum, usually includes prepaid interest.</dd></div> <div id='KJE-D-OTHER_COSTS' ><dt>Other costs</dt><dd>Any other costs that should be included in the APR calculation.</dd></div> <div id='KJE-D-CLOSING_COSTS' ><dt>Closing costs</dt><dd>Total of all closing costs for this loan.</dd></div> <div id='KJE-D-BALLOON_PAYMENT' ><dt>Balloon payment</dt><dd>This is the total final payment for all loans that are amortized over a period of time longer than the loan term. The balloon payment is total interest and principal balance due at the end of the loan term. (If the loan term is the same as the amortization, this amount is always zero.)</dd></div> <div id='KJE-D-ANNUAL_PERCENTAGE_RATE' ><dt>Annual percentage rate (APR)</dt><dd>A standard calculation used by lenders. It is designed to help borrowers compare different loan options. For example, a loan with a lower stated interest rate may be a bad value if its fees are too high. Likewise, a loan with a higher stated rate and very low fees could be an exceptional value. APR calculations incorporate these fees into a single rate. You can then compare loans with different fees, rates or terms.</dd></div> ";
KJE.ReportText=' <!--HEADING "Loan Comparison Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>TITLE_MESSAGE</h2>MSG_LOANBEST_LOAN_BY_APR provides the lowest Annual Percentage Rate at BEST_LOAN_APR. The lowest monthly payment is provided by MSG_LOANBEST_LOAN_BY_PAYMENT at BEST_LOAN_PAYMENT per month. **GRAPH** <div class=KJEReportTableDiv><table class=\'KJEReportTable KJEReportTableShrink\'><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell40">&nbsp; </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN1 </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN2 </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN3 </th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th scope=\'row\' class="KJELabel KJECellBorder">Loan amount </th><td class="KJECell KJECellBorder"> LOAN_AMOUNT1 </td><td class="KJECell KJECellBorder"> LOAN_AMOUNT2 </td><td class="KJECell"> LOAN_AMOUNT3 </td></tr> <tr class=KJEEvenRow><th scope=\'row\' class="KJELabel KJECellBorder">Loan term </th><td class="KJECell KJECellBorder"> LOAN_TERM1 </td><td class="KJECell KJECellBorder"> LOAN_TERM2 </td><td class="KJECell"> LOAN_TERM3 </td></tr> </tbody> <!--ADDITIONAL_OUTPUT--> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th scope=\'row\' class="KJELabel KJECellBorder">Monthly loan payment </th><td class="KJELabel KJECellBorder"> MONTHLY_LOAN_PAYMENT1 </td><td class="KJELabel KJECellBorder"> MONTHLY_LOAN_PAYMENT2 </td><td class="KJELabel"> MONTHLY_LOAN_PAYMENT3 </td></tr> <tr class=KJEFooterRow><th scope=\'row\' class="KJELabel KJECellBorder">Annual percentage rate (APR) </th><td class="KJELabel KJECellBorder"> ANNUAL_PERCENTAGE_RATE1 </td><td class="KJELabel KJECellBorder"> ANNUAL_PERCENTAGE_RATE2 </td><td class="KJELabel"> ANNUAL_PERCENTAGE_RATE3 </td></tr> </tfoot> </table> </div> <div class=KJEReportTableDiv><table class=\'KJEReportTable KJEReportTableShrink\'> <caption class=\'KJEHeaderRow KJEHeading\'>Your input values</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell40">&nbsp; </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN1 </th><th class="KJEHeading KJECell20" scope=\'col\'>MSG_LOAN2 </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN3 </th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th scope=\'row\' class="KJELabel KJECellBorder ">Loan amount </th><td class="KJECell KJECellBorder"> LOAN_AMOUNT1 </td><td class="KJECell KJECellBorder"> LOAN_AMOUNT2 </td><td class="KJECell"> LOAN_AMOUNT3 </td></tr> <tr class=KJEEvenRow><th scope=\'row\' class="KJELabel KJECellBorder ">Interest rate </th><td class="KJECell KJECellBorder"> INTEREST_RATE1 </td><td class="KJECell KJECellBorder"> INTEREST_RATE2 </td><td class="KJECell"> INTEREST_RATE3 </td></tr> <tr class=KJEOddRow><th scope=\'row\' class="KJELabel KJECellBorder ">Loan term </th><td class="KJECell KJECellBorder"> LOAN_TERM1 </td><td class="KJECell KJECellBorder"> LOAN_TERM2 </td><td class="KJECell"> LOAN_TERM3 </td></tr> <tr class=KJEEvenRow><th scope=\'row\' class="KJELabel KJECellBorder ">Amortization </th><td class="KJECell KJECellBorder"> AMORTIZATION1 </td><td class="KJECell KJECellBorder"> AMORTIZATION2 </td><td class="KJECell"> AMORTIZATION3 </td></tr> <tr class=KJEOddRow><th scope=\'row\' class="KJELabel KJECellBorder ">Origination fee </th><td class="KJECell KJECellBorder"> ORIGINATION_FEE1 </td><td class="KJECell KJECellBorder"> ORIGINATION_FEE2 </td><td class="KJECell"> ORIGINATION_FEE3 </td></tr> <tr class=KJEEvenRow><th scope=\'row\' class="KJELabel KJECellBorder ">Commitment fee </th><td class="KJECell KJECellBorder"> COMMITMENT_FEE1 </td><td class="KJECell KJECellBorder"> COMMITMENT_FEE2 </td><td class="KJECell"> COMMITMENT_FEE3 </td></tr> <tr class=KJEOddRow><th scope=\'row\' class="KJELabel KJECellBorder ">Other fees </th><td class="KJECell KJECellBorder"> OTHER_FEES1</td><td class="KJECell KJECellBorder"> OTHER_FEES2</td><td class="KJECell"> OTHER_FEES3</td></tr> <tr class=KJEEvenRow><th scope=\'row\' class="KJELabel KJECellBorder ">Other costs </th><td class="KJECell KJECellBorder"> OTHER_COSTS1 </td><td class="KJECell KJECellBorder"> OTHER_COSTS2 </td><td class="KJECell"> OTHER_COSTS3 </td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th scope=\'row\' class="KJELabel KJECellBorder ">Total closing costs </th><td class="KJELabel KJECellBorder"> CLOSING_COSTS1 </td><td class="KJELabel KJECellBorder"> CLOSING_COSTS2 </td><td class="KJELabel"> CLOSING_COSTS3 </td></tr> <tr class=KJEFooterRow><th scope=\'row\' class="KJELabel KJECellBorder ">Balloon payment </th><td class="KJELabel KJECellBorder"> BALLOON_PAYMENT1 </td><td class="KJELabel KJECellBorder"> BALLOON_PAYMENT2 </td><td class="KJELabel"> BALLOON_PAYMENT3 </td></tr> </tfoot> </table> </div> <BR> ';
KJE.parameters.set("AMORTIZATION1",20);
KJE.parameters.set("AMORTIZATION2",25);
KJE.parameters.set("AMORTIZATION3",30);
KJE.parameters.set("COMMITMENT_FEE1",0);
KJE.parameters.set("COMMITMENT_FEE2",0);
KJE.parameters.set("COMMITMENT_FEE3",0);
KJE.parameters.set("COMPARE_TYPE","LOAN");
KJE.parameters.set("INTEREST_RATE1",6.25);
KJE.parameters.set("INTEREST_RATE2",6.25);
KJE.parameters.set("INTEREST_RATE3",6.25);
KJE.parameters.set("LOAN_AMOUNT1",100000);
KJE.parameters.set("LOAN_AMOUNT2",100000);
KJE.parameters.set("LOAN_AMOUNT3",100000);
KJE.parameters.set("LOAN_TERM1",20);
KJE.parameters.set("LOAN_TERM2",25);
KJE.parameters.set("LOAN_TERM3",30);
KJE.parameters.set("MSG_LOAN1","Loan 1");
KJE.parameters.set("MSG_LOAN2","Loan 2");
KJE.parameters.set("MSG_LOAN3","Loan 3");
KJE.parameters.set("ORIGINATION_FEE1",0);
KJE.parameters.set("ORIGINATION_FEE2",0);
KJE.parameters.set("ORIGINATION_FEE3",0);
KJE.parameters.set("OTHER_COSTS1",0);
KJE.parameters.set("OTHER_COSTS2",0);
KJE.parameters.set("OTHER_COSTS3",0);
KJE.parameters.set("OTHER_FEES1",0);
KJE.parameters.set("OTHER_FEES2",0);
KJE.parameters.set("OTHER_FEES3",0);
KJE.parameters.set("TERM_MAXIMUM",40);
KJE.parameters.set("TERM_SHOW_ALL",true);
KJE.parameters.set("PAYMENT_TYPE1",KJE.Default.PAY_MONTHLY);
KJE.parameters.set("PAYMENT_TYPE2",KJE.Default.PAY_MONTHLY);
KJE.parameters.set("PAYMENT_TYPE3",KJE.Default.PAY_MONTHLY);