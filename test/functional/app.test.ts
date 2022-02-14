describe('AppController', () => {
  it('App Health', async () => {
    const response = await global.testRequest.get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ healthy: true });
  });
});
