KJE.SocialSecurityCalc=function(){this.iDecimal=0;
this.ADJUST_ONLY=false;
this.SOCIAL_SECURITY_CURRENT_MAX=168600;
this.SOCIAL_SECURITY_AP_MAX=45864;
this.SOCIAL_SECURITY_MAX_RATIO=0.2697;
this.SOCIAL_EARLIEST_RETIRE_AGE=KJE.SocialSecurityCalc.SOCIAL_EARLIEST_RETIRE_AGE;
this.SOCIAL_NORMAL_RETIRE_AGE=67;
this.SOCIAL_LATEST_RETIRE_AGE=70;
this.EARLY_DISCOUNTS=[0.7,0.75,0.8,0.86666,0.93333,1];
this.EARLY_AGE_CUTOFFS=[79,66,0];
this.AGE_FULL_BENEFITS=[65,66,67];
this.LATE_AGE_CUTOFFS=[72,0];
this.LATE_AGE_INCREASES=[0.075,0.08];
this.SOCIAL_SPOUSE_BENEFIT=0.5;
this.SOCIAL_FULL_BENEFIT_AMT=0;
this.cats=null;
this.DS_SOCIAL_PAYMENTS=null;
this.DR_SOCIAL_PAYMENTS=null;
this.MSG_SUMMARY_TEXT=KJE.parameters.get("MSG_SUMMARY_TEXT","Social Security may provide KJE1");
this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Estimated Monthly Benefits");
this.MSG_SUMMARY_TEXT2=KJE.parameters.get("MSG_SUMMARY_TEXT2","If you start collecting your benefits at age KJE2 you could receive approximately KJE3 per year or KJE4 per month. This is KJE5 of your final year's income of KJE6. This is only an estimate. Actual benefits depend on work history and the complete compensation rules used by Social Security.");
this.SUMMARY_TEXT="";
this.SUMMARY_TEXT2="";
this.WAGE_CUTOFFS=[10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,this.SOCIAL_SECURITY_CURRENT_MAX];
this.SOCIAL_FULL_BENEFIT=[0.7056,0.6024,0.4852,0.4266,0.3914,0.368,0.3514,0.3389,0.3291,0.312,0.2943,0.2796,this.SOCIAL_SECURITY_MAX_RATIO];
this.sSchedule=new KJE.Repeating()
};
KJE.SocialSecurityCalc.prototype.clear=function(){this.CURRENT_AGE=0;
this.HOUSEHOLD_INCOME=0;
this.SALARY_PERCENT=0;
this.SOCIAL_SECURITY_INCREASE_RATE=0;
this.MARRIED=0;
this.AGE_OF_RETIREMENT=0
};
KJE.SocialSecurityCalc.prototype.calculate=function(P){var ah=KJE;
var ae=this.CURRENT_AGE;
var V=this.HOUSEHOLD_INCOME;
var al=this.SALARY_PERCENT;
var Z=this.SOCIAL_SECURITY_INCREASE_RATE;
var ac=this.MARRIED;
var N=this.AGE_OF_RETIREMENT;
var p=0;
var ak=0;
var ab=0;
var W=0;
var i=0;
var an=0;
var X=65;
var Y=0;
var am=0;
var R=0;
var aa=0;
var U=Z/100;
if(N<this.SOCIAL_EARLIEST_RETIRE_AGE){W=this.SOCIAL_EARLIEST_RETIRE_AGE
}else{W=N
}for(var O=0;
O<this.EARLY_AGE_CUTOFFS.length;
O++){if(this.EARLY_AGE_CUTOFFS[O]<ae){X=this.AGE_FULL_BENEFITS[O];
break
}}for(O=0;
O<this.LATE_AGE_CUTOFFS.length;
O++){if(ae>=this.LATE_AGE_CUTOFFS[O]){R=this.LATE_AGE_INCREASES[O];
break
}}if(!this.ADJUST_ONLY){this.SOCIAL_FULL_BENEFIT_AMT=0;
am=X-ae;
var ai=am-1;
ai=(ai<0?0:ai);
ak=ah.round(KJE.FV_AMT(U,ai,this.SOCIAL_SECURITY_CURRENT_MAX),2);
this.WAGE_CUTOFFS[this.WAGE_CUTOFFS.length-1]=this.SOCIAL_SECURITY_CURRENT_MAX;
p=KJE.FV_AMT(al/100,ai,V);
var T=p;
this.SOCIAL_FULL_BENEFIT_PERCENT=(this.SOCIAL_FULL_BENEFIT[this.SOCIAL_FULL_BENEFIT.length-1]*ak)/T;
for(var Q=0;
Q<this.WAGE_CUTOFFS.length;
Q++){if(T<KJE.FV_AMT(U,ai,this.WAGE_CUTOFFS[Q])){if(Q==0){this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT[Q]
}else{var aj=KJE.FV_AMT(U,ai,this.WAGE_CUTOFFS[Q]);
var af=KJE.FV_AMT(U,ai,this.WAGE_CUTOFFS[Q-1]);
var S=aj-af;
var L=aj-T;
var M=L/S;
this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT[Q]+(this.SOCIAL_FULL_BENEFIT[Q-1]-this.SOCIAL_FULL_BENEFIT[Q])*M
}break
}}if(ac>0){this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT_PERCENT*(1+this.SOCIAL_SPOUSE_BENEFIT)
}this.SOCIAL_FULL_BENEFIT_AMT=ah.round(this.SOCIAL_FULL_BENEFIT_PERCENT*T,0);
if(ac>0){this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT_AMT/p
}}var ad=this.SOCIAL_LATEST_RETIRE_AGE-this.SOCIAL_EARLIEST_RETIRE_AGE+1;
this.cats=new Array(ad);
this.DS_SOCIAL_PAYMENTS=new Array(ad);
this.DR_SOCIAL_PAYMENTS=new Array(ad);
for(O=0;
O<ad;
O++){this.cats[O]=ah.number(this.SOCIAL_EARLIEST_RETIRE_AGE+O);
if(this.SOCIAL_EARLIEST_RETIRE_AGE+O<=X){this.DR_SOCIAL_PAYMENTS[O]=ah.round(this.SOCIAL_FULL_BENEFIT_AMT*this.EARLY_DISCOUNTS[O+this.SOCIAL_NORMAL_RETIRE_AGE-X],0)
}else{this.DR_SOCIAL_PAYMENTS[O]=ah.round(this.SOCIAL_FULL_BENEFIT_AMT*(1+R*(this.SOCIAL_EARLIEST_RETIRE_AGE-X+O)),0)
}if(W==(this.SOCIAL_EARLIEST_RETIRE_AGE+O)){var n=(W-ae-1);
aa=KJE.FV_AMT(al/100,n<0?0:n,V);
an=this.DR_SOCIAL_PAYMENTS[O]/aa;
ab=this.DR_SOCIAL_PAYMENTS[O];
i=this.DR_SOCIAL_PAYMENTS[O]/12
}}if(P){var ag=this.sSchedule;
ag.clearRepeat();
ag.addHeader(ag.sReportCol("Age<br />Benefits Begin",1),ag.sReportCol("Amount<br />per Month",2),ag.sReportCol("Amount<br />per Year",3))
}var K=0;
for(O=1;
O<=ad;
O++){K=O-1;
this.DS_SOCIAL_PAYMENTS[K]=this.DR_SOCIAL_PAYMENTS[K]/12;
if(P){ag.addRepeat(ah.number(K+this.SOCIAL_EARLIEST_RETIRE_AGE,0),ah.dollars(this.DR_SOCIAL_PAYMENTS[K]/12),ah.dollars(this.DR_SOCIAL_PAYMENTS[K]))
}}this.FUTURE_HOUSEHOLD_INCOME=p;
this.SOCIAL_SECURITY_MAX=ak;
this.SOCIAL_AT_RETIRE_AMT=ab;
this.SOCIAL_AT_RETIRE_AGE=W;
this.SOCIAL_AT_RETIRE_AMT_MONTHLY=i;
this.SOCIAL_AT_RETIRE_PERCENT=an;
this.SOCIAL_FULL_BENEFIT_AGE=X;
this.SOCIAL_FULL_BENEFIT_PERCENT=Y;
this.YEARS_UNTIL_SOCIAL_FULL_BENEFITS=am;
this.SOCIAL_DELAYED_RETIRE_PERCENT=R;
this.HOUSEHOLD_INCOME_AT_RETIRE=aa
};
KJE.SocialSecurityCalc.prototype.formatReport=function(b){b.dollars("FUTURE_HOUSEHOLD_INCOME",this.FUTURE_HOUSEHOLD_INCOME);
b.dollars("HOUSEHOLD_INCOME_AT_RETIRE",this.HOUSEHOLD_INCOME_AT_RETIRE);
b.dollars("SOCIAL_SECURITY_MAX",this.SOCIAL_SECURITY_MAX);
b.number("SOCIAL_AT_RETIRE_AGE",this.SOCIAL_AT_RETIRE_AGE);
b.dollars("SOCIAL_AT_RETIRE_AMT_MONTHLY",this.SOCIAL_AT_RETIRE_AMT_MONTHLY);
b.dollars("SOCIAL_AT_RETIRE_AMT",this.SOCIAL_AT_RETIRE_AMT);
b.percent("SOCIAL_AT_RETIRE_PERCENT",this.SOCIAL_AT_RETIRE_PERCENT,2);
b.dollars("SOCIAL_FULL_BENEFIT_AMT",this.SOCIAL_FULL_BENEFIT_AMT);
b.number("SOCIAL_FULL_BENEFIT_AGE",this.SOCIAL_FULL_BENEFIT_AGE);
b.percent("SOCIAL_FULL_BENEFIT_PERCENT",this.SOCIAL_FULL_BENEFIT_PERCENT,2);
b.year("YEARS_UNTIL_SOCIAL_FULL_BENEFITS",this.YEARS_UNTIL_SOCIAL_FULL_BENEFITS);
b.age("CURRENT_AGE",this.CURRENT_AGE);
b.dollars("HOUSEHOLD_INCOME",this.HOUSEHOLD_INCOME);
b.percent("SALARY_PERCENT",this.SALARY_PERCENT/100,2);
b.yesno("MARRIED",this.MARRIED);
b.age("AGE_OF_RETIREMENT",this.AGE_OF_RETIREMENT);
b.dollars("SOCIAL_SECURITY_CURRENT_MAX",this.SOCIAL_SECURITY_CURRENT_MAX);
b.percent("SOCIAL_SECURITY_INCREASE_RATE",this.SOCIAL_SECURITY_INCREASE_RATE/100,2);
b.inflationRate("INFLATION_RATE",this.SOCIAL_SECURITY_INCREASE_RATE/100);
b.number("SOCIAL_EARLIEST_RETIRE_AGE",this.SOCIAL_EARLIEST_RETIRE_AGE);
b.number("SOCIAL_LATEST_RETIRE_AGE",this.SOCIAL_LATEST_RETIRE_AGE);
b.percent("SOCIAL_DELAYED_RETIRE_PERCENT",this.SOCIAL_DELAYED_RETIRE_PERCENT,2);
b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.SocialSecurityCalc.prototype.formatGraph=function(d,c){c[0].setTitle(this.MSG_GRAPH3);
c[0].setTitleGraph(this.MSG_GRAPH3);
c[0].show(true);
c[0].paint()
};
KJE.definitions.getSet("**SS_DEFINITION**","Social Security is based on a sliding scale depending on your income, how long you work and at what age you retire. Social Security benefits automatically increase each year based on increases in the Consumer Price Index.  Including a spouse increases your Social Security benefits by 1.5 times your individual estimated benefit.  Please note that this calculator assumes that only one spouse works.  Benefits could be different if your spouse worked and earned a benefit higher than one half of your benefit.  If you are a married couple, and both spouses work, you may need to run the calculation twice &ndash; once for each spouse and their respective income. This calculator provides only an estimate of your benefits.  <p>The calculations use the 2024 FICA income limit of $168,600 with an annual maximum Social Security benefit of $45,864 ($3,822 per month) for a single person and 1.5 times this amount for a married couple.  To receive the maximum benefit would require earning the maximum FICA income for nearly your entire career.  You would also need to begin receiving benefits at your full retirement age of 66 or 67 (depending on your birthdate). This calculator rounds the age you can receive full Social Security benefits to the next highest full year.  If your birthdate is in 1955 through 1959 your actual full retirement age for Social Security is 66 plus two months for each year after 1954. Your actual benefit may be lower or higher depending on your work history and the complete compensation rules used by Social Security.");
KJE.SocialSecurityCalc.SOCIAL_EARLIEST_RETIRE_AGE=62;
KJE.RetirementPlanCalc=function(){this.SHOW_SOCIAL=KJE.parameters.get("SHOW_SOCIAL",true);
this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Both current savings and monthly income cannot be zero.");
this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Current age must be less than retirement age.");
this.MSG_ERROR3=KJE.parameters.get("MSG_ERROR3","Start age can't be less than retirement age.");
this.NEST_EGG=KJE.parameters.get("NEST_EGG",false);
this.MSG_GRAPH_TITLE=KJE.parameters.get("MSG_GRAPH_TITLE","You need to save KJE1 per month to meet your retirement needs.");
this.MSG_TITLE=KJE.parameters.get("MSG_TITLE","You may need KJE1 to retire at age KJE2");
this.MSG_LABEL_3=KJE.parameters.get("MSG_LABEL_3","Your plan is on track.");
this.MSG_LABEL_4=KJE.parameters.get("MSG_LABEL_4","You may need to save more.");
this.MSG_RUNOUT=KJE.parameters.get("MSG_RUNOUT_BOLD","Retirement savings runs out at age AGE_RUN_OUT.");
this.MSG_SUCCESS=KJE.parameters.get("MSG_SUCCESS_BOLD","Balance at end of retirement is ENDING_BALANCE.");
this.MSG_RESULT=KJE.parameters.get("MSG_SUCCESS","Your plan provides KJE1 when you retire. This assumes annual retirement expenses of KJE2 which is KJE3 of your last year's income of KJE4.");
this.MSG_RESULT_SOCIAL=KJE.parameters.get("MSG_RESULT_SOCIAL","This includes KJE5 per year from Social Security.");
this.MSG_RESULT_EXTRA=KJE.parameters.get("MSG_RESULT_EXTRA","");
this.MSG_RESULT_EXTRA_GRAPH=KJE.parameters.get("MSG_RESULT_EXTRA_GRAPH","");
this.MSG_SUCCESS_REPORT=KJE.parameters.get("MSG_SUCCESS_REPORT","Does not run out of funds.");
this.MSG_RUNOUT_REPORT=KJE.parameters.get("MSG_RUNOUT_REPORT","Retirement funds run out at age KJE1.");
this.MSG_INFLATION_REPORT=KJE.parameters.get("MSG_INFLATION_REPORT","This amount is increased INFLATION_RATE each year until you retire and through your retirement to account for inflation.");
this.MSG_SOCIAL_SECURITY=KJE.parameters.get("MSG_SOCIAL_SECURITY","This plan includes SOCIALSECURITY_AT_RETIRE per year from Social Security.");
this.MSG_START_OF_MESSAGE=KJE.parameters.get("MSG_START_OF_MESSAGE","");
this.MSG_GRAPH_REPORT_TITLE=KJE.parameters.get("MSG_GRAPH_REPORT_TITLE","Retirement Savings and Expenditures");
this.sGraph2=KJE.parameters.get("GRAPH_2","Savings for retirement");
this.sGraph3=KJE.parameters.get("GRAPH_3","Withdrawals for retirement");
this.bATRETIREMENT=false;
this.RESPONSE="";
this.RESPONSE1="";
this.RESPONSE2="";
this.START_OF_MESSAGE="";
this.INCREASE_ANNUAL_SAVINGS=(this.NEST_EGG?false:true);
this.YEARS_OF_RETIREMENT=0;
this.dAdjustedSavingsRate=0;
this.dAdjustedRorRate=0;
this.dAdjustedSalaryPercent=0;
this.dAdjusteYearsToRetirement=0;
this.RESULTS_MSG="";
this.INCOME_PERCENT=0;
this.AGE_RUN_OUT=0;
this.END_OF_RETIREMENT_MESSAGE="";
this.SOCIAL_SECURITY_INCREASE_RATE=0.024;
this.CURRENT_TAX=0;
this.RETIREMENT_TAX=0;
this.RETIREMENT_TAX_WITHDRAWALS=false;
this.SOCIAL_SECURITY_TAX_WITHDRAWALS=false;
this.USE_NET_INCOME=KJE.parameters.get("USE_NET_INCOME",false);
this.SHORT_RESULTS=false;
this.OTHER_PENSION_START=[0,0,0];
[];
this.OTHER_PENSION_AMOUNT=[0,0,0];
this.OTHER_PENSION_LASTS=[0,0,0];
this.OTHER_PENSION_START_MIN=KJE.FloatArray(3);
this.OTHER_PENSION_ENFORCE_MIN=new Array(3);
this.OTHER_PENSION_USERETIREAGE=new Array(3);
for(var b=0;
b<3;
b++){this.OTHER_PENSION_START_MIN[b]=KJE.parameters.get("OTHER_PENSION_START"+(b+1)+"_MIN",14);
this.OTHER_PENSION_ENFORCE_MIN[b]=KJE.parameters.get("OTHER_PENSION_ENFORCE"+(b+1)+"_MIN",false);
this.OTHER_PENSION_USERETIREAGE[b]=KJE.parameters.get("OTHER_PENSION_USERETIREAGE"+(b+1),false)
}this.OTHER_PENSION_INFLATION=[false,false,false];
[];
this.OTHER_PENSION_CPP=[KJE.parameters.get("OTHER_PENSION_CPP1",false),KJE.parameters.get("OTHER_PENSION_CPP2",false),KJE.parameters.get("OTHER_PENSION_CPP3",false)];
[];
this.OTHER_PENSION_COUNT=KJE.parameters.get("OTHER_PENSION_COUNT",0);
this.OTHER_PENSION_AMOUNT_ADJUSTED=[0,0,0];
this.OTHER_PENSION_AMOUNT_ADJUSTED=[0,0,0];
this.CPP_MINIMUM_AGE=60;
this.CPP_MAXIMUM_AGE=71;
this.CPP_NOMINAL_AGE=65;
this.CPP_ADJUSTMENT_EARLY=0.072;
this.CPP_ADJUSTMENT_LATE=0.084;
this.DD_RETIRE1=KJE.FloatArray(3);
this.DD_RETIRE2=KJE.FloatArray(3);
this.DS_RETIRE1=KJE.FloatArray(3);
this.DR_SALARY=null;
this.DR_BEGINING_BALANCE=null;
this.DR_ENDING_BALANCE=null;
this.DR_INTEREST=null;
this.DR_SAVINGS=null;
this.DR_RETIREMENT_INCOME=null;
this.DR_SOCIAL_SECURITY_INCOME=null;
this.DR_RETIREMENT_WITHDRAWAL=null;
this.DS_INFLATION_INCREASE=KJE.FloatArray(4);
this.DS_INFLATION_RUNOUT=KJE.FloatArray(4);
this.DS_SAVEMORE_INCREASE=KJE.FloatArray(5);
this.DS_SAVEMORE_RUNOUT=KJE.FloatArray(5);
this.CS_INFLATION_RUNOUT=new Array(4);
this.CS_SAVEMORE_RUNOUT=new Array(5);
this.cats=null;
this.cats2=new Array(3);
this.CAT_LABELS=KJE.parameters.get("ARRAY_CAT_LABELS",["Projected nestegg required:","Projected nestegg required after Social Security:","Projected nestegg required after current Savings:"]);
this.INFLATION_RESULTS=false;
this.SAVEMORE_RESULTS=false;
this.sSchedule=new KJE.Repeating()
};
KJE.RetirementPlanCalc.prototype.clear=function(){this.CURRENT_AGE=0;
this.HOUSEHOLD_INCOME=0;
this.PRE_RATE_OF_RETURN=0;
this.AGE_OF_RETIREMENT=0;
this.POST_RATE_OF_RETURN=0;
this.SALARY_PERCENT=0;
this.CURRENT_SAVINGS=0;
this.INFLATION_RATE=0;
this.INCLUDE_SOCIAL_SECURITY=false;
this.MARRIED=false;
this.SAVINGS_PERCENT=0;
var b=this.DD_RETIRE1.length;
for(var d=0;
d<b;
d++){this.DD_RETIRE1[d]=0;
this.DD_RETIRE2[d]=0
}};
KJE.RetirementPlanCalc.prototype.calculate=function(ac){var aM=KJE;
var aF=this.CURRENT_AGE;
var at=this.HOUSEHOLD_INCOME;
var av=this.PRE_RATE_OF_RETURN;
var aw=this.AGE_OF_RETIREMENT;
var ay=this.POST_RATE_OF_RETURN;
var aB=this.SALARY_PERCENT;
var aD=this.CURRENT_SAVINGS;
var aE=this.INFLATION_RATE;
var ag=this.INCLUDE_SOCIAL_SECURITY;
var aH=this.MARRIED;
var i=this.SAVINGS_PERCENT;
var aP=0;
var aN=0;
var n=0;
var aq=0;
var an=0;
var aG=0;
var aK=0;
var af=0;
var aO=0;
var ai=0;
var ax=av/100;
var aI=ay/100;
var ar=aD;
if(this.OTHER_PENSION_CPP){this.OTHER_PENSION_START_MIN[2]=65
}var aJ=this.YEARS_UNTIL_RETIREMENT=aw-aF;
this.AGE_RUN_OUT=0;
if(this.SHOW_SOCIAL&&this.INCLUDE_SOCIAL_SECURITY){var ao=new KJE.SocialSecurityCalc();
ao.clear();
ao.CURRENT_AGE=(aF>69?69:aF);
ao.HOUSEHOLD_INCOME=at;
ao.AGE_OF_RETIREMENT=(aw>70?70:aw);
ao.SALARY_PERCENT=aB;
ao.SOCIAL_SECURITY_INCREASE_RATE=aE;
ao.MARRIED=aH;
ao.calculate();
aK=ao.SOCIAL_AT_RETIRE_AMT;
af=(aF>ao.SOCIAL_AT_RETIRE_AGE?aF:ao.SOCIAL_AT_RETIRE_AGE)
}else{aK=0;
af=65;
ag=false
}this.SOCIALSECURITY_START_AGE=af;
this.SOCIALSECURITY_AT_RETIRE=aK;
this.INCLUDE_SOCIAL_SECURITY=ag;
var ak=aM.round(at*(i/100),0);
var aC=ak/12;
if(aF>aw){throw (this.MSG_ERROR2)
}this.bATRETIREMENT=false;
if(aF==aw){aF=aF-1;
this.CURRENT_AGE=aF;
this.bATRETIREMENT=true
}var aL=Math.round(aJ+this.YEARS_OF_RETIREMENT);
var q=0;
var aa=0;
var Y=0;
this.DS_SAVINGS=KJE.FloatArray(aL);
this.DS_WITHDRAWAL=KJE.FloatArray(aL);
this.DR_SALARY=KJE.FloatArray(aL);
this.DR_BEGINING_BALANCE=KJE.FloatArray(aL);
this.DR_ENDING_BALANCE=KJE.FloatArray(aL);
this.DR_INTEREST=KJE.FloatArray(aL);
this.DR_SAVINGS=KJE.FloatArray(aL);
this.DR_RETIREMENT_INCOME=KJE.FloatArray(aL);
this.DR_SOCIAL_SECURITY_INCOME=KJE.FloatArray(aL);
this.DR_RETIREMENT_WITHDRAWAL=KJE.FloatArray(aL);
this.DR_RETIREMENT_TAXES=KJE.FloatArray(aL);
this.cats=new Array(aL);
var ap=false;
for(Y=0;
Y<this.OTHER_PENSION_AMOUNT.length;
Y++){if(this.OTHER_PENSION_CPP[Y]){ap=this.OTHER_PENSION_CPP[Y]
}if(this.OTHER_PENSION_USERETIREAGE[Y]){this.OTHER_PENSION_START[Y]=aw;
if(this.OTHER_PENSION_START[Y]<this.OTHER_PENSION_START_MIN[Y]&&this.OTHER_PENSION_ENFORCE_MIN[Y]){this.OTHER_PENSION_START[Y]=this.OTHER_PENSION_START_MIN[Y]
}}if(this.OTHER_PENSION_START[Y]<aw&&this.OTHER_PENSION_START[Y]!=0){throw (this.MSG_ERROR3)
}}for(Y=0;
Y<this.OTHER_PENSION_AMOUNT.length;
Y++){if(!this.OTHER_PENSION_CPP[Y]||(this.OTHER_PENSION_START[Y]==this.CPP_NOMINAL_AGE)){this.OTHER_PENSION_AMOUNT_ADJUSTED[Y]=this.OTHER_PENSION_AMOUNT[Y]
}else{if(this.OTHER_PENSION_START[Y]>this.CPP_NOMINAL_AGE){this.OTHER_PENSION_AMOUNT_ADJUSTED[Y]=this.OTHER_PENSION_AMOUNT[Y]+((this.OTHER_PENSION_START[Y]-this.CPP_NOMINAL_AGE)*this.CPP_ADJUSTMENT_LATE*this.OTHER_PENSION_AMOUNT[Y])
}else{if(this.OTHER_PENSION_START[Y]<this.CPP_NOMINAL_AGE){this.OTHER_PENSION_AMOUNT_ADJUSTED[Y]=this.OTHER_PENSION_AMOUNT[Y]-((this.CPP_NOMINAL_AGE-this.OTHER_PENSION_START[Y])*this.CPP_ADJUSTMENT_EARLY*this.OTHER_PENSION_AMOUNT[Y])
}else{this.OTHER_PENSION_AMOUNT_ADJUSTED[Y]=this.OTHER_PENSION_AMOUNT[Y]
}}}}var aQ=0;
var ab=0;
var ad=0;
for(Y=1;
Y<=aL;
Y++){q=Y-1;
if(q==0){this.DR_BEGINING_BALANCE[q]=aD;
n=at;
aq=n*(1-this.CURRENT_TAX/100);
an=n*(this.INCOME_PERCENT/100);
aG=aq*(this.INCOME_PERCENT/100)
}else{this.DR_BEGINING_BALANCE[q]=this.DR_ENDING_BALANCE[q-1]
}if((aJ-Y)>0){this.DR_SAVINGS[q]=(this.INCREASE_ANNUAL_SAVINGS?((q==0?at:this.DR_SALARY[q-1])*(i/100)):ak);
this.DR_SALARY[q]=KJE.FV_AMT(aB/100,Y,at);
this.DR_INTEREST[q]=(this.DR_BEGINING_BALANCE[q])*(ax);
this.DR_RETIREMENT_INCOME[q]=0;
this.DR_SOCIAL_SECURITY_INCOME[q]=0;
this.DR_RETIREMENT_WITHDRAWAL[q]=0;
n=this.DR_SALARY[q];
aq=n*(1-this.CURRENT_TAX/100);
an=n*(this.INCOME_PERCENT/100);
aG=aq*(this.INCOME_PERCENT/100)
}else{this.DR_SALARY[q]=KJE.FV_AMT(aE/100,(Y-aJ-(this.bATRETIREMENT?1:0)),n);
this.DR_INTEREST[q]=this.DR_BEGINING_BALANCE[q]*(aI);
this.DR_SAVINGS[q]=0;
this.DR_RETIREMENT_INCOME[q]=(this.DR_SALARY[q]*(this.INCOME_PERCENT/100))*(1-(this.USE_NET_INCOME?this.CURRENT_TAX/100:0));
if((((Y+aF)-af)>=0)&&ag){this.DR_SOCIAL_SECURITY_INCOME[q]=KJE.FV_AMT(aE/100,(Y+aF-af),aK);
if(this.SOCIAL_SECURITY_TAX_WITHDRAWALS){this.DR_RETIREMENT_TAXES[q]=this.DR_SOCIAL_SECURITY_INCOME[q]*(this.RETIREMENT_TAX/200)
}}else{this.DR_SOCIAL_SECURITY_INCOME[q]=0
}var ah=0;
var ae=0;
for(aa=0;
aa<this.OTHER_PENSION_AMOUNT.length;
aa++){if(this.OTHER_PENSION_AMOUNT[aa]>0){ah=Y+aF-(this.OTHER_PENSION_START[aa]==0?aw:this.OTHER_PENSION_START[aa]);
if(ah>=0){if(this.OTHER_PENSION_LASTS[aa]==0||this.OTHER_PENSION_LASTS[aa]>ah){if(this.OTHER_PENSION_INFLATION[aa]){ae+=KJE.FV_AMT(aE/100,Y-1,this.OTHER_PENSION_AMOUNT_ADJUSTED[aa]*12)
}else{ae+=this.OTHER_PENSION_AMOUNT_ADJUSTED[aa]*12
}}}}}this.DR_SOCIAL_SECURITY_INCOME[q]+=ae;
if(this.RETIREMENT_TAX_WITHDRAWALS){this.DR_RETIREMENT_TAXES[q]+=ae*(this.RETIREMENT_TAX/100)
}this.DR_RETIREMENT_WITHDRAWAL[q]=this.DR_RETIREMENT_INCOME[q]+this.DR_RETIREMENT_TAXES[q]-this.DR_SOCIAL_SECURITY_INCOME[q];
if(this.USE_NET_INCOME&&this.DR_RETIREMENT_WITHDRAWAL[q]>0&&this.RETIREMENT_TAX_WITHDRAWALS){var au=this.DR_RETIREMENT_WITHDRAWAL[q]/(1-(this.RETIREMENT_TAX/100));
this.DR_RETIREMENT_TAXES[q]+=au-this.DR_RETIREMENT_WITHDRAWAL[q];
this.DR_RETIREMENT_WITHDRAWAL[q]=au
}var az=1;
aQ=KJE.NPV_AMT(aI,Y-aJ+1,this.DR_RETIREMENT_WITHDRAWAL[q]);
this.DD_RETIRE1[1]+=aQ;
this.DD_RETIRE2[1]+=this.DR_RETIREMENT_WITHDRAWAL[q];
ab=KJE.NPV_AMT(aI,Y-aJ+1,this.DR_RETIREMENT_INCOME[q]);
this.DD_RETIRE1[0]+=ab;
this.DD_RETIRE2[0]+=this.DR_RETIREMENT_INCOME[q]
}this.DR_ENDING_BALANCE[q]=this.DR_BEGINING_BALANCE[q]+this.DR_INTEREST[q]+this.DR_SAVINGS[q]-this.DR_RETIREMENT_WITHDRAWAL[q];
if((aJ-Y)==1){ar=this.DR_ENDING_BALANCE[q]
}if(this.DR_ENDING_BALANCE[q]<=0){var Z=(this.AGE_RUN_OUT!=0?this.DR_RETIREMENT_WITHDRAWAL[q]:(-1)*this.DR_ENDING_BALANCE[q]);
ad=KJE.NPV_AMT(aI,Y-aJ+1,Z);
this.DD_RETIRE1[2]+=ad;
this.DD_RETIRE2[2]+=Z;
if(this.AGE_RUN_OUT==0){this.AGE_RUN_OUT=Y+aF
}this.DR_RETIREMENT_WITHDRAWAL[q]=this.DR_BEGINING_BALANCE[q]+this.DR_INTEREST[q]+this.DR_SAVINGS[q];
this.DR_ENDING_BALANCE[q]=0
}}var aA=this.DR_ENDING_BALANCE[q];
this.END_OF_RETIREMENT_MESSAGE=null;
if(aA==0){this.END_OF_RETIREMENT_MESSAGE=this.MSG_RUNOUT;
this.RESULTS_MSG=this.MSG_LABEL_4;
this.RESPONSE=this.RESPONSE2
}else{this.END_OF_RETIREMENT_MESSAGE=this.MSG_SUCCESS;
this.RESULTS_MSG=this.MSG_LABEL_3;
this.RESPONSE=this.RESPONSE1
}if(this.NEST_EGG){this.RESULTS_MSG=KJE.getKJEReplaced(this.MSG_TITLE,aM.dollars(this.DD_RETIRE1[0]),aM.number(aw))
}var am=KJE.RetirementPlanCalc.getSuccessScale(this.DD_RETIRE1[1],ar);
this.RESULTS_MSG=KJE.replace("KJERetirementPlanScalePoint","KJERetirementPlanScalePoint"+KJE.number(am),this.RESULTS_MSG);
ai=0;
if(aA==0){this.dAdjustedSavingsRate=this.getAdjustedSavingsRate((aF+aL),ax,aI);
this.dAdjustedRorRate=this.getAdjustedRorRate((aF+aL),ax,aI);
this.dAdjustedSalaryPercent=this.getAdjustedSalaryPercent((aF+aL),ax,aI);
this.dAdjusteYearsToRetirement=this.getAdjustedYearsToRetirement((aF+aL),ax,aI)+aF;
if(aJ<=1){aO=this.DD_RETIRE1[2]
}else{aO=aM.round(this.dAdjustedSavingsRate*at,2)
}ai=aM.round(aO/12,2)
}if(this.INFLATION_RESULTS){for(Y=0;
Y<4;
Y++){this.DS_INFLATION_INCREASE[Y]=(Y*0.03+aE/100);
if(Y==3){this.DS_INFLATION_INCREASE[Y]=((Y+1)*0.03+aE/100)
}this.DS_INFLATION_RUNOUT[Y]=this.getRunoutAge(aF,aD,aB/100,at,ax,i/100,this.DS_INFLATION_INCREASE[Y],aI,this.INCOME_PERCENT/100,ag,aE/100,aJ,af,aK,110,true);
this.CS_INFLATION_RUNOUT[Y]=aM.percent(this.DS_INFLATION_INCREASE[Y])
}}if(this.SAVEMORE_RESULTS){for(Y=0;
Y<5;
Y++){this.DS_SAVEMORE_INCREASE[Y]=(Y*0.04+i/100);
this.DS_SAVEMORE_RUNOUT[Y]=this.getRunoutAge(aF,aD,aB/100,at,ax,this.DS_SAVEMORE_INCREASE[Y],aE/100,aI,this.INCOME_PERCENT/100,ag,aE/100,aJ,af,aK,110,true);
this.CS_SAVEMORE_RUNOUT[Y]=aM.percent(this.DS_SAVEMORE_INCREASE[Y])
}}if(ac){var al=this.sSchedule;
al.clearRepeat();
var aj=(ag||this.OTHER_PENSION_COUNT>0?al.sReportCol(ap?"Pension Income<br />OAS/CPP<br />or QPP":"Social<br />Security<br />Income",5):null);
if(aj&&!ag){aj=aj.replace("<!--STARTHIDETAXES-->","<!--").replace("<!--ENDHIDETAXES-->","-->")
}if(this.SHORT_RESULTS){al.addHeader(al.sReportCol("Age",9),al.sReportCol("Interest<br /> and<br /> Savings",8),al.sReportCol("Retirement<br />Account<br />Withdrawals",6),al.sReportCol("Ending<br />Retirement<br />Balance",7))
}else{al.addHeader(al.sReportCol("Age",9),al.sReportCol("Beginning<br />Retirement<br />Balance",1),al.sReportCol(" <br />Investment<br />Growth",2),(!this.NEST_EGG?(this.INCREASE_ANNUAL_SAVINGS?KJE.replace("CALC_RESULT",aM.percent(i/100,2),al.sReportCol("Contributions<br />at CALC_RESULT<br />of Income",3)):KJE.replace("CALC_RESULT",aM.percent(i/100,2),al.sReportCol("<br /><br />Contributions",10))):null),KJE.replace("CALC_RESULT",aM.percent(this.INCOME_PERCENT/100,0),al.sReportCol("<br />Annual Income<br />Desired",4)),aj,(this.USE_NET_INCOME?al.sReportCol("Estimated<br />Retirement<br />Taxes",8):null),al.sReportCol("Retirement<br />Account<br />Withdrawals",6),al.sReportCol("Ending<br />Retirement<br />Balance",7))
}}if(!ag){this.DS_RETIRE1=KJE.FloatArray(2);
this.cats2=new Array(2);
this.cats2[0]=this.CAT_LABELS[0]+" "+aM.dollars(this.DD_RETIRE1[0]);
this.cats2[1]=this.CAT_LABELS[2]+" "+aM.dollars(this.DD_RETIRE1[2]);
for(aa=0;
aa<this.DS_RETIRE1.length;
aa++){this.DS_RETIRE1[aa]=((this.DD_RETIRE1[aa+1]))
}}else{this.DS_RETIRE1=KJE.FloatArray(3);
this.cats2=new Array(3);
for(aa=0;
aa<this.DS_RETIRE1.length;
aa++){this.DS_RETIRE1[aa]=((this.DD_RETIRE1[aa]));
this.cats2[aa]=this.CAT_LABELS[aa]+" "+aM.dollars(this.DD_RETIRE1[aa])
}}for(Y=1;
Y<=aL;
Y++){q=Y-1;
this.cats[q]=aM.number(Y+aF);
if(this.DR_ENDING_BALANCE[q]<0){this.DR_ENDING_BALANCE[q]=0;
this.DR_RETIREMENT_WITHDRAWAL[q]=0
}if(ac){if(this.SHORT_RESULTS){al.addRepeat(aM.number(Y+aF,0),aM.dollars(this.DR_INTEREST[q]+this.DR_SAVINGS[q]),aM.dollars(this.DR_RETIREMENT_WITHDRAWAL[q]),aM.dollars(this.DR_ENDING_BALANCE[q]))
}else{al.addRepeat(aM.number(Y+aF,0),aM.dollars(this.DR_BEGINING_BALANCE[q]),aM.dollars(this.DR_INTEREST[q]),(this.NEST_EGG?null:aM.dollars(this.DR_SAVINGS[q])),aM.dollars(this.DR_RETIREMENT_INCOME[q]),(ag||this.OTHER_PENSION_COUNT>0?aM.dollars(this.DR_SOCIAL_SECURITY_INCOME[q]):null),(this.USE_NET_INCOME?aM.dollars(this.DR_RETIREMENT_TAXES[q],this.iDecimals):null),aM.dollars(this.DR_RETIREMENT_WITHDRAWAL[q]),aM.dollars(this.DR_ENDING_BALANCE[q]))
}}if(this.DR_RETIREMENT_WITHDRAWAL[q]<0){this.DR_RETIREMENT_WITHDRAWAL[q]=0
}}if(this.MSG_START_OF_MESSAGE=("")){this.START_OF_MESSAGE=""
}else{this.START_OF_MESSAGE=KJE.replace("NEED_AT_RETIRE_AFSS",aM.dollars(this.DD_RETIRE1[1],0),this.MSG_START_OF_MESSAGE);
this.START_OF_MESSAGE=KJE.replace("NEED_THRU_RETIRE_AFSS",aM.dollars(this.DD_RETIRE2[1],0),this.START_OF_MESSAGE)+" "
}this.SOCIAL_SECURITY_PERCENT=aP;
this.SOCIAL_SECURITY_SALARY=aN;
this.ENDING_BALANCE=aA;
this.ANNUAL_SAVINGS=ak;
this.MONTHLY_SAVINGS=aC;
this.INCOME_AT_RETIRE=n;
this.INCOME_AT_RETIRE_NET=aq;
this.INCOME_REQUIRED_AT_RETIRE=an;
this.INCOME_REQUIRED_AT_RETIRE_NET=aG;
this.SOCIALSECURITY_AT_RETIRE=aK;
this.SOCIALSECURITY_START_AGE=af;
this.BALANCE_AT_RETIRE=ar;
this.ADJUST_ANNUAL_SAVINGS=aO;
this.ADJUST_MONTHLY_SAVINGS=ai
};
KJE.RetirementPlanCalc.prototype.formatReport=function(d){d.replace("END_OF_RETIREMENT_MESSAGE",this.END_OF_RETIREMENT_MESSAGE);
var c=0;
for(c=0;
c<this.OTHER_PENSION_START.length;
c++){d.age("OTHER_PENSION_START"+(c+1),this.OTHER_PENSION_START[c]>this.AGE_OF_RETIREMENT?this.OTHER_PENSION_START[c]:this.AGE_OF_RETIREMENT);
d.dollars("OTHER_PENSION_AMOUNT"+(c+1),this.OTHER_PENSION_AMOUNT_ADJUSTED[c]);
d.replace("OTHER_PENSION_INFLATION"+(c+1),(this.OTHER_PENSION_INFLATION[c]?this.MSG_INFLATION_REPORT:""));
d.number("OTHER_PENSION_LASTS"+(c+1),this.OTHER_PENSION_LASTS[c])
}if(this.INFLATION_RESULTS){for(c=0;
c<4;
c++){d.inflationRate("INFLATION_INCREASE"+c,this.DS_INFLATION_INCREASE[c]);
if(this.DS_INFLATION_RUNOUT[c]<110){d.replace("INFLATION_MSG"+c,KJE.replace("KJE1",KJE.number(this.DS_INFLATION_RUNOUT[c],this.MSG_RUNOUT_REPORT)))
}else{d.replace("INFLATION_MSG"+c,this.MSG_SUCCESS_REPORT)
}}}if(this.SAVEMORE_RESULTS){for(c=0;
c<5;
c++){d.percent("SAVEMORE_INCREASE"+c,this.DS_SAVEMORE_INCREASE[c],2);
if(this.DS_SAVEMORE_RUNOUT[c]<110){d.number("SAVEMORE_MSG"+c,this.MSG_RUNOUT_REPORT+" "+this.DS_SAVEMORE_RUNOUT[c])
}else{d.replace("SAVEMORE_MSG"+c,this.MSG_SUCCESS_REPORT)
}}}if(this.ENDING_BALANCE==0&&!this.bATRETIREMENT&&this.CURRENT_AGE!=this.AGE_OF_RETIREMENT-1){d.replace("<!--ADJUST_ADVICE-->","");
d.replace("<!--/ADJUST_ADVICE-->","");
d.replace("<ADJUST_ADVICE>","");
d.replace("<ADJUST_ADVICE>","");
d.returnRate("ADJUST_SAVINGS_RATE",this.dAdjustedSavingsRate);
d.returnRate("ADJUST_ROR",this.dAdjustedRorRate);
d.percent("ADJUST_INCOME_REQUIRED",this.dAdjustedSalaryPercent);
d.year("ADJUST_YEARS",this.dAdjusteYearsToRetirement)
}else{d.replace("<!--ADJUST_ADVICE-->","<!--");
d.replace("<!--/ADJUST_ADVICE-->","-->");
d.replace("<ADJUST_ADVICE>","<!--");
d.replace("<ADJUST_ADVICE>","-->")
}d.dollars("ADJUST_ANNUAL_SAVINGS",this.ADJUST_ANNUAL_SAVINGS);
d.dollars("ADJUST_MONTHLY_SAVINGS",this.ADJUST_MONTHLY_SAVINGS);
d.replace("INCREASE_ANNUAL_SAVINGS",(this.INCREASE_ANNUAL_SAVINGS?"will":"does not"));
d.age("CURRENT_AGE",this.CURRENT_AGE+(this.bATRETIREMENT?1:0));
d.dollars("HOUSEHOLD_INCOME",this.HOUSEHOLD_INCOME);
d.returnRate("PRE_RATE_OF_RETURN",this.PRE_RATE_OF_RETURN/100);
d.age("AGE_OF_RETIREMENT",this.AGE_OF_RETIREMENT);
d.returnRate("POST_RATE_OF_RETURN",this.POST_RATE_OF_RETURN/100);
d.percent("SALARY_PERCENT",this.SALARY_PERCENT/100,2);
d.year("YEARS_UNTIL_RETIREMENT",this.YEARS_UNTIL_RETIREMENT);
d.year("YEARS_OF_RETIREMENT",this.YEARS_OF_RETIREMENT);
d.percent("INCOME_PERCENT",this.INCOME_PERCENT/100,2);
d.dollars("CURRENT_SAVINGS",this.CURRENT_SAVINGS);
d.inflationRate("INFLATION_RATE",this.INFLATION_RATE/100);
if(this.INCLUDE_SOCIAL_SECURITY){d.replace("SOCIAL_SECURITY_MSG",this.MSG_SOCIAL_SECURITY);
d.dollars("SOCIALSECURITY_AT_RETIRE",this.SOCIALSECURITY_AT_RETIRE)
}else{d.replace("SOCIAL_SECURITY_MSG","");
d.dollars("SOCIALSECURITY_AT_RETIRE",0)
}d.yesno("RETIREMENT_TAX_WITHDRAWALS",this.RETIREMENT_TAX_WITHDRAWALS);
d.yesno("SOCIAL_SECURITY_TAX_WITHDRAWALS",this.SOCIAL_SECURITY_TAX_WITHDRAWALS);
d.yesno("INCLUDE_SOCIAL_SECURITY",this.INCLUDE_SOCIAL_SECURITY);
d.yesno("INCLUDE_SOCIAL_SECURITY",this.INCLUDE_SOCIAL_SECURITY);
d.taxRate("CURRENT_TAX",this.CURRENT_TAX/100);
d.taxRate("RETIREMENT_TAX",this.RETIREMENT_TAX/100);
d.yesno("MARRIED",this.MARRIED);
d.percent("SOCIAL_SECURITY_PERCENT",this.SOCIAL_SECURITY_PERCENT);
d.dollars("SOCIAL_SECURITY_SALARY",this.SOCIAL_SECURITY_SALARY);
d.dollars("PV_ENDING_BALANCE",KJE.NPV_AMT(KJE.NPV_AMT(this.INFLATION_RATE/100,Math.round(this.YEARS_UNTIL_RETIREMENT+this.YEARS_OF_RETIREMENT),this.ENDING_BALANCE)));
d.dollars("ENDING_BALANCE",this.ENDING_BALANCE);
d.percent("SAVINGS_PERCENT",this.SAVINGS_PERCENT/100,2);
d.dollars("ANNUAL_SAVINGS",this.ANNUAL_SAVINGS);
d.dollars("MONTHLY_SAVINGS",this.MONTHLY_SAVINGS);
d.dollars("INCOME_AT_RETIRE_NET",this.INCOME_AT_RETIRE_NET);
d.dollars("INCOME_AT_RETIRE",this.INCOME_AT_RETIRE);
d.dollars("INCOME_REQUIRED_AT_RETIRE_NET",this.INCOME_REQUIRED_AT_RETIRE_NET);
d.dollars("INCOME_REQUIRED_AT_RETIRE",this.INCOME_REQUIRED_AT_RETIRE);
d.number("SOCIALSECURITY_START_AGE",this.SOCIALSECURITY_START_AGE);
d.dollars("BALANCE_AT_RETIRE",this.BALANCE_AT_RETIRE);
d.replace("RESULTS_MSG",this.RESULTS_MSG);
d.replace("RESPONSE",this.RESPONSE);
d.age("AGE_RUN_OUT",this.AGE_RUN_OUT);
d.dollars("ENDING_BALANCE",this.ENDING_BALANCE);
d.dollars("NEED_AT_RETIRE_AFSS",this.DD_RETIRE1[1]);
d.dollars("NEED_AT_RETIRE_PLAN",this.DD_RETIRE1[2]);
d.dollars("NEED_AT_RETIRE",this.DD_RETIRE1[0]);
d.dollars("NEED_THRU_RETIRE_AFSS",this.DD_RETIRE2[1]);
d.dollars("NEED_THRU_RETIRE_PLAN",this.DD_RETIRE2[2]);
d.dollars("NEED_THRU_RETIRE",this.DD_RETIRE2[0]);
d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())
};
KJE.RetirementPlanCalc.prototype.formatGraph=function(d,c){if(!this.NEST_EGG&&c[0]){c[0].setTitle(this.MSG_GRAPH_REPORT_TITLE);
c[0].setTitleGraph(this.MSG_GRAPH_REPORT_TITLE);
c[0].show(true);
c[0].paint()
}};
KJE.RetirementPlanCalc.prototype.getRunoutAge=function(Q,K,R,S,N,aj,U,al,ao,ai,n,ab,Y,O,q,ag){var ap=K;
var P=0;
var ae=0;
var W=0;
var T=0;
var M=0;
var aa=0;
var X=0;
var L=0;
var Z=0;
var am=S*aj;
var an=this.USE_NET_INCOME;
var ad=this.CURRENT_TAX/100;
for(var V=1;
V<=(q-Q);
V++){Z=0;
L=0;
aa=0;
X=0;
if((ab-V)>0){P=KJE.FV_AMT(R,V,S);
ae=ap*(N);
W=(this.INCREASE_ANNUAL_SAVINGS?P*(aj):am);
T=0;
M=P
}else{P=KJE.FV_AMT(U,V-ab,M);
ae=ap*(al);
W=0;
T=P*(ao)*(1-(an?ad:0));
if(((V+Q)-Y>=0)&&(ai>0)){aa=KJE.FV_AMT(n,(V+Q)-Y,O);
if(this.SOCIAL_SECURITY_TAX_WITHDRAWALS){Z=aa*(this.RETIREMENT_TAX/200)
}}var af=this.OTHER_PENSION_AMOUNT.length;
var ah=0;
for(var ac=0;
ac<af;
ac++){if(this.OTHER_PENSION_AMOUNT_ADJUSTED[ac]>0){ah=this.OTHER_PENSION_START[ac]==0?(V-ab):(V+Q-this.OTHER_PENSION_START[ac]);
if(this.OTHER_PENSION_LASTS[ac]==0||this.OTHER_PENSION_LASTS[ac]>ah){if(this.OTHER_PENSION_INFLATION[ac]){L+=KJE.FV_AMT(U,(V),this.OTHER_PENSION_AMOUNT_ADJUSTED[ac]*12)
}else{L+=this.OTHER_PENSION_AMOUNT_ADJUSTED[ac]*12
}}}}if(this.RETIREMENT_TAX_WITHDRAWALS){Z=L*(this.RETIREMENT_TAX/100)
}X=T+Z-aa-L;
if(an&&X>0&&this.RETIREMENT_TAX_WITHDRAWALS){var ak=X/(1-(this.RETIREMENT_TAX/100));
Z+=ak-X;
X=ak
}}ap=ap+ae+W-X;
if(ap<0){q=V+Q;
break
}}if(ag){return q
}return ap
};
KJE.RetirementPlanCalc.prototype.getAdjustedSavingsRate=function(h,l,m){var n=200;
var j=n/2;
var i=0;
for(var k=1;
k<50;
k++){i=this.getRunoutAge(this.CURRENT_AGE,this.CURRENT_SAVINGS,this.SALARY_PERCENT/100,this.HOUSEHOLD_INCOME,l,n,this.INFLATION_RATE/100,m,this.INCOME_PERCENT/100,this.INCLUDE_SOCIAL_SECURITY,this.INFLATION_RATE/100,this.YEARS_UNTIL_RETIREMENT,this.SOCIALSECURITY_START_AGE,this.SOCIALSECURITY_AT_RETIRE,h,false);
if(i>0&&i<1){return KJE.round(n+5e-8,7)
}else{if(i<=0){n+=j
}else{n-=j
}}j=j/2
}return KJE.round(n+5e-8,7)
};
KJE.RetirementPlanCalc.prototype.getAdjustedRorRate=function(i,n,o){var p=n;
var k=0.5;
var j=0;
var m=KJE;
for(var l=1;
l<50;
l++){j=this.getRunoutAge(this.CURRENT_AGE,this.CURRENT_SAVINGS,this.SALARY_PERCENT/100,this.HOUSEHOLD_INCOME,p,this.SAVINGS_PERCENT/100,this.INFLATION_RATE/100,o,this.INCOME_PERCENT/100,this.INCLUDE_SOCIAL_SECURITY,this.INFLATION_RATE/100,this.YEARS_UNTIL_RETIREMENT,this.SOCIALSECURITY_START_AGE,this.SOCIALSECURITY_AT_RETIRE,i,false);
if(j>0&&j<1){return m.round(p+0.00005,4)
}else{if(j<=0){p+=k
}else{p-=k
}}k=k/2
}return m.round(p+0.00005,4)
};
KJE.RetirementPlanCalc.prototype.getAdjustedSalaryPercent=function(i,n,o){var p=this.INCOME_PERCENT/100;
var k=0.5;
var j=0;
var m=KJE;
for(var l=1;
l<50;
l++){j=this.getRunoutAge(this.CURRENT_AGE,this.CURRENT_SAVINGS,this.SALARY_PERCENT/100,this.HOUSEHOLD_INCOME,n,this.SAVINGS_PERCENT/100,this.INFLATION_RATE/100,o,p,this.INCLUDE_SOCIAL_SECURITY,this.INFLATION_RATE/100,this.YEARS_UNTIL_RETIREMENT,this.SOCIALSECURITY_START_AGE,this.SOCIALSECURITY_AT_RETIRE,i,false);
if(j>0&&j<1){return m.round(p-0.005,2)
}else{if(j<=0){p-=k
}else{p+=k
}}k=k/2
}return m.round(p-0.005,4)
};
KJE.RetirementPlanCalc.prototype.getAdjustedYearsToRetirement=function(p,j,k){var l=0;
var m=this.INCLUDE_SOCIAL_SECURITY;
if(m){var o=new KJE.SocialSecurityCalc()
}for(var q=1;
q<50;
q++){var n=0;
var r=0;
if(this.INCLUDE_SOCIAL_SECURITY){o.clear();
o.CURRENT_AGE=(this.CURRENT_AGE>69?69:this.CURRENT_AGE);
o.HOUSEHOLD_INCOME=this.HOUSEHOLD_INCOME;
o.AGE_OF_RETIREMENT=(this.CURRENT_AGE+this.YEARS_UNTIL_RETIREMENT+q>70?70:this.CURRENT_AGE+this.YEARS_UNTIL_RETIREMENT+q);
o.SALARY_PERCENT=this.SALARY_PERCENT;
o.SOCIAL_SECURITY_INCREASE_RATE=this.INFLATION_RATE;
o.MARRIED=this.MARRIED;
o.calculate();
r=o.SOCIAL_AT_RETIRE_AMT;
n=o.SOCIAL_AT_RETIRE_AGE
}l=this.getRunoutAge(this.CURRENT_AGE,this.CURRENT_SAVINGS,this.SALARY_PERCENT/100,this.HOUSEHOLD_INCOME,j,this.SAVINGS_PERCENT/100,this.INFLATION_RATE/100,k,this.INCOME_PERCENT/100,this.INCLUDE_SOCIAL_SECURITY,this.INFLATION_RATE/100,(this.YEARS_UNTIL_RETIREMENT+q),n,r,p+q,false);
if(l>0){return(this.YEARS_UNTIL_RETIREMENT+q)
}}return(this.YEARS_UNTIL_RETIREMENT+50)
};
KJE.RetirementPlanCalc.prototype.getGraphTitle=function(c){var d="";
if(this.NEST_EGG){d=KJE.getKJEReplaced(this.MSG_GRAPH_TITLE,KJE.dollars(this.ADJUST_MONTHLY_SAVINGS))
}else{if(KJE.lang=="EN"||KJE.lang=="SP"){d=(this.MSG_RESULT_EXTRA_GRAPH==""?(this.ENDING_BALANCE>0?this.MSG_SUCCESS:this.MSG_RUNOUT):this.MSG_RESULT_EXTRA_GRAPH)+"<div class='KJESubTitle KJELeft'>"+this.MSG_RESULT_EXTRA+this.MSG_RESULT+(this.SHOW_SOCIAL?" "+this.MSG_RESULT_SOCIAL:"")+"</div>";
if(c){d=KJE.replace("AGE_RUN_OUT",KJE.number(this.AGE_RUN_OUT),d);
d=KJE.replace("ENDING_BALANCE",KJE.dollars(this.ENDING_BALANCE),d);
d=KJE.replace("NEED_AT_RETIRE_AFSS",KJE.dollars(this.DD_RETIRE1[1]),d);
d=KJE.replace("NEED_THRU_RETIRE_AFSS",KJE.dollars(this.DD_RETIRE2[1]),d);
d=KJE.getKJEReplaced(d,KJE.dollars(this.BALANCE_AT_RETIRE),KJE.dollars(this.INCOME_REQUIRED_AT_RETIRE),KJE.percent(this.INCOME_PERCENT/100),KJE.dollars(this.INCOME_AT_RETIRE),(this.SHOW_SOCIAL?KJE.dollars(this.SOCIALSECURITY_AT_RETIRE):""))
}}else{d=this.MSG_GRAPH_REPORT_TITLE
}}return d
};
KJE.RetirementPlanCalc.getSuccessScale=function(o,n){var k=o*2;
var p=200;
var l=200;
var j=k/p;
for(var i=0;
i<p;
i++){if(n>j*i){l=i
}else{l=i;
break
}}var m=n-o;
if(m<=10000&&m>=-10000){l=100
}if(l<=25){l=0
}else{if(l>25&&l<100){l=Math.round(((l-25)/75)*50)
}else{if(l==100){l=50
}else{if(l>100&&l<200){l=Math.round(((l-100)/100)*50)+50
}else{l=100
}}}}l=Math.round(l/5)*5;
return KJE.round(l)
};
KJE.CalcName="Retirement Nest Egg Calculator";
KJE.CalcType="RetirementNestegg";
KJE.CalculatorTitleTemplate="KJE1";
KJE.gHeight=300;
KJE.initialize=function(){KJE.CalcControl=new KJE.RetirementPlanCalc();
KJE.GuiControl=new KJE.RetirementPlan(KJE.CalcControl)
};
KJE.RetirementPlan=function(l){var p=KJE;
var n=KJE.inputs.items;
KJE.NumberSlider("CURRENT_AGE","Current age",14,90,0);
KJE.NumberSlider("AGE_OF_RETIREMENT","Age at retirement",10,90,0,1);
KJE.DollarSlider("HOUSEHOLD_INCOME","Annual household income",1,10000000,0);
KJE.PercentSlider("SAVINGS_PERCENT","Percent of income to save",0,100,2,1);
KJE.DollarSlider("CURRENT_SAVINGS","Current retirement savings",0,100000000,0,1,5);
KJE.PercentSlider("SALARY_PERCENT","Expected income increase",0,KJE.parameters.get("MAX_SALARY_PERCENT",20),2,1);
KJE.PercentSlider("INCOME_PERCENT","Pre-retirement income desired in retirement",KJE.parameters.get("MIN_INCOME_PERCENT",40),KJE.parameters.get("MAX_INCOME_PERCENT",160),0,5);
KJE.NumberSlider("YEARS_OF_RETIREMENT","Years of retirement income",1,100,0,1);
KJE.DollarSlider("OTHER_PENSION_AMOUNT1","Misc. income / pensions",KJE.parameters.get("OTHER_PENSION_AMT1_MIN",0),KJE.parameters.get("OTHER_PENSION_AMT1_MAX",20000),0);
KJE.DollarSlider("OTHER_PENSION_AMOUNT2","Retirement work income",KJE.parameters.get("OTHER_PENSION_AMT2_MIN",0),KJE.parameters.get("OTHER_PENSION_AMT2_MAX",20000),0);
KJE.DollarSlider("OTHER_PENSION_AMOUNT3","Additional retirement income",KJE.parameters.get("OTHER_PENSION_AMT3_MIN",0),KJE.parameters.get("OTHER_PENSION_AMT3_MAX",20000),0);
KJE.Checkbox("OTHER_PENSION_INFLATION1","Increase with inflation",true,KJE.parameters.get("MSG_OTHER_PENSION_AMOUNT1","Misc. income / pensions"));
KJE.Checkbox("OTHER_PENSION_INFLATION2","Increase with inflation",true,KJE.parameters.get("MSG_OTHER_PENSION_AMOUNT2","Retirement work income"));
KJE.Checkbox("OTHER_PENSION_INFLATION3","Increase with inflation",true,KJE.parameters.get("MSG_OTHER_PENSION_AMOUNT3","Additional retirement income"));
KJE.InvestRateSlider("PRE_RATE_OF_RETURN","Rate of return before retirement");
KJE.InvestRateSlider("POST_RATE_OF_RETURN","Rate of return during retirement");
KJE.InflationRateSlider("INFLATION_RATE","Expected rate of inflation");
KJE.PercentSlider("CURRENT_TAX","Current tax rate",0,50,2);
KJE.PercentSlider("RETIREMENT_TAX","Retirement tax rate",0,50,2);
KJE.Checkbox("MARRIED","Married",true,"Check here");
KJE.Checkbox("INCLUDE_SOCIAL_SECURITY","Include Social Security",true,"Check here");
KJE.Checkbox("RETIREMENT_TAX_WITHDRAWALS","Tax retirement income",false,"Check here");
KJE.Checkbox("SOCIAL_SECURITY_TAX_WITHDRAWALS","Tax 1/2 Social Security",false,"Check here");
this.USE_OTHER_PENSION_START1=KJE.parameters.get("SHOW_PENSION_START1",false);
this.USE_OTHER_PENSION_START2=KJE.parameters.get("SHOW_PENSION_START2",false);
this.USE_OTHER_PENSION_START3=KJE.parameters.get("SHOW_PENSION_START3",false);
if(this.USE_OTHER_PENSION_START1){KJE.NumberSlider("OTHER_PENSION_START1","Misc. income / pensions starts",KJE.parameters.get("OTHER_PENSION_START1_MIN",14),KJE.parameters.get("OTHER_PENSION_START1_MAX",90),0)
}if(this.USE_OTHER_PENSION_START2){KJE.NumberSlider("OTHER_PENSION_START2","Retirement work income starts",KJE.parameters.get("OTHER_PENSION_START2_MIN",14),KJE.parameters.get("OTHER_PENSION_START2_MAX",90),0)
}if(this.USE_OTHER_PENSION_START3){KJE.NumberSlider("OTHER_PENSION_START3","Additional retirement income starts",KJE.parameters.get("OTHER_PENSION_START3_MIN",14),KJE.parameters.get("OTHER_PENSION_START3_MAX",90),0)
}this.USE_PENSION_LASTS1=KJE.parameters.get("SHOW_PENSION_YEAR1",false);
this.USE_PENSION_LASTS2=KJE.parameters.get("SHOW_PENSION_YEAR2",false);
if(this.USE_PENSION_LASTS1){KJE.NumberSlider("OTHER_PENSION_LASTS1","Years to work",0,30,0,1)
}if(this.USE_PENSION_LASTS2){KJE.NumberSlider("OTHER_PENSION_LASTS2","Years to work",0,30,0,1)
}var m=KJE.gNewGraph((l.NEST_EGG?KJE.gCATEGORIES:KJE.gLINE),"GRAPH1",true,false,KJE.colorList[1],l.getGraphTitle());
if(m){m._titleXAxis.setText(KJE.parameters.get("MSG_GRAPH_1",""));
m._axisX.setVisible(!l.NEST_EGG);
m._axisY.setVisible(true);
m._legend._iOrientation=KJE.gLegend.BOTTOM;
m._showItemLabel=true;
m._showItemLabelOnTop=true;
m._axisX._fSpacingPercent=0.2
}var t=KJE.parameters.get("MSG_DROPPER_TITLE","Retirement plan inputs:");
var r=KJE.parameters.get("MSG_DROPPER_CLOSETITLE"," Retire at age KJE1 with KJE2 of current income");
var k=function(){return t+KJE.subText(KJE.getKJEReplaced(r,KJE.number(l.AGE_OF_RETIREMENT),KJE.percent(l.INCOME_PERCENT/100,3)),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS",true,t,k),KJE.colorList[0]);
var s=KJE.parameters.get("MSG_DROPPER2_TITLE","Investment returns, inflation and Social Security:");
var q=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE","KJE1&nbsp;pre-retirement, KJE2&nbsp;in&nbsp;retirement, KJE3&nbsp;inflation, Include&nbsp;Social&nbsp;Security?&nbsp;KJE4");
var o=function(){return s+KJE.subText(KJE.getKJEReplaced(q,KJE.percent(l.PRE_RATE_OF_RETURN/100,3),KJE.percent(l.POST_RATE_OF_RETURN/100,3),KJE.percent(l.INFLATION_RATE/100,3),(l.INCLUDE_SOCIAL_SECURITY?KJE.MSG_YES:KJE.MSG_NO)),"KJECenter")
};
KJE.addDropper(new KJE.Dropper("INPUTS2",false,s,o),KJE.colorList[0]);
this.DIV_RESULTS=document.getElementById("KJE-C-RESULTS");
KJE.addDiv("RESULTS",KJE.colorList[1])
};
KJE.RetirementPlan.clear=function(){if(this.DIV_RESULTS){this.DIV_RESULTS.innerHTML=""
}};
KJE.RetirementPlan.prototype.setValues=function(c){var d=KJE.inputs.items;
c.CURRENT_AGE=d.CURRENT_AGE.getValue();
c.HOUSEHOLD_INCOME=d.HOUSEHOLD_INCOME.getValue();
c.PRE_RATE_OF_RETURN=d.PRE_RATE_OF_RETURN.getValue();
c.AGE_OF_RETIREMENT=d.AGE_OF_RETIREMENT.getValue();
c.POST_RATE_OF_RETURN=d.POST_RATE_OF_RETURN.getValue();
c.SALARY_PERCENT=d.SALARY_PERCENT.getValue();
c.YEARS_OF_RETIREMENT=d.YEARS_OF_RETIREMENT.getValue();
c.INCOME_PERCENT=d.INCOME_PERCENT.getValue();
c.CURRENT_SAVINGS=d.CURRENT_SAVINGS.getValue();
c.INFLATION_RATE=d.INFLATION_RATE.getValue();
c.SAVINGS_PERCENT=d.SAVINGS_PERCENT.getValue();
c.INCLUDE_SOCIAL_SECURITY=d.INCLUDE_SOCIAL_SECURITY.getValue();
c.MARRIED=d.MARRIED.getValue();
c.CURRENT_TAX=d.CURRENT_TAX.getValue();
c.RETIREMENT_TAX=d.RETIREMENT_TAX.getValue();
c.OTHER_PENSION_AMOUNT[0]=d.OTHER_PENSION_AMOUNT1.getValue();
c.OTHER_PENSION_AMOUNT[1]=d.OTHER_PENSION_AMOUNT2.getValue();
c.OTHER_PENSION_AMOUNT[2]=d.OTHER_PENSION_AMOUNT3.getValue();
c.OTHER_PENSION_INFLATION[0]=d.OTHER_PENSION_INFLATION1.getValue();
c.OTHER_PENSION_INFLATION[1]=d.OTHER_PENSION_INFLATION2.getValue();
c.OTHER_PENSION_INFLATION[2]=d.OTHER_PENSION_INFLATION3.getValue();
c.RETIREMENT_TAX_WITHDRAWALS=d.RETIREMENT_TAX_WITHDRAWALS.getValue();
c.SOCIAL_SECURITY_TAX_WITHDRAWALS=d.SOCIAL_SECURITY_TAX_WITHDRAWALS.getValue();
if(this.USE_PENSION_LASTS1){c.OTHER_PENSION_LASTS[0]=d.OTHER_PENSION_LASTS1.getValue()
}if(this.USE_PENSION_LASTS2){c.OTHER_PENSION_LASTS[1]=d.OTHER_PENSION_LASTS2.getValue()
}if(this.USE_OTHER_PENSION_START1){c.OTHER_PENSION_START[0]=d.OTHER_PENSION_START1.getValue()
}if(this.USE_OTHER_PENSION_START2){c.OTHER_PENSION_START[1]=d.OTHER_PENSION_START2.getValue()
}if(this.USE_OTHER_PENSION_START3){c.OTHER_PENSION_START[2]=d.OTHER_PENSION_START3.getValue()
}};
KJE.RetirementPlan.prototype.refresh=function(f){var d=KJE;
var e=KJE.gGraphs[0];
KJE.setTitleTemplate(f.RESULTS_MSG);
if(e){e.removeAll();
e.setTitle(f.getGraphTitle(true));
if(f.NEST_EGG){e.setGraphCategories(f.cats2);
e.add(new KJE.gGraphDataSeries(f.DS_RETIRE1,f.sGraph2,e.getColor(1)))
}else{e.setGraphCategories(f.cats);
e.add(new KJE.gGraphDataSeries(f.DR_ENDING_BALANCE,f.sGraph2,e.getColor(1)));
e.add(new KJE.gGraphDataSeries(f.DR_RETIREMENT_WITHDRAWAL,f.sGraph3,e.getColor(2)))
}e.paint()
}if(this.DIV_RESULTS){this.DIV_RESULTS.innerHTML="<div class='KJERightMargin'>"+KJE.setToggleTitleText(f.getGraphTitle(true),null,KJE)+"</div>"
}};
KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-CURRENT_AGE'><input id='KJE-CURRENT_AGE' /></div> <div id='KJE-C-AGE_OF_RETIREMENT'><input id='KJE-AGE_OF_RETIREMENT' /></div> <div id='KJE-C-HOUSEHOLD_INCOME'><input id='KJE-HOUSEHOLD_INCOME' /></div> <div id='KJE-C-CURRENT_SAVINGS'><input id='KJE-CURRENT_SAVINGS' /></div> <div id='KJE-C-SALARY_PERCENT'><input id='KJE-SALARY_PERCENT' /></div> <div id='KJE-C-INCOME_PERCENT'><input id='KJE-INCOME_PERCENT' /></div> <div id='KJE-C-YEARS_OF_RETIREMENT'><input id='KJE-YEARS_OF_RETIREMENT' /></div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-PRE_RATE_OF_RETURN'><input id='KJE-PRE_RATE_OF_RETURN' /></div> <div id='KJE-C-POST_RATE_OF_RETURN'><input id='KJE-POST_RATE_OF_RETURN' /></div> <div id='KJE-C-INFLATION_RATE'><input id='KJE-INFLATION_RATE' /></div> <div id='KJE-C-MARRIED'><input id='KJE-MARRIED' type=checkbox /></div> <div id='KJE-C-INCLUDE_SOCIAL_SECURITY'><input id='KJE-INCLUDE_SOCIAL_SECURITY' type=checkbox /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";
KJE.DefinitionText=" <div id='KJE-D-CURRENT_AGE' ><dt>Current age</dt><dd>Your current age.</dd></div> <div id='KJE-D-AGE_OF_RETIREMENT' ><dt>Age at retirement</dt><dd>Age at which you plan to retire. This calculator assumes that the year you retire, you do not make any contributions to your retirement savings. For example, if you retire at age 65, your last contribution occurs when you are actually age 64. This calculator also assumes that you make your entire contribution at the end of each year.</dd></div> <div id='KJE-D-HOUSEHOLD_INCOME' ><dt>Household income</dt><dd>Your total household income. If you are married, this should include your spouse's income.</dd></div> <div id='KJE-D-CURRENT_SAVINGS' ><dt>Current retirement savings</dt><dd>Total amount that you currently have saved toward your retirement. Include all sources of retirement savings such as 401(k)s, IRAs and Annuities.</dd></div> <div id='KJE-D-PRE_RATE_OF_RETURN' ><dt>Rate of return before retirement</dt><dd>This is the annual rate of return you expect from your retirement savings and investments. This should also be an after-tax rate of return if the majority of your retirement savings is not in a tax-deferred account such as a 403(b), 401(k), 457(b), annuity or IRA. **ROR_DEFINITION**</dd></div> <div id='KJE-D-POST_RATE_OF_RETURN' ><dt>Rate of return during retirement</dt><dd>This is the annual rate of return you expect from your investments during retirement. This should also be an after-tax rate of return if the majority of your retirement savings is not in a tax-deferred account such as a 403(b), 401(k), 457(b), annuity or IRA. This rate is often lower than the return earned before retirement due to more conservative investment choices to help insure a steady flow of income. **ROR_DEFINITION**</dd></div> <div id='KJE-D-SALARY_PERCENT' ><dt>Expected income increase</dt><dd>Annual percent increase you expect in your household income.</dd></div> <div id='KJE-D-YEARS_OF_RETIREMENT' ><dt>Years of retirement income</dt><dd>Total number of years you expect to use your retirement income.</dd></div> <div id='KJE-D-INCOME_PERCENT' ><dt>Pre-retirement income desired in retirement</dt><dd>The percentage of your pre-retirement household income you think you will need in retirement. This amount is based on the household income earned during the year immediately before your retirement. You can change this amount to be as low as 40% and as high as 160%. The percentage should reflect an after-tax amount if the majority of your retirement savings is not in a tax-deferred savings account such as a 401(k), IRA or other tax-deferred account.</dd></div> <div id='KJE-D-INFLATION_RATE' ><dt>Expected rate of inflation</dt><dd>**INFLATION_DEFINITION** <!--STARTHIDETAXES--></dd></div> <div id='KJE-D-MARRIED' ><dt>Married checkbox</dt><dd>Check this box if you are married. Married couples have a higher maximum Social Security benefit than single wage earners.</dd></div> <div id='KJE-D-INCLUDE_SOCIAL_SECURITY' ><dt>Include Social Security checkbox</dt><dd>Check this box if you wish to include Social Security benefits in your retirement planning. **SS_DEFINITION** <!--ENDHIDETAXES--></dd></div> ";
KJE.ReportText=' <!--HEADING "Retirement Nest egg Results" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>You may need a nest egg of NEED_AT_RETIRE to retire at age AGE_OF_RETIREMENT.</h2> This is based on retirement expenditures of INCOME_REQUIRED_AT_RETIRE per year. This amount is INCOME_PERCENT of your projected last working year\'s income of INCOME_AT_RETIRE. If you receive SOCIALSECURITY_AT_RETIRE per year from Social Security and if your current savings of CURRENT_SAVINGS earns PRE_RATE_OF_RETURN annually, you will need to accumulate an additional NEED_AT_RETIRE_PLAN by the time you retire. This would require saving ADJUST_ANNUAL_SAVINGS per year (ADJUST_MONTHLY_SAVINGS per month) for YEARS_UNTIL_RETIREMENT years. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tfoot class="KJEReportTFooter"> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Projected additional savings required after SOCIALSECURITY_AT_RETIRE per year from Social Security and current savings of CURRENT_SAVINGS earning PRE_RATE_OF_RETURN annually </th><td class="KJECellStrong" >NEED_AT_RETIRE_PLAN</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Projected nest egg required</th><td class="KJECell" >NEED_AT_RETIRE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Projected nest egg required if you receive SOCIALSECURITY_AT_RETIRE per year from Social Security</th><td class="KJECell" >NEED_AT_RETIRE_AFSS</td></tr> </tbody> </table> </div> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Retirement Plan</caption> <tfoot class="KJEReportTFooter"> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Your ending balance</th><td class="KJECellStrong">ENDING_BALANCE</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Current age</th><td class="KJECell KJECell30">CURRENT_AGE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Age at retirement</th><td class="KJECell">AGE_OF_RETIREMENT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Household income</th><td class="KJECell">HOUSEHOLD_INCOME</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current retirement savings</th><td class="KJECell">CURRENT_SAVINGS</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Expected income increase</th><td class="KJECell">SALARY_PERCENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Years of retirement income</th><td class="KJECell">YEARS_OF_RETIREMENT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Pre-retirement income desired in retirement</th><td class="KJECell">INCOME_PERCENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Rate of return before retirement</th><td class="KJECell KJECell30">PRE_RATE_OF_RETURN</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Rate of return during retirement</th><td class="KJECell">POST_RATE_OF_RETURN</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Expected inflation rate</th><td class="KJECell">INFLATION_RATE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Are you married?</th><td class="KJECell">MARRIED</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Include Social Security?</th><td class="KJECell">INCLUDE_SOCIAL_SECURITY</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Years until retirement</th><td class="KJECell">YEARS_UNTIL_RETIREMENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Your last year\'s income</th><td class="KJECell">INCOME_AT_RETIRE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Estimated annual retirement expenditures</th><td class="KJECell">INCOME_REQUIRED_AT_RETIRE</td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Balances by year with no future savings*</h2> **REPEATING GROUP** <P class=KJEFooter>*Understand that the likelihood of this scenario unfolding exactly as portrayed is extremely remote. It is based on the assumption that fixed rates of return, that don\'t vary from year to year, will apply to your entire retirement portfolio. ';
KJE.parameters.set("AGE_OF_RETIREMENT",67);
KJE.parameters.set("CURRENT_AGE",45);
KJE.parameters.set("CURRENT_SAVINGS",250000);
KJE.parameters.set("CURRENT_TAX",0);
KJE.parameters.set("HOUSEHOLD_INCOME",50000);
KJE.parameters.set("INCLUDE_SOCIAL_SECURITY",false);
KJE.parameters.set("INCOME_PERCENT",90);
KJE.parameters.set("INFLATION_RATE",KJE.Default.InflationRate);
KJE.parameters.set("MARRIED",false);
KJE.parameters.set("MAX_SALARY_PERCENT",20);
KJE.parameters.set("POST_RATE_OF_RETURN",KJE.Default.RORRetire);
KJE.parameters.set("PRE_RATE_OF_RETURN",KJE.Default.RORMarket);
KJE.parameters.set("RETIREMENT_TAX",0);
KJE.parameters.set("SALARY_PERCENT",2);
KJE.parameters.set("SHOW_TAX",false);
KJE.parameters.set("YEARS_OF_RETIREMENT",35);
KJE.parameters.set("NEST_EGG",true);