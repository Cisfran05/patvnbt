KJE.parameters.set("SHOW_INTEREST_ONLY",false);
KJE.parameters.set("DROPPER_OPEN2",true);
KJE.parameters.set("ARM_FIVE_YEAR_TERM",-1);
KJE.MortgageArmvsFixedCalc=function(){this.ARM=KJE.parameters.get("MSG_ARM","ARM Fully Amortizing");
this.IO=KJE.parameters.get("MSG_ARM_IO","ARM Interest Only");
this.FIXED=KJE.parameters.get("MSG_FIXED","Fixed Rate");
this.NEG=KJE.parameters.get("MSG_FIXED","Option ARM");
this.FIVE_YEAR_TERM=KJE.parameters.get("ARM_FIVE_YEAR_TERM",4);
this.MSG_FIVE=KJE.parameters.get("MSG_FIVE","Four");
this.MSG_FIVE_YEAR_TOTALS=KJE.parameters.get("MSG_ARM_FIVE_YEAR_TOTALS","Four year totals");
this.MSG_FIVE_YEAR_PAYMENT=KJE.parameters.get("MSG_FIVE_YEAR_PAYMENT","Payment after four years");
this.cats=[KJE.parameters.get("MSG_ARM_GRAPH_CAT1","One Year"),KJE.parameters.get("MSG_ARM_GRAPH_CAT2","Four Years")];
this.MSG_YEAR_NUMBER=KJE.parameters.get("MSG_YEAR_NUMBER","Year Number");
this.MSG_PRINCIPAL=KJE.parameters.get("MSG_PRINCIPAL","Principal");
this.MSG_INTEREST=KJE.parameters.get("MSG_INTEREST","Interest");
this.MSG_PAYMENT_NUMBER=KJE.parameters.get("MSG_PAYMENT_NUMBER","Payment Number");
this.MSG_PRINCIPAL_BALANCE=KJE.parameters.get("MSG_PRINCIPAL_BALANCE","Principal Balance");
this.MSG_NORMAL_PAYMENTS=KJE.parameters.get("MSG_NORMAL_PAYMENTS","Normal payments");
this.BREAK_EVEN_NOTE=["With your current assumptions, your total payments after ADJUST_YEARS for the ARM will be ADJUST_DIFFERENCE less than the fixed rate mortgage. In this case you may be better off with an ARM.","With your current assumptions, your total payments with an ARM are lower through ADJUST_YEARS of payments. If you expect to sell your home or refinance before ADJUST_YEARS, you may be better off with an ARM.","With your current assumptions, your ARM payments are never less than a fixed rate mortgage. In this case you may be better off with an fixed rate mortgage."];
this.BREAK_EVEN_NOTE[0]=KJE.parameters.get("MSG_BREAK_EVEN_NOTE1",this.BREAK_EVEN_NOTE[0]);
this.BREAK_EVEN_NOTE[1]=KJE.parameters.get("MSG_BREAK_EVEN_NOTE2",this.BREAK_EVEN_NOTE[1]);
this.BREAK_EVEN_NOTE[2]=KJE.parameters.get("MSG_BREAK_EVEN_NOTE3",this.BREAK_EVEN_NOTE[2]);
this.SHOW_PI_ARM=KJE.parameters.get("SHOW_PI_ARM",true);
this.SHOW_INTEREST_ONLY=KJE.parameters.get("SHOW_INTEREST_ONLY",true);
this.SHOW_FIXED=KJE.parameters.get("SHOW_FIXED",true);
this.SHOW_NEG=KJE.parameters.get("SHOW_NEG",false);
this.NEG_AM_FIXED=3;
this.NEG_AM_MAX_INCREASE=7.5;
this.INTEREST_ONLY=new Array(4);
[];
this.LOAN_TYPE=new Array(4);
this.ADJUSTABLE_RATE=new Array(4);
[];
this.NEG_AM=new Array(4);
[];
this.INTEREST_RATE=KJE.FloatArray(4);
this.INTEREST_RATE2=KJE.FloatArray(4);
this.PREPAYMENT=KJE.FloatArray(4);
this.PAYOFF=KJE.FloatArray(4);
[];
this.ADJUSTABLE_RATE_CAP=KJE.FloatArray(4);
this.ADJUSTABLE_RATE_INCR=KJE.FloatArray(4);
this.ADJUSTABLE_RATE_FEQ=KJE.FloatArray(4);
[];
this.ADJUSTABLE_MONTHS_FIXED=KJE.FloatArray(4);
[];
this.MONTHLY_PI=KJE.FloatArray(4);
this.MONTH_INTEREST=KJE.FloatArray(4);
this.MONTH_PRINCIPAL=KJE.FloatArray(4);
this.FIRST_YEAR_INTEREST=KJE.FloatArray(4);
this.FIRST_YEAR_PRINCIPAL=KJE.FloatArray(4);
this.FIRST_YEAR_TOTAL=KJE.FloatArray(4);
this.FIVE_YEAR_INTEREST=KJE.FloatArray(4);
this.FIVE_YEAR_PRINCIPAL=KJE.FloatArray(4);
this.FIVE_YEAR_TOTAL=KJE.FloatArray(4);
this.TERM_YEAR_TOTAL=KJE.FloatArray(4);
this.FIVE_YEAR_PAYMENT=KJE.FloatArray(4);
this.TERM_LIST=KJE.FloatArray(4);
this.TOTAL_INTEREST=KJE.FloatArray(4);
this.TOTAL_PAYMENTS=KJE.FloatArray(4);
this.ENDING_BALANCE=KJE.FloatArray(4);
this.HIGHEST_RATE=KJE.FloatArray(4);
this.ADJUST_YEARS="";
this.ADJUST_DIFFERENCE=0;
this.BY_YEAR=true;
this.SAVINGS_IO_FIRST_YEAR=0;
this.SAVINGS_IO_FIVE_YEAR=0;
this.SAVINGS_IO_TERM_YEAR=0;
this.SAVINGS_ARM_FIRST_YEAR=0;
this.SAVINGS_ARM_FIVE_YEAR=0;
this.SAVINGS_ARM_TERM_YEAR=0;
this.SAVINGS_NEG_FIRST_YEAR=0;
this.SAVINGS_NEG_FIVE_YEAR=0;
this.SAVINGS_NEG_TERM_YEAR=0;
this.PRINCIPAL1_ARM_VS_FIXED=0;
this.PRINCIPAL2_ARM_VS_FIXED=0;
this.INTEREST1_ARM_VS_FIXED=0;
this.INTEREST2_ARM_VS_FIXED=0;
this.INTEREST2_NEG_VS_FIXED=0;
this.SAVINGS_IO_MONTH=0;
this.SAVINGS_ARM_MONTH=0;
this.SAVINGS_NEG_MONTH=0;
this.nBalance=KJE.FloatArray(4);
this.nInterest=KJE.FloatArray(4);
this.nPrincipal=KJE.FloatArray(4);
this.nYrInterest=KJE.FloatArray(4);
this.nYrPrincipal=KJE.FloatArray(4);
this.nYrPayment=KJE.FloatArray(4);
this.nPayment=KJE.FloatArray(4);
this.nInterestRate=KJE.FloatArray(this.MONTHLY_PI.length);
this.nNewInterestRate=KJE.FloatArray(this.MONTHLY_PI.length);
var c=(this.SHOW_INTEREST_ONLY&&this.SHOW_PI_ARM&&this.SHOW_FIXED&&this.SHOW_NEG?4:(this.SHOW_INTEREST_ONLY&&this.SHOW_PI_ARM&&this.SHOW_FIXED?3:2));
this.DS_PAYMENTS=new Array(c);
this.DS_PAYMENT_TOTALS=new Array(c);
for(var d=0;
d<c;
d++){this.DS_PAYMENTS[d]=KJE.FloatArray(2);
this.DS_PAYMENT_TOTALS[d]=KJE.FloatArray(2)
}this.sSchedule=new KJE.Repeating()
};
KJE.MortgageArmvsFixedCalc.prototype.clear=function(){this.TERM=0;
this.LOAN_AMOUNT=0;
var d=this.TERM_LIST.length;
for(var c=0;
c<d;
c++){this.TERM_LIST[c]=0
}};
KJE.MortgageArmvsFixedCalc.prototype.calculate=function(an){var aT=KJE;
var ad=this.TERM;
var aM=this.LOAN_AMOUNT;
var ae=this.TERM_LIST;
var aC=this.nBalance;
var aI=this.nInterest;
var aR=this.nPrincipal;
var aw=this.nYrInterest;
var aV=this.nYrPrincipal;
var ar=this.nYrPayment;
var au=this.nPayment;
var ah=this.nInterestRate;
var aP=this.nNewInterestRate;
var n=this.FIRST_YEAR_INTEREST;
var ax=this.FIRST_YEAR_PRINCIPAL;
var aD=this.FIRST_YEAR_TOTAL;
var aj=this.FIVE_YEAR_INTEREST;
var at=this.FIVE_YEAR_PRINCIPAL;
var af=this.FIVE_YEAR_TOTAL;
var aG=this.FIVE_YEAR_PAYMENT;
var aY=this.TERM_YEAR_TOTAL;
var ay=this.TOTAL_INTEREST;
var ak=this.TOTAL_PAYMENTS;
var aJ=this.ENDING_BALANCE;
var aZ=this.HIGHEST_RATE;
var aU=this.INTEREST_RATE;
var ao=this.INTEREST_ONLY;
var i=this.MONTHLY_PI;
var aq=this.MONTH_INTEREST;
var aS=this.MONTH_PRINCIPAL;
var aL=this.LOAN_TYPE;
var aK=this.ADJUSTABLE_RATE;
[];
var aE=this.NEG_AM;
[];
var ac=this.INTEREST_RATE2;
var az=this.PREPAYMENT;
var aN=this.PAYOFF;
[];
var av=this.ADJUSTABLE_RATE_CAP;
var aW=this.ADJUSTABLE_RATE_INCR;
var a0=this.ADJUSTABLE_RATE_FEQ;
[];
var aQ=this.ADJUSTABLE_MONTHS_FIXED;
[];
var aO=this.FIVE_YEAR_TERM;
var ai=aO*12;
if(aO==-1){aO=Math.floor(aQ[1]/12);
if(aO<2){aO=2
}ai=aO*12;
this.MSG_FIVE=KJE.MortgageArmvsFixedCalc.getNumberLabel(aO,true);
this.MSG_FIVE_YEAR_TOTALS=KJE.MortgageArmvsFixedCalc.getNumberLabel(aO,false)+" year totals";
this.MSG_FIVE_YEAR_PAYMENT="Payment after "+KJE.MortgageArmvsFixedCalc.getNumberLabel(aO,true)+" years";
this.cats[1]=KJE.MortgageArmvsFixedCalc.getNumberLabel(aO,false)+" Years"
}var aX=0;
for(var ag=0;
ag<ae.length;
ag++){if(ae[ag]==0){ae[ag]=ad
}if(ae[ag]*12>aX){aX=ae[ag]*12
}}var aH=this.MONTHLY_PI.length;
for(var ag=0;
ag<aH;
ag++){ah[ag]=aU[ag]/1200;
aP[ag]=aU[ag]/100;
aC[ag]=aM;
aR[ag]=0;
aI[ag]=0;
aw[ag]=0;
aV[ag]=0;
ar[ag]=0;
n[ag]=0;
ax[ag]=0;
aD[ag]=0;
aj[ag]=0;
at[ag]=0;
af[ag]=0;
aG[ag]=0;
aY[ag]=0;
ay[ag]=0;
ak[ag]=0;
aJ[ag]=0;
aZ[ag]=ah[ag];
if(ao[ag]){i[ag]=aT.round((ah[ag]*aM),2)
}else{i[ag]=aT.round(KJE.PMT(ah[ag],ae[ag]*12,aM),2)
}aq[ag]=aT.round((ah[ag]*aM),2);
aS[ag]=i[ag]-aq[ag];
au[ag]=i[ag]
}if(an){var aB=this.sSchedule;
aB.clearRepeat();
if(this.BY_YEAR){this.addRegularTitle(aB,aB.sReportCol("Year",7),aB.sReportCol("Payments",1),aB.sReportCol("Balance",2),aB.sReportCol("Interest Only ARM",4),aB.sReportCol(this.ARM,5),aB.sReportCol("Fixed Rate Mortgage",6),aB.sReportCol("Negative Amortization Mortgage",7))
}else{this.addRegularTitle(aB,aB.sReportCol("#",8),aB.sReportCol("Payment",3),aB.sReportCol("Balance",2),aB.sReportCol("Interest Only ARM",4),aB.sReportCol(this.ARM,5),aB.sReportCol("Fixed Rate Mortgage",6),aB.sReportCol("Negative Amortization Mortgage",7))
}this.addRegularRow(aB,"&nbsp;",null,aM,null,aM,null,aM)
}var aF=null;
var al=(aX);
for(var am=1;
am<=al;
am++){for(var ag=0;
ag<aH;
ag++){if(aE[ag]&&(this.NEG_AM_FIXED+1)==am){ah[ag]=ac[ag]/1200;
aP[ag]=ac[ag]/100
}if(((am-aQ[ag])%(a0[ag]==0?1:a0[ag]))==1&&am!=1&&aK[ag]&&am!=ae[ag]*12&&(aW[ag]!=0||aE[ag])&&aQ[ag]<=am){aP[ag]=aP[ag]+aW[ag]/100;
if(aP[ag]>av[ag]/100){aP[ag]=av[ag]/100
}if(aP[ag]<0.02){aP[ag]=0.02
}ah[ag]=aP[ag]/12;
if(ao[ag]){au[ag]=aT.round((ah[ag]*aC[ag]),2)
}else{if(aE[ag]){var aA=au[ag];
au[ag]=aT.round(KJE.PMT(ah[ag],ae[ag]*12-am+1,aC[ag]),2);
if(am<61){if(au[ag]>(aA*(1+(this.NEG_AM_MAX_INCREASE/100)))){au[ag]=aT.round(aA*(1+(this.NEG_AM_MAX_INCREASE/100)),2)
}else{if(au[ag]<(aA*(1-(this.NEG_AM_MAX_INCREASE/100)))){au[ag]=aT.round(aA*(1-(this.NEG_AM_MAX_INCREASE/100)),2)
}}}}else{au[ag]=aT.round(KJE.PMT(ah[ag],ae[ag]*12-am+1,aC[ag]),2)
}}if(aZ[ag]<ah[ag]){aZ[ag]=ah[ag]
}}aI[ag]=aT.round(ah[ag]*aC[ag],2);
if(ao[ag]){if(aC[ag]>0){if(az[ag]>aC[ag]){au[ag]=aC[ag]+aI[ag];
aC[ag]=0;
aR[ag]=aC[ag];
aN[ag]=am
}else{au[ag]=aI[ag]+az[ag];
aC[ag]-=az[ag];
aR[ag]=az[ag]
}}else{au[ag]=0;
aI[ag]=0;
aR[ag]=0
}}else{aR[ag]=au[ag]-aI[ag];
aC[ag]-=aR[ag];
if(aC[ag]==0){au[ag]=0;
aR[ag]=0;
aI[ag]=0
}else{if(aC[ag]<0||(aC[ag]>0.005&&al==am)){aR[ag]+=aC[ag];
aC[ag]=0;
au[ag]=aR[ag]+aI[ag]
}else{if(al==am){aC[ag]=0
}}}}aw[ag]+=aI[ag];
aV[ag]+=aR[ag];
ar[ag]+=au[ag];
ak[ag]+=au[ag];
ay[ag]+=aI[ag];
aY[ag]+=au[ag];
if((am%12)==0){if(am==12){n[ag]=aw[ag];
ax[ag]=aV[ag];
aD[ag]=ar[ag]
}}if(am>0&&am<=ai){}if(am==ai){aG[ag]=au[ag];
aj[ag]+=ay[ag];
af[ag]+=ak[ag];
at[ag]+=af[ag]-aj[ag]
}}if(an){if(!this.BY_YEAR){this.addRegularRow(aB,aT.number(am),(this.SHOW_NEG?au[3]:au[2]),(this.SHOW_NEG?aC[3]:aC[2]),au[1],aC[1],au[0],aC[0])
}else{if(this.BY_YEAR&&(am%12)==0){this.addRegularRow(aB,aT.number(am/12),(this.SHOW_NEG?ar[3]:ar[2]),(this.SHOW_NEG?aC[3]:aC[2]),ar[1],aC[1],ar[0],aC[0])
}}}if((am%12)==0){for(var ag=0;
ag<aw.length;
ag++){aw[ag]=0;
aV[ag]=0;
ar[ag]=0
}}if(aF==null&&(ak[0]<=ak[1])){aF=am
}}this.SAVINGS_IO_FIRST_YEAR=aD[0]-aD[2];
this.SAVINGS_IO_FIVE_YEAR=af[0]-af[2];
this.SAVINGS_IO_TERM_YEAR=aY[0]-aY[2];
this.SAVINGS_ARM_FIRST_YEAR=aD[0]-aD[1];
this.SAVINGS_ARM_FIVE_YEAR=af[0]-af[1];
this.SAVINGS_ARM_TERM_YEAR=aY[0]-aY[1];
if(this.SHOW_NEG){this.SAVINGS_NEG_FIRST_YEAR=aD[0]-aD[3];
this.SAVINGS_NEG_FIVE_YEAR=af[0]-af[3];
this.SAVINGS_NEG_TERM_YEAR=aY[0]-aY[3]
}this.INTEREST1_ARM_VS_FIXED=n[0]-n[1];
this.INTEREST2_ARM_VS_FIXED=aj[0]-aj[1];
this.PRINCIPAL1_ARM_VS_FIXED=ax[1]-ax[0];
this.PRINCIPAL2_ARM_VS_FIXED=at[1]-at[0];
this.SAVINGS_IO_MONTH=i[0]+az[0]-i[2]-az[2];
this.SAVINGS_ARM_MONTH=i[0]+az[0]-i[1]-az[1];
if(this.SHOW_NEG){this.SAVINGS_NEG_MONTH=i[0]+az[0]-i[3]-az[3]
}var am=0;
var ap=af.length;
for(var ag=0;
ag<ap;
ag++){aJ[ag]=aC[ag];
if((this.SHOW_FIXED&&ag==0)||(this.SHOW_PI_ARM&&ag==1)||(this.SHOW_INTEREST_ONLY&&ag==2)||(this.SHOW_NEG&&ag==3)){this.DS_PAYMENT_TOTALS[am][0]=aD[ag];
this.DS_PAYMENT_TOTALS[am][1]=af[ag];
this.DS_PAYMENTS[am][0]=((i[ag]+az[ag]));
this.DS_PAYMENTS[am][1]=(aG[ag]);
am++
}}this.ADJUST_DIFFERENCE=ak[0]-ak[1];
this.ADJUST_YEARS=KJE.getTermLabel(aF);
this.nBreakLength=aF
};
KJE.MortgageArmvsFixedCalc.prototype.formatReport=function(c){for(var d=0;
d<this.TERM_LIST.length;
d++){c.number("TERM_LIST"+(d+1),this.TERM_LIST[d])
}c.replace("MSG_FIVE_YEAR_TOTALS",this.MSG_FIVE_YEAR_TOTALS);
c.replace("MSG_FIVE_YEAR_PAYMENT",this.MSG_FIVE_YEAR_PAYMENT);
for(var d=0;
d<this.MONTHLY_PI.length-(this.SHOW_NEG?0:1);
d++){c.dollars("MONTHLY_PI"+d,this.MONTHLY_PI[d]+this.PREPAYMENT[d]);
c.loanRate("INTEREST_RATE"+d,this.INTEREST_RATE[d]/100);
c.number("ADJUSTABLE_RATE_FEQ"+d,this.ADJUSTABLE_RATE_FEQ[d]);
c.percent("ADJUSTABLE_RATE_INCR"+d,this.ADJUSTABLE_RATE_INCR[d]/100,2);
c.percent("ADJUSTABLE_RATE_CAP"+d,this.ADJUSTABLE_RATE_CAP[d]/100,3);
c.yesno("ADJUSTABLE_RATE"+d,this.ADJUSTABLE_RATE[d]);
c.yesno("INTEREST_ONLY"+d,this.INTEREST_ONLY[d]);
c.replace("LOAN_TYPE"+d,this.LOAN_TYPE[d]);
c.number("ADJUSTABLE_MONTHS_FIXED"+d,this.ADJUSTABLE_MONTHS_FIXED[d]);
c.dollars("PREPAYMENT"+d,this.PREPAYMENT[d]);
c.dollars("MONTH_INTEREST"+d,this.MONTH_INTEREST[d]);
c.dollars("MONTH_PRINCIPAL"+d,this.MONTH_PRINCIPAL[d]);
c.dollars("FIRST_YEAR_INTEREST"+d,this.FIRST_YEAR_INTEREST[d]);
c.dollars("FIRST_YEAR_PRINCIPAL"+d,this.FIRST_YEAR_PRINCIPAL[d]);
c.dollars("FIRST_YEAR_TOTAL"+d,this.FIRST_YEAR_TOTAL[d]);
c.dollars("FIVE_YEAR_INTEREST"+d,this.FIVE_YEAR_INTEREST[d]);
c.dollars("FIVE_YEAR_PRINCIPAL"+d,this.FIVE_YEAR_PRINCIPAL[d]);
c.dollars("FIVE_YEAR_TOTAL"+d,this.FIVE_YEAR_TOTAL[d]);
c.dollars("FIVE_YEAR_PAYMENT"+d,this.FIVE_YEAR_PAYMENT[d]);
c.dollars("TOTAL_INTEREST"+d,this.TOTAL_INTEREST[d]);
c.dollars("TOTAL_PAYMENTS"+d,this.TOTAL_PAYMENTS[d]);
c.dollars("ENDING_BALANCE"+d,this.ENDING_BALANCE[d]);
c.loanRate("HIGHEST_RATE"+d,this.HIGHEST_RATE[d]*12);
if(this.PAYOFF[d]>0){c.replace("MSG_PAYOFF"+d,KJE.getTermLabel(this.PAYOFF[d],true))
}else{c.replace("MSG_PAYOFF"+d,KJE.number(this.TERM_LIST[d])+" "+this.MSG_YEARS_LBL)
}c.replace("MSG_FINAL_PAYOFF"+d,KJE.dollars(this.ENDING_BALANCE[d])+" after "+(this.PAYOFF[d]>0?KJE.getTermLabel(this.PAYOFF[d],true):KJE.number(this.TERM)+" "+this.MSG_YEARS_LBL))
}c.dollars("LOAN_AMOUNT",this.LOAN_AMOUNT);
c.dollars("SAVINGS_IO_FIRST_YEAR",this.SAVINGS_IO_FIRST_YEAR);
c.dollars("SAVINGS_IO_FIVE_YEAR",this.SAVINGS_IO_FIVE_YEAR);
c.dollars("SAVINGS_IO_TERM_YEAR",this.SAVINGS_IO_TERM_YEAR);
c.dollars("SAVINGS_ARM_FIRST_YEAR",this.SAVINGS_ARM_FIRST_YEAR);
c.dollars("SAVINGS_ARM_FIVE_YEAR",this.SAVINGS_ARM_FIVE_YEAR);
c.dollars("SAVINGS_ARM_TERM_YEAR",this.SAVINGS_ARM_TERM_YEAR);
c.dollars("SAVINGS_NEG_FIRST_YEAR",this.SAVINGS_NEG_FIRST_YEAR);
c.dollars("SAVINGS_NEG_FIVE_YEAR",this.SAVINGS_NEG_FIVE_YEAR);
c.dollars("SAVINGS_NEG_TERM_YEAR",this.SAVINGS_NEG_TERM_YEAR);
c.dollars("PRINCIPAL1_ARM_VS_FIXED",this.PRINCIPAL2_ARM_VS_FIXED);
c.dollars("PRINCIPAL2_ARM_VS_FIXED",this.PRINCIPAL2_ARM_VS_FIXED);
c.dollars("INTEREST1_ARM_VS_FIXED",this.INTEREST1_ARM_VS_FIXED);
c.dollars("INTEREST2_ARM_VS_FIXED",this.INTEREST2_ARM_VS_FIXED);
c.replace("BREAK_EVEN_NOTE",(this.ADJUST_DIFFERENCE>0?this.BREAK_EVEN_NOTE[0]:(this.nBreakLength>1?this.BREAK_EVEN_NOTE[1]:this.BREAK_EVEN_NOTE[2])));
c.dollars("SAVINGS_IO_MONTH",this.SAVINGS_IO_MONTH);
c.dollars("SAVINGS_ARM_MONTH",this.SAVINGS_ARM_MONTH);
c.dollars("SAVINGS_NEG_MONTH",this.SAVINGS_NEG_MONTH);
c.dollars("ADJUST_DIFFERENCE",this.ADJUST_DIFFERENCE);
c.replace("ADJUST_YEARS",this.ADJUST_YEARS);
c.number("TERM",this.TERM);
c.number("NEG_AM_FIXED",this.NEG_AM_FIXED);
c.percent("NEG_AM_MAX_INCREASE",this.NEG_AM_MAX_INCREASE/100,2);
c.loanRate("NEG_AM_NON_TEASER",this.INTEREST_RATE2[3]/100);
c.replace("MSG_FIVE_LOWER",this.MSG_FIVE.toLowerCase());
c.replace("MSG_FIVE",this.MSG_FIVE);
c.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.MortgageArmvsFixedCalc.prototype.addRegularTitle=function(t,l,m,n,o,p,q,r){var i=new Array(4);
var s=0;
i[s++]=l;
if(this.SHOW_FIXED){i[s++]={sCell:KJE._sHeadingUnderline,sContent:q,sFormat:"COLSPAN=2"}
}if(this.SHOW_PI_ARM&&!this.SHOW_NEG){i[s++]={sCell:KJE._sHeadingUnderline,sContent:p,sFormat:"COLSPAN=2"}
}if(this.SHOW_INTEREST_ONLY&&!this.SHOW_NEG){i[s++]={sCell:KJE._sHeadingUnderline,sContent:o,sFormat:"COLSPAN=2"}
}if(this.SHOW_NEG){i[s]={sCell:KJE._sHeadingUnderline,sContent:r,sFormat:"COLSPAN=2"}
}t.addHeader("&nbsp;",i[1],i[2],i[3]);
i=new Array(7);
s=0;
i[s++]=l;
if(this.SHOW_FIXED){i[s++]=m;
i[s++]=n
}if(this.SHOW_PI_ARM&&!this.SHOW_NEG){i[s++]=m;
i[s++]=n
}if(this.SHOW_INTEREST_ONLY||this.SHOW_NEG){i[s++]=m;
i[s]=n
}t.addHeader(i[0],i[1],i[2],i[3],i[4],i[5],i[6],i[7])
};
KJE.MortgageArmvsFixedCalc.prototype.addRegularRow=function(s,t,l,o,m,p,n,q){var i=new Array(7);
var r=0;
i[r++]=t;
if(this.SHOW_FIXED){i[r++]=(n?KJE.dollars(n,2):"&nbsp;");
i[r++]=KJE.dollars(q,2)
}if(this.SHOW_PI_ARM&&!this.SHOW_NEG){i[r++]=(n?KJE.dollars(m,2):"&nbsp;");
i[r++]=KJE.dollars(p,2)
}if(this.SHOW_INTEREST_ONLY||this.SHOW_NEG){i[r++]=(n?KJE.dollars(l,2):"&nbsp;");
i[r]=KJE.dollars(o,2)
}s.addRepeat(i[0],i[1],i[2],i[3],i[4],i[5],i[6],i[7])
};
KJE.MortgageArmvsFixedCalc.getNumberLabel=function(d,e){var f=(d==0?"":(d<=KJE.Default.sNumbers.length?KJE.Default.sNumbers[d-1]:KJE.number(d)));
if(e){f=f.toLowerCase()
}return f
};
KJE.Default.sNumbers=["One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
KJE.CalcName="ARM vs. Fixed-Rate Mortgage";
KJE.CalcType="MortgageArmvsFixed2";
KJE.CalculatorTitle="ARM vs. Fixed Rate Mortgage";
KJE.parseInputs=function(b){b=KJE.replace("**TERM**",KJE.getMortgageTermDrop("TERM",30),b);
return b
};
KJE.initialize=function(){KJE.CalcControl=new KJE.MortgageArmvsFixedCalc();
KJE.GuiControl=new KJE.MortgageArmvsFixed(KJE.CalcControl)
};
KJE.MortgageArmvsFixed=function(l){var x=KJE;
var B=KJE.gLegend;
var v=KJE.inputs.items;
this.ARM_ADJUST_ANNUALLY=KJE.parameters.get("ARM_ADJUST_ANNUALLY",false);
this.ARM_ADJUST_AT_MONTHS_FIXED=KJE.parameters.get("ARM_ADJUST_AT_MONTHS_FIXED",false);
this.SHOW_ARM_FIELDS=KJE.parameters.get("SHOW_ARM_FIELDS",true);
this.SHOW_PREPAYMENT=KJE.parameters.get("SHOW_PREPAYMENT",false);
l.ADJUSTABLE_RATE[0]=false;
l.INTEREST_ONLY[0]=false;
l.LOAN_TYPE[0]=l.FIXED;
l.ADJUSTABLE_RATE[1]=true;
l.INTEREST_ONLY[1]=false;
l.LOAN_TYPE[1]=l.ARM;
l.ADJUSTABLE_RATE[2]=true;
l.INTEREST_ONLY[2]=true;
l.LOAN_TYPE[2]=l.IO;
KJE.parameters.getSet("MSG_INTEREST_RATE1","Interest rate");
for(var s=0;
s<3;
s++){KJE.InputItem.AltHelpName="INTEREST_RATE";
KJE.PercentSlider("INTEREST_RATE"+(s+1),"Initial interest rate",1,25,3);
if(l.ADJUSTABLE_RATE[s]){KJE.InputItem.AltHelpName="ADJUSTABLE_RATE_CAP";
KJE.PercentSlider("ADJUSTABLE_RATE_CAP"+(s+1),"Interest rate cap",5,25,3);
KJE.InputItem.AltHelpName="ADJUSTABLE_RATE_INCR";
KJE.PercentSlider("ADJUSTABLE_RATE_INCR"+(s+1),"Expected Adjustment",-3,3,2);
KJE.InputItem.AltHelpName="ADJUSTABLE_RATE_FEQ";
KJE.NumberSlider("ADJUSTABLE_RATE_FEQ"+(s+1),"Adjustment frequency",1,12,0);
if(this.ARM_ADJUST_ANNUALLY||this.ARM_ADJUST_AT_MONTHS_FIXED){v["ADJUSTABLE_RATE_FEQ"+(s+1)].hide()
}KJE.InputItem.AltHelpName="ADJUSTABLE_MONTHS_FIXED";
KJE.NumberSlider("ADJUSTABLE_MONTHS_FIXED"+(s+1),"Months rate fixed",1,360,0)
}if(s>0&&this.SHOW_PREPAYMENT){KJE.InputItem.AltHelpName="PREPAYMENT";
KJE.DollarSlider("PREPAYMENT"+(s+1),"Prepayment",0,50000,0,0,7)
}}KJE.InputItem.AltHelpName=null;
KJE.MortgageAmtSlider("LOAN_AMOUNT","Mortgage amount");
KJE.MortgageTermDropBoxSlider("TERM","Term in years");
KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","Monthly");
var u=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Monthly Payment by Mortgage Type"));
u._showItemLabel=true;
u._legend._iOrientation=B.TOP_RIGHT;
var C=KJE.parameters.get("MSG_DROPPER_TITLE","Fixed Rate Mortgage:");
var z=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Monthly payment KJE1");
var y=function(){return C+"|"+KJE.subText(KJE.getKJEReplaced(z,x.dollars(l.MONTHLY_PI[0],2)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,y,y),KJE.colorList[0]);
if(KJE.parameters.get("SHOW_THREE_LOANS",true)){var i=KJE.parameters.get("MSG_DROPPER2_TITLE","Fully Amortizing ARM:");
var w=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE","Initial payment KJE1");
var r=function(){return i+"|"+KJE.subText(KJE.getKJEReplaced(w,x.dollars(l.MONTHLY_PI[1],2)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS2",false,r,r),KJE.colorList[0])
}if(l.SHOW_INTEREST_ONLY){var D=KJE.parameters.get("MSG_DROPPER3_TITLE","Interest only ARM:");
var A=KJE.parameters.get("MSG_DROPPER3_CLOSETITLE","Initial payment KJE1");
var t=function(){return D+"|"+KJE.subText(KJE.getKJEReplaced(A,x.dollars(l.MONTHLY_PI[2]+l.PREPAYMENT[2],2)),"KJERightBold")
};
KJE.addDropper(new KJE.Dropper("INPUTS3",false,t,t),KJE.colorList[0])
}};
KJE.MortgageArmvsFixed.prototype.setValues=function(f){var e=KJE.inputs.items;
for(var d=0;
d<3;
d++){f.INTEREST_RATE[d]=e["INTEREST_RATE"+(d+1)].getValue();
if(f.ADJUSTABLE_RATE[d]){f.ADJUSTABLE_RATE_CAP[d]=e["ADJUSTABLE_RATE_CAP"+(d+1)].getValue();
f.ADJUSTABLE_RATE_INCR[d]=e["ADJUSTABLE_RATE_INCR"+(d+1)].getValue();
f.ADJUSTABLE_MONTHS_FIXED[d]=e["ADJUSTABLE_MONTHS_FIXED"+(d+1)].getValue();
if(this.ARM_ADJUST_AT_MONTHS_FIXED){f.ADJUSTABLE_RATE_FEQ[d]=f.ADJUSTABLE_MONTHS_FIXED[d]
}else{if(this.ARM_ADJUST_ANNUALLY){f.ADJUSTABLE_RATE_FEQ[d]=12
}else{f.ADJUSTABLE_RATE_FEQ[d]=e["ADJUSTABLE_RATE_FEQ"+(d+1)].getValue()
}}if(d>0&&this.SHOW_PREPAYMENT){f.PREPAYMENT[d]=e["PREPAYMENT"+(d+1)].getValue()
}}}f.TERM=Math.round(e.TERM.getValue());
f.LOAN_AMOUNT=e.LOAN_AMOUNT.getValue();
f.BY_YEAR=e.BY_YEAR.getValue()
};
KJE.MortgageArmvsFixed.prototype.refresh=function(h){var i=KJE;
var f=KJE.inputs.items;
var g=KJE.gGraphs[0];
g.removeAll();
g.setGraphCategories(h.cats);
for(var j=0;
j<h.DS_PAYMENTS.length;
j++){g.add(new KJE.gGraphDataSeries(h.DS_PAYMENTS[j],h.LOAN_TYPE[j],g.getColor(j+1)))
}g.paint()
};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-LOAN_AMOUNT'><input id='KJE-LOAN_AMOUNT' /></div> <div id='KJE-C-TERM'>**TERM**</div> <div id='KJE-C-INTEREST_RATE1'><input id='KJE-INTEREST_RATE1' /></div> <div id='KJE-C-BY_YEAR'><fieldset id='KJE-FS-BY_YEAR'><input id='KJE-BY_YEAR1' type=radio name=BY_YEAR /><input id='KJE-BY_YEAR2' type=radio name=BY_YEAR /></fieldset></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-INTEREST_RATE2'><input id='KJE-INTEREST_RATE2' /></div> <div id='KJE-C-ADJUSTABLE_MONTHS_FIXED2'><input id='KJE-ADJUSTABLE_MONTHS_FIXED2' /></div> <div id='KJE-C-ADJUSTABLE_RATE_FEQ2'><input id='KJE-ADJUSTABLE_RATE_FEQ2' /></div> <div id='KJE-C-ADJUSTABLE_RATE_INCR2'><input id='KJE-ADJUSTABLE_RATE_INCR2' /></div> <div id='KJE-C-ADJUSTABLE_RATE_CAP2'><input id='KJE-ADJUSTABLE_RATE_CAP2' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=' <div id="KJE-D-FIXED_RATE_MORTGAGE"><dt>Fixed Rate Mortgage</dt><dd>A fixed-rate mortgage has the same interest rate and monthly payment throughout the term of the mortgage.</dd></div> <div id="KJE-D-ARM"><dt>Fully Amortizing ARM</dt><dd>This calculator shows a "fully amortizing" ARM, which is the most common type of ARM. The monthly payment is calculated to pay off the entire mortgage balance at the end of a 30-year term. After the initial period, the interest rate and monthly payment adjust at the frequency specified. The amount an ARM can adjust each year, and over the life of the loan, are typically capped. Below is a list of common ARMs. <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Common Adjustable Rate Mortgages</caption> <thead class="KJEReportTHeader"> <tr class="KJEHeaderRow"><th class="KJEHeading KJECell40" scope="col">ARM Type</th><th class="KJEHeading KJECell60" scope="col">Months Fixed</th></tr> </thead> <tbody class="KJEReportTBody"> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">10/1 ARM</th><td class="KJECell KJELeft">Fixed for 120 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">7/1 ARM</th><td class="KJECell KJELeft">Fixed for 84 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">5/1 ARM</th><td class="KJECell KJELeft">Fixed for 60 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">3/1 ARM</th><td class="KJECell KJELeft">Fixed for 36 months, adjusts annually for the remaining term of the loan.</td></tr> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">10/6 month ARM</th><td class="KJECell KJELeft">Fixed for 120 months, adjusts every six months for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">7/6 month ARM</th><td class="KJECell KJELeft">Fixed for 84 months, adjusts every six months for the remaining term of the loan.</td></tr> <tr class="KJEEvenRow"><th class="KJECellBorder KJELabel" scope="row">5/6 month ARM</th><td class="KJECell KJELeft">Fixed for 60 months, adjusts every six months for the remaining term of the loan.</td></tr> <tr class="KJEOddRow"><th class="KJECellBorder KJELabel" scope="row">3/6 month ARM</th><td class="KJECell KJELeft">Fixed for 36 months, adjusts every six months for the remaining term of the loan.</td></tr> </tbody> </table></div> </dd> </div> <div id=\'KJE-D-LOAN_AMOUNT\' ><dt>Mortgage amount</dt><dd>Original or expected balance for your mortgage.</dd></div> <div id=\'KJE-D-TERM\' ><dt>Term in years</dt><dd>The number of years over which you will repay this loan. Common fixed-rate mortgage terms are 15, 20 and 30 years.</dd></div> <div id=\'KJE-D-ADJUSTABLE_RATE_INCR\' ><dt>Expected adjustment</dt><dd>The annual adjustment you expect in your ARM, after the initial period ends. The range for this calculator is minus 3% to plus 3%. Use a negative value if you believe interest rates will decrease, a positive value if you believe they will increase.</dd></div> <div id=\'KJE-D-INTEREST_RATE\' ><dt>Interest rate</dt><dd>Annual interest rate for each mortgage type. Typically an ARM will have a lower initial interest rate than a fixed-rate mortgage. Please note that the interest rate is different from the Annual Percentage Rate (APR), which includes other expenses such as mortgage insurance, and the origination fee and or point(s), which were paid when the mortgage was first originated. The APR is normally higher than the simple interest rate.</dd></div> <div id=\'KJE-D-ADJUSTABLE_MONTHS_FIXED\' ><dt>Months rate fixed</dt><dd>This is the number of months the rate is fixed for an ARM. During this period the interest rate and the monthly payment will remain fixed. The rate will then adjust annually by the amount entered in the "Expected Adjustment" field.</dd></div> <div id=\'KJE-D-ADJUSTABLE_RATE_FEQ\' ><dt>Months between adjustments</dt><dd>The number of payment periods between potential adjustments to your interest rate. The most common is 12 months, which means your payment could change at most once per year. Loans using the SOFR benchmark have six months between adjustments. The SOFR benchmark is based on what U.S. financial institutions pay each other for overnight loans. It is often used as a replacement for the LIBOR benchmark which is no longer used.</dd></div> <div id=\'KJE-D-ADJUSTABLE_RATE_CAP\' ><dt>Interest rate cap</dt><dd>This is the highest allowable interest rate for your mortgage. Your interest rate can never be adjusted above this rate.</dd></div> <div id=\'KJE-D-MONTHLY_PAYMENT\' ><dt>Monthly payment</dt><dd>Monthly principal and interest payment (PI) for the fixed-rate mortgage and the fully amortizing ARM.</dd></div> ';
KJE.ReportText=' <!--HEADING "ARM vs. Fixed Rate Mortgage Results" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>A Fully Amortizing ARM could save you an estimated SAVINGS_ARM_MONTH per month during the initial period.</h2> A LOAN_AMOUNT Fixed Rate Mortgage with a term of TERM years at INTEREST_RATE0 has a monthly payment of MONTHLY_PI0. If you were to finance this mortgage with a Fully Amortizing ARM at INTEREST_RATE1 the monthly payment would be MONTHLY_PI1, saving you SAVINGS_ARM_MONTH per month. <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>ARM vs. Fixed Rate Mortgage</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder KJECell50" scope=\'row\'>Initial savings on monthly payment</th><td class="KJECell KJECell50">SAVINGS_ARM_MONTH</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Payment savings first year</th><td class="KJECell">SAVINGS_ARM_FIRST_YEAR</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Payment savings for MSG_FIVE years</th><td class="KJECell">SAVINGS_ARM_FIVE_YEAR</td></tr> </tbody> </table> </div> **GRAPH** BREAK_EVEN_NOTE <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><td class="KJEHeading KJECell40">&nbsp;</td><th class="KJEHeading KJECell30" scope=\'col\'>Fixed Rate Mortgage</th><th class="KJEHeading KJECell30" scope=\'col\'>Fully Amortizing ARM</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder KJECell40" scope=\'row\'>Loan amount</th><td class="KJECell KJECellBorder KJECell30" >LOAN_AMOUNT</td><td class="KJECell KJECell30" >LOAN_AMOUNT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term</th><td class="KJECell KJECellBorder" >TERM years</td><td class="KJECell" >TERM years</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder " VALIGN=top scope=\'row\'>Interest rate</th><td class="KJECell KJECellBorder" VALIGN=top>INTEREST_RATE0</td><td class="KJECell" VALIGN=top>INTEREST_RATE1<br>Rate is fixed for ADJUSTABLE_MONTHS_FIXED1 months and then is adjusted by ADJUSTABLE_RATE_INCR1 every ADJUSTABLE_RATE_FEQ1 months, up to a maximum of ADJUSTABLE_RATE_CAP1. The highest rate actually charged was HIGHEST_RATE1.</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Initial monthly payment</th><td class="KJECell KJECellBorder" >MONTHLY_PI0</td><td class="KJECell" >MONTHLY_PI1</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>MSG_FIVE_YEAR_PAYMENT</th><td class="KJECell KJECellBorder" >FIVE_YEAR_PAYMENT0</td><td class="KJECell" >FIVE_YEAR_PAYMENT1</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'><br>First year totals:</th><td class="KJECell KJECellBorder">&nbsp;</td><td class="KJECell">&nbsp;</td></tr> <tr class=KJEOddRow><td class="KJECell KJECellBorder" scope=\'row\'>&nbsp;&nbsp;Interest<br>&nbsp;&nbsp;Principal<br>&nbsp;&nbsp;Payments<br><br></td><td class="KJECell KJECellBorder" >FIRST_YEAR_INTEREST0<br>FIRST_YEAR_PRINCIPAL0<br>FIRST_YEAR_TOTAL0</td><td class="KJECell" >FIRST_YEAR_INTEREST1<br>FIRST_YEAR_PRINCIPAL1<br>FIRST_YEAR_TOTAL1</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'><br>MSG_FIVE_YEAR_TOTALS:</th><td class="KJECell KJECellBorder">&nbsp;</td><td class="KJECell">&nbsp;</td></tr> <tr class=KJEEvenRow><td class="KJECell KJECellBorder" scope=\'row\'>&nbsp;&nbsp;Interest<br>&nbsp;&nbsp;Principal<br>&nbsp;&nbsp;Payments<br><br></td><td class="KJECell KJECellBorder" >FIVE_YEAR_INTEREST0<br>FIVE_YEAR_PRINCIPAL0<br>FIVE_YEAR_TOTAL0</td><td class="KJECell" >FIVE_YEAR_INTEREST1<br>FIVE_YEAR_PRINCIPAL1<br>FIVE_YEAR_TOTAL1</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total for TERM years of interest</th><td class="KJECellStrong KJECellBorder" >TOTAL_INTEREST0</td><td class="KJECellStrong" >TOTAL_INTEREST1</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total for TERM years of payments</th><td class="KJECellStrong KJECellBorder" >TOTAL_PAYMENTS0</td><td class="KJECellStrong" >TOTAL_PAYMENTS1</td></tr> </tfoot> </table></div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';
KJE.parameters.set("ADJUSTABLE_MONTHS_FIXED2",12);
KJE.parameters.set("ADJUSTABLE_RATE_CAP2",12);
KJE.parameters.set("ADJUSTABLE_RATE_FEQ2",12);
KJE.parameters.set("ADJUSTABLE_RATE_INCR2",0.25);
KJE.parameters.set("INTEREST_RATE1",KJE.Default.RateFix30);
KJE.parameters.set("INTEREST_RATE2",KJE.Default.RateAdj);
KJE.parameters.set("LOAN_AMOUNT",KJE.Default.MortgageAmt);
KJE.parameters.set("TERM",30);