const Experience = require("../models/experience_model");
const Partner = require("../models/partner_model");
const Price = require("../models/price_model");
//import data from './data.json';

module.exports = {
    choose_partner: (partners, experience_partner_dispo) => {
        partners_selected = []
        for (i in experience_partner_dispo.length) {
            if (experience_partner_dispo[i].partner_dispo_dates.length == 1) {
                partners_selected.push(partner_dispo_dates.partner)
            }
        }
        experiences_complet=[]
        for (i in partners.length){
            if ( partners[i] in partners_selected){
                experiences_complet.push(partners[i].partner_experience)    
            }
            else{

            }
        }
        console.log(experiences_complet)
            if (partners.partner_experience.length == 1) {
            }
    },
    build_devis: async (req, res, next) => {
        const request = req.body;
        var partners = []
        var experience_partner_dispo = []
        for (exp of request.experiences) {
            var x = await Experience.findById(exp.id)
            var detail = await Experience.findById(exp.id).populate('PartnersId');


            for (partner of detail.PartnersId) {
                var dispos = partner.disponibilites
                var partner_dispo_dates = []
                for (dispo of dispos) {
                    start = new Date(request.date_start)
                    end = new Date(request.date_end)
                    console.log(dispo.state)
                    if ((dispo.state === "yes") && (dispo.date.getDate() <= end.getDate()) && (dispo.date.getDate() >= start.getDate())) {
                        console.log('hi')
                        partner_dispo_dates.push({ "partner": partner.id, "date_dispo": dispo.date })
                                        
                if (partner_dispo_dates.partner in partners) {
                    partners.partner.partner_experience.push(x.id)
                }
                else {
                    partners.push({ "partner": partner_dispo_dates.partner, "partner_experience": [x.id] })
                }   
                    }
                }

                experience_partner_dispo.push({ "experience": x.id, "partner_dispo_dates": partner_dispo_dates })
             
            }
            //choose_partner(partners, experience_partner_dispo)
            //experience_list.push(x);
            partners_selected = []
            for (i in experience_partner_dispo.length) {
                if (experience_partner_dispo[i].partner_dispo_dates.length == 1) {
                    partners_selected.push(partner_dispo_dates.partner)
                }
            }
            experiences_complet=[]
            for (i in partners.length){
                if ( partners[i] in partners_selected){
                    experiences_complet.push(partners[i].partner_experience)    
                }
                else{
    
                }
            }
            console.log(experiences_complet)
                //if (partners.partner_experience.length == 1) {
                //}
        }
        res.status(200).send({ devis: experience_partner_dispo })

    }

}


