importScripts('/__test/mocha/sw-utils.js');
importScripts('/__test/bundle/workbox-broadcast-cache-update');

describe('Test of the BroadcastCacheUpdate class', function() {
  const channelName = 'test-channel';
  const headersToCheck = ['one', 'two'];
  const source = 'test-source';

  it(`should throw when BroadcastCacheUpdate() is called without any parameters`, function() {
    let thrownError = null;
    try {
      new workbox.broadcastCacheUpdate.BroadcastCacheUpdate();
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).to.exist;
    expect(thrownError.name).to.equal('channel-name-required');
  });

  it(`should use the channelName from the constructor`, function() {
    const bcu = new workbox.broadcastCacheUpdate.BroadcastCacheUpdate({channelName});
    expect(bcu.channelName).to.equal(channelName);
  });

  it(`should use the headersToCheck from the constructor`, function() {
    const bcu = new workbox.broadcastCacheUpdate.BroadcastCacheUpdate({channelName, headersToCheck});
    expect(bcu.headersToCheck).to.equal(headersToCheck);
  });

  it(`should use a default value for headersToCheck when one isn't provided`, function() {
    const bcu = new workbox.broadcastCacheUpdate.BroadcastCacheUpdate({channelName});
    expect(bcu.headersToCheck).to.not.be.empty;
  });

  it(`should use the source from the constructor`, function() {
    const bcu = new workbox.broadcastCacheUpdate.BroadcastCacheUpdate({channelName, source});
    expect(bcu.source).to.equal(source);
  });

  it(`should use a default value for source when one isn't provided`, function() {
    const bcu = new workbox.broadcastCacheUpdate.BroadcastCacheUpdate({channelName});
    expect(bcu.source).to.not.be.empty;
  });

  it(`should create and reuse a BroadcastChannel based on channelName`, function() {
    const bcu = new workbox.broadcastCacheUpdate.BroadcastCacheUpdate({channelName});
    const broadcastChannel = bcu.channel;
    expect(broadcastChannel).to.be.instanceof(BroadcastChannel);
    // bcu.channel is a getter that create a BroadcastChannel the first
    // time it's called, and this test confirms that it returns the same
    // BroadcastChannel object when called twice.
    expect(broadcastChannel).to.eql(bcu.channel);
    expect(broadcastChannel.name).to.equal(channelName);
  });
});
