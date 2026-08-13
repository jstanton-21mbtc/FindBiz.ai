exports.handler = async function(event) {
  const params = event.queryStringParameters || {};
  const token = params.api_token || '';
  delete params.api_token; // don't double-send

  const qs = new URLSearchParams(params);
  if (token) qs.set('api_token', token);

  const url = `https://api.opencorporates.com/v0.4/companies/search?${qs.toString()}`;

  try {
    const resp = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'FindBiz.ai/1.0' }
    });
    const body = await resp.text();
    return {
      statusCode: resp.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: { message: e.message } })
    };
  }
};
