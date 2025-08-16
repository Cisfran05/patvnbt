(function(b,a){var b=b||{};
b.components.branchPageController=(function(){var d=b.affiliateFinder.getAffiliateId(),c=b.util.getQueryVariable("branchID");
if(c){b.locationServices.getBranchDetail(d,c,"branchPageLoadEvent")
}else{console.error("Unable to read branch ID query parameter")
}})()
})(ZBNA,jQuery);