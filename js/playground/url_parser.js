const urls_in = [
  'https://display.ugc.bazaarvoice.com/static/logitech-au/main_site/en_AU/container.htm?bvaction=rr_submit_review&bvproductId=960-001587&bvcampaignId=Quarterly_Sweepstakes&bvinjecteddata=%7B%22IncentivizedReview%22%3A%22True%22%7D',
  'https://display.ugc.bazaarvoice.com/static/logitech-au/main_site/en_AU/container.htm?bvaction=rr_submit_review&bvproductId=960-001618&bvcampaignId=Quarterly_Sweepstakes&bvinjecteddata=%7B%22IncentivizedReview%22%3A%22True%22%7D',
  'https://display.ugc.bazaarvoice.com/static/logitech-au/main_site/en_AU/container.htm?bvaction=rr_submit_review&bvproductId=960-001624&bvcampaignId=Quarterly_Sweepstakes&bvinjecteddata=%7B%22IncentivizedReview%22%3A%22True%22%7D',
  'https://display.ugc.bazaarvoice.com/static/logitech-au/main_site/en_AU/container.htm?bvaction=rr_submit_review&bvproductId=960-001437&bvcampaignId=Quarterly_Sweepstakes&bvinjecteddata=%7B%22IncentivizedReview%22%3A%22True%22%7D'
];

const url_proxy = 'https://api.codetabs.com/v1/proxy?quest=';
const test_url = new URL(urls_in[0]);
console.log(test_url)
const test = () => {
 fetch(test_url).then((response) => response.text()).then((text)=>console.log(text));
}

test();
